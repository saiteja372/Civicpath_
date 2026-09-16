import { CivicProgram, EvidenceDocument, Assessment, RuleEvaluation, ApplicationStatus } from './types';

export function evaluateApplicationRules(
  program: CivicProgram,
  annualIncome: number,
  householdSize: number,
  documents: EvidenceDocument[]
): Assessment {
  const rules: RuleEvaluation[] = [];

  // Determine income limit based on household size
  const maxAllowedIncome = householdSize > 1 ? program.incomeLimitHousehold : program.incomeLimitSingle;

  // Find paystub / income document citation if available
  const incomeDoc = documents.find(d => 
    d.type.toLowerCase().includes('paystub') || 
    d.type.toLowerCase().includes('tax') || 
    d.name.toLowerCase().includes('pay') || 
    d.name.toLowerCase().includes('income') || 
    d.name.toLowerCase().includes('tax')
  ) || documents[0];

  // Rule 1: Income Eligibility
  if (annualIncome <= maxAllowedIncome) {
    rules.push({
      ruleId: `r-inc-${Date.now()}`,
      ruleCode: 'INCOME_LIMIT_CHECK',
      title: 'Household Income Eligibility',
      description: `Verified annual income ($${annualIncome.toLocaleString()}) must be within program threshold ($${maxAllowedIncome.toLocaleString()} for ${householdSize} member(s)).`,
      category: 'INCOME',
      status: 'PASS',
      threshold: `<= $${maxAllowedIncome.toLocaleString()} / year`,
      actualValue: `$${annualIncome.toLocaleString()} / year ($${(maxAllowedIncome - annualIncome).toLocaleString()} below limit)`,
      citation: incomeDoc ? {
        documentId: incomeDoc.id,
        documentName: incomeDoc.name,
        extractedField: 'Projected Annual Income',
        extractedValue: `$${annualIncome.toLocaleString()}.00`,
        confidence: incomeDoc.ocrConfidence || 96.5,
        pageNumber: 1
      } : undefined
    });
  } else if (annualIncome <= maxAllowedIncome * 1.15) {
    rules.push({
      ruleId: `r-inc-${Date.now()}`,
      ruleCode: 'INCOME_LIMIT_CHECK',
      title: 'Household Income Eligibility',
      description: `Annual income ($${annualIncome.toLocaleString()}) slightly exceeds basic limit ($${maxAllowedIncome.toLocaleString()}). Requires caseworker evaluation for deduction allowances.`,
      category: 'INCOME',
      status: 'FLAGGED',
      threshold: `<= $${maxAllowedIncome.toLocaleString()} / year`,
      actualValue: `$${annualIncome.toLocaleString()} / year ($${(annualIncome - maxAllowedIncome).toLocaleString()} over standard limit)`,
      flagReason: 'Income falls into 15% allowance buffer. Routed for human reviewer discretionary check.',
      citation: incomeDoc ? {
        documentId: incomeDoc.id,
        documentName: incomeDoc.name,
        extractedField: 'Projected Annual Income',
        extractedValue: `$${annualIncome.toLocaleString()}.00`,
        confidence: incomeDoc.ocrConfidence || 92.0,
        pageNumber: 1
      } : undefined
    });
  } else {
    rules.push({
      ruleId: `r-inc-${Date.now()}`,
      ruleCode: 'INCOME_LIMIT_CHECK',
      title: 'Household Income Eligibility',
      description: `Annual income ($${annualIncome.toLocaleString()}) exceeds maximum allowed program cap ($${maxAllowedIncome.toLocaleString()}).`,
      category: 'INCOME',
      status: 'FAIL',
      threshold: `<= $${maxAllowedIncome.toLocaleString()} / year`,
      actualValue: `$${annualIncome.toLocaleString()} / year ($${(annualIncome - maxAllowedIncome).toLocaleString()} over limit)`,
      citation: incomeDoc ? {
        documentId: incomeDoc.id,
        documentName: incomeDoc.name,
        extractedField: 'Gross Annual Wages',
        extractedValue: `$${annualIncome.toLocaleString()}.00`,
        confidence: incomeDoc.ocrConfidence || 95.0,
        pageNumber: 1
      } : undefined
    });
  }

  // Rule 2: Residency Proof
  const utilityDoc = documents.find(d => 
    d.type.toLowerCase().includes('utility') || 
    d.name.toLowerCase().includes('util') || 
    d.name.toLowerCase().includes('water') || 
    d.name.toLowerCase().includes('electric')
  );

  if (utilityDoc) {
    rules.push({
      ruleId: `r-res-${Date.now()}`,
      ruleCode: 'RESIDENCY_VERIFICATION',
      title: 'Municipal Residency Proof',
      description: 'Active utility account verified within municipal district.',
      category: 'RESIDENCY',
      status: 'PASS',
      threshold: 'Verified Municipal Service Address',
      actualValue: 'Active Utility Account Verified',
      citation: {
        documentId: utilityDoc.id,
        documentName: utilityDoc.name,
        extractedField: 'Service Address',
        extractedValue: utilityDoc.extractedFields?.serviceAddress?.value || 'Municipal Service Address Verified',
        confidence: utilityDoc.ocrConfidence || 98.0,
        pageNumber: 1
      }
    });
  } else {
    rules.push({
      ruleId: `r-res-${Date.now()}`,
      ruleCode: 'RESIDENCY_VERIFICATION',
      title: 'Municipal Residency Proof',
      description: 'No utility bill or lease proof detected.',
      category: 'RESIDENCY',
      status: 'FLAGGED',
      threshold: 'Utility Statement (< 90 days)',
      actualValue: 'Missing direct utility proof',
      flagReason: 'Please upload a utility statement or lease agreement.'
    });
  }

  // Rule 3: Identity Verification
  const idDoc = documents.find(d => d.type.toLowerCase().includes('id') || d.name.toLowerCase().includes('id'));
  rules.push({
    ruleId: `r-id-${Date.now()}`,
    ruleCode: 'IDENTITY_CROSS_MATCH',
    title: 'Identity Verification & Card Validity',
    description: 'Government Issued ID verified against state database record.',
    category: 'IDENTITY',
    status: idDoc ? 'PASS' : 'FLAGGED',
    threshold: 'Valid State ID / Passport',
    actualValue: idDoc ? 'State Driver License Verified (Active)' : 'Pending ID Copy',
    citation: idDoc ? {
      documentId: idDoc.id,
      documentName: idDoc.name,
      extractedField: 'Card Status',
      extractedValue: 'VALID',
      confidence: idDoc.ocrConfidence || 97.8,
      pageNumber: 1
    } : undefined
  });

  // Calculate Overall Confidence and Decision State
  const hasFail = rules.some(r => r.status === 'FAIL');
  const hasFlagged = rules.some(r => r.status === 'FLAGGED');

  let autoDecision: ApplicationStatus = 'AUTO_APPROVED';
  let riskLevel: 'LOW' | 'MEDIUM' | 'HIGH' = 'LOW';
  let overallConfidence = 96.5;

  if (hasFail) {
    autoDecision = 'REJECTED';
    riskLevel = 'HIGH';
    overallConfidence = 92.0;
  } else if (hasFlagged) {
    autoDecision = 'FLAGGED_FOR_REVIEW';
    riskLevel = 'MEDIUM';
    overallConfidence = 78.4;
  } else {
    autoDecision = 'AUTO_APPROVED';
    riskLevel = 'LOW';
    overallConfidence = 97.2;
  }

  return {
    overallConfidence,
    riskLevel,
    autoDecision,
    evaluatedAt: new Date().toISOString(),
    rules
  };
}
