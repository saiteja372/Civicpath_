export type ApplicationStatus = 
  | 'DRAFT'
  | 'SUBMITTED'
  | 'AUTO_APPROVED'
  | 'FLAGGED_FOR_REVIEW'
  | 'HUMAN_APPROVED'
  | 'REJECTED'
  | 'ACTION_REQUIRED';

export type RuleStatus = 'PASS' | 'FAIL' | 'FLAGGED';

export interface DocumentCitation {
  documentId: string;
  documentName: string;
  extractedField: string;
  extractedValue: string;
  confidence: number;
  pageNumber?: number;
  snippet?: string;
}

export interface RuleEvaluation {
  ruleId: string;
  ruleCode: string;
  title: string;
  description: string;
  category: 'INCOME' | 'RESIDENCY' | 'IDENTITY' | 'RECENCY' | 'DEPENDENTS';
  status: RuleStatus;
  threshold: string;
  actualValue: string;
  citation?: DocumentCitation;
  flagReason?: string;
}

export interface EvidenceDocument {
  id: string;
  name: string;
  type: string;
  size: number;
  uploadDate: string;
  fileUrl: string;
  ocrExtractedText: string;
  ocrConfidence: number;
  extractedFields: Record<string, { value: string; confidence: number }>;
}

export interface NextAction {
  id: string;
  title: string;
  description: string;
  type: 'DOWNLOAD_CERTIFICATE' | 'UPLOAD_DOCUMENT' | 'SCHEDULE_APPOINTMENT' | 'APPEAL_DECISION' | 'VIEW_STATUS';
  actionUrl?: string;
  completed?: boolean;
}

export interface Assessment {
  overallConfidence: number; // 0 - 100
  riskLevel: 'LOW' | 'MEDIUM' | 'HIGH';
  autoDecision: ApplicationStatus;
  evaluatedAt: string;
  rules: RuleEvaluation[];
}

export interface Explanation {
  summary: string;
  passingHighlights: string[];
  flaggedOrMissingItems: string[];
  recommendationReasoning: string;
  nextActions: NextAction[];
}

export interface AuditLogEntry {
  id: string;
  timestamp: string;
  actor: 'SYSTEM_AI' | 'CASEWORKER' | 'APPLICANT';
  actorName: string;
  action: string;
  previousStatus?: ApplicationStatus;
  newStatus?: ApplicationStatus;
  notes?: string;
}

export interface CivicProgram {
  id: string;
  code: string;
  title: string;
  category: string;
  description: string;
  badgeColor: string;
  incomeLimitSingle: number;
  incomeLimitHousehold: number;
  requiredDocuments: string[];
  eligibilitySummary: string;
}

export interface ApplicationCase {
  id: string;
  applicationId: string; // e.g. "CP-2026-8942"
  programId: string;
  programTitle: string;
  applicantName: string;
  applicantEmail: string;
  applicantPhone: string;
  householdSize: number;
  annualIncome: number;
  residencyAddress: string;
  status: ApplicationStatus;
  submittedAt: string;
  updatedAt: string;
  documents: EvidenceDocument[];
  assessment: Assessment;
  explanation: Explanation;
  auditTrail: AuditLogEntry[];
  reviewerNotes?: string;
}
