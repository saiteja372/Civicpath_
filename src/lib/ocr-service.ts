import { EvidenceDocument } from './types';

export interface ExtractedDocumentData {
  extractedText: string;
  confidence: number;
  fields: Record<string, { value: string; confidence: number }>;
}

export function simulateOcrExtraction(fileName: string, fileType: string): ExtractedDocumentData {
  const nameLower = fileName.toLowerCase();
  
  if (nameLower.includes('paystub') || nameLower.includes('salary') || nameLower.includes('w2') || nameLower.includes('income')) {
    const monthlyIncome = Math.floor(2000 + Math.random() * 1500);
    const annualIncome = monthlyIncome * 12;
    return {
      extractedText: `EMPLOYER PAYROLL STUB\nDocument Type: Earnings Statement\nGross Pay: $${monthlyIncome.toLocaleString()}.00\nProjected Annual Wages: $${annualIncome.toLocaleString()}.00\nIssue Date: August 28, 2026`,
      confidence: 96.5,
      fields: {
        documentType: { value: 'Earnings Statement / Paystub', confidence: 99.0 },
        grossMonthly: { value: `$${monthlyIncome.toLocaleString()}.00`, confidence: 97.2 },
        annualWages: { value: `$${annualIncome.toLocaleString()}.00`, confidence: 96.0 },
        issueDate: { value: '2026-08-28', confidence: 98.0 }
      }
    };
  }

  if (nameLower.includes('util') || nameLower.includes('water') || nameLower.includes('electric') || nameLower.includes('bill') || nameLower.includes('lease')) {
    return {
      extractedText: `MUNICIPAL UTILITY DISTRICT\nService Address: 742 Evergreen Terrace, Springfield IL 62704\nStatement Date: September 02, 2026\nAccount Status: Active in Good Standing`,
      confidence: 98.2,
      fields: {
        documentType: { value: 'Utility Statement', confidence: 99.1 },
        serviceAddress: { value: '742 Evergreen Terrace, Springfield IL 62704', confidence: 98.5 },
        statementDate: { value: '2026-09-02', confidence: 97.9 }
      }
    };
  }

  // Default ID Document Parsing
  return {
    extractedText: `STATE DRIVER LICENSE / IDENTIFICATION CARD\nFull Name: Applicant Resident\nDate of Birth: 05/14/1992\nResidential Address: 742 Evergreen Terrace, Springfield IL\nCard Status: VALID`,
    confidence: 97.8,
    fields: {
      documentType: { value: 'State Issued Government ID', confidence: 99.4 },
      dob: { value: '1992-05-14', confidence: 98.1 },
      status: { value: 'VALID', confidence: 99.0 }
    }
  };
}
