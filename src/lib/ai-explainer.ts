import { Assessment, Explanation, NextAction, CivicProgram } from './types';

export function generateExplanation(
  program: CivicProgram,
  applicantName: string,
  assessment: Assessment
): Explanation {
  const passingHighlights: string[] = [];
  const flaggedOrMissingItems: string[] = [];
  const nextActions: NextAction[] = [];

  assessment.rules.forEach(rule => {
    if (rule.status === 'PASS') {
      passingHighlights.push(`${rule.title}: ${rule.actualValue}`);
    } else if (rule.status === 'FLAGGED') {
      flaggedOrMissingItems.push(`${rule.title}: ${rule.flagReason || rule.actualValue}`);
    } else {
      flaggedOrMissingItems.push(`${rule.title}: ${rule.actualValue} (Threshold: ${rule.threshold})`);
    }
  });

  let summary = '';
  let recommendationReasoning = '';

  switch (assessment.autoDecision) {
    case 'AUTO_APPROVED':
      summary = `Congratulations ${applicantName}! Your application for ${program.title} has been automatically verified and approved. All eligibility criteria met verified evidence standards with high confidence.`;
      recommendationReasoning = 'All 4 verification checks passed with >95% OCR confidence. Zero human intervention needed.';
      nextActions.push(
        {
          id: `act-dl-${Date.now()}`,
          title: 'Download Approval Certificate',
          description: 'Download your official benefit approval document with security QR code.',
          type: 'DOWNLOAD_CERTIFICATE'
        },
        {
          id: `act-view-${Date.now()}`,
          title: 'View Benefit Disbursement Schedule',
          description: 'Track when your benefit credit will be applied to your utility account.',
          type: 'VIEW_STATUS'
        }
      );
      break;

    case 'FLAGGED_FOR_REVIEW':
      summary = `Hello ${applicantName}, your application for ${program.title} is undergoing caseworker review. The system detected minor criteria variations that require human inspection.`;
      recommendationReasoning = 'Income or document recency borders detected. Case automatically transferred to Reviewer Queue.';
      nextActions.push({
        id: `act-rev-${Date.now()}`,
        title: 'Caseworker Review In Progress',
        description: 'A municipal caseworker will inspect your file within 24-48 business hours.',
        type: 'VIEW_STATUS'
      });
      break;

    case 'ACTION_REQUIRED':
      summary = `Action Required for ${applicantName}: Additional proof is required to complete your verification for ${program.title}.`;
      recommendationReasoning = 'One or more uploaded documents require updating or clarity.';
      nextActions.push({
        id: `act-up-${Date.now()}`,
        title: 'Upload Updated Evidence Document',
        description: 'Upload a recent utility bill or proof of residence dated within 90 days.',
        type: 'UPLOAD_DOCUMENT'
      });
      break;

    case 'REJECTED':
      summary = `Notice for ${applicantName}: Your application for ${program.title} did not meet the income eligibility threshold established by municipal regulation.`;
      recommendationReasoning = 'Extracted annual income exceeds maximum allowable limit for this program.';
      nextActions.push({
        id: `act-app-${Date.now()}`,
        title: 'Request Formal Administrative Appeal',
        description: 'If you have extraordinary medical expenses or dependents, submit an appeal.',
        type: 'APPEAL_DECISION'
      });
      break;
  }

  return {
    summary,
    passingHighlights,
    flaggedOrMissingItems,
    recommendationReasoning,
    nextActions
  };
}
