import { ApplicationCase, CivicProgram, ApplicationStatus, EvidenceDocument } from './types';
import { CIVIC_PROGRAMS, INITIAL_APPLICATIONS } from './mock-data';
import { evaluateApplicationRules } from './rule-engine';
import { generateExplanation } from './ai-explainer';
import { simulateOcrExtraction } from './ocr-service';

// In-memory global cache
let applicationsCache: ApplicationCase[] = [...INITIAL_APPLICATIONS];

export function getPrograms(): CivicProgram[] {
  return CIVIC_PROGRAMS;
}

export function getProgramById(id: string): CivicProgram | undefined {
  return CIVIC_PROGRAMS.find(p => p.id === id || p.code === id);
}

export function getAllApplications(): ApplicationCase[] {
  return applicationsCache;
}

export function getApplicationById(id: string): ApplicationCase | undefined {
  return applicationsCache.find(a => a.id === id || a.applicationId === id);
}

export interface CreateApplicationPayload {
  programId: string;
  applicantName: string;
  applicantEmail: string;
  applicantPhone: string;
  householdSize: number;
  annualIncome: number;
  residencyAddress: string;
  uploadedFiles: { name: string; type: string; size: number }[];
}

export function createApplication(payload: CreateApplicationPayload): ApplicationCase {
  const program = getProgramById(payload.programId) || CIVIC_PROGRAMS[0];
  const newNum = Math.floor(1000 + Math.random() * 9000);
  const caseId = `case-${Date.now()}`;
  const applicationId = `CP-2026-${newNum}`;

  // Process uploaded documents via OCR simulation
  const documents: EvidenceDocument[] = payload.uploadedFiles.map((file, idx) => {
    const ocrResult = simulateOcrExtraction(file.name, file.type);
    return {
      id: `doc-${caseId}-${idx}`,
      name: file.name,
      type: file.type,
      size: file.size,
      uploadDate: new Date().toISOString(),
      fileUrl: `/uploads/${file.name}`,
      ocrExtractedText: ocrResult.extractedText,
      ocrConfidence: ocrResult.confidence,
      extractedFields: ocrResult.fields
    };
  });

  // Evaluate Rules
  const assessment = evaluateApplicationRules(
    program,
    payload.annualIncome,
    payload.householdSize,
    documents
  );

  // Generate Explanation & Next Actions
  const explanation = generateExplanation(program, payload.applicantName, assessment);

  const newCase: ApplicationCase = {
    id: caseId,
    applicationId,
    programId: program.id,
    programTitle: program.title,
    applicantName: payload.applicantName,
    applicantEmail: payload.applicantEmail,
    applicantPhone: payload.applicantPhone,
    householdSize: payload.householdSize,
    annualIncome: payload.annualIncome,
    residencyAddress: payload.residencyAddress,
    status: assessment.autoDecision,
    submittedAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    documents,
    assessment,
    explanation,
    auditTrail: [
      {
        id: `aud-${Date.now()}-1`,
        timestamp: new Date().toISOString(),
        actor: 'APPLICANT',
        actorName: payload.applicantName,
        action: 'APPLICATION_SUBMITTED',
        notes: `Submitted application with ${documents.length} uploaded document(s).`
      },
      {
        id: `aud-${Date.now()}-2`,
        timestamp: new Date().toISOString(),
        actor: 'SYSTEM_AI',
        actorName: 'CivicPath AI Engine',
        action: 'OCR_AND_RULE_EVALUATION_COMPLETE',
        notes: `Extracted fields and evaluated rules with ${assessment.overallConfidence}% confidence.`
      },
      {
        id: `aud-${Date.now()}-3`,
        timestamp: new Date().toISOString(),
        actor: 'SYSTEM_AI',
        actorName: 'CivicPath Assessment Pipeline',
        action: 'AUTOMATED_DECISION_ROUTED',
        previousStatus: 'SUBMITTED',
        newStatus: assessment.autoDecision,
        notes: `Initial auto-decision: ${assessment.autoDecision}`
      }
    ]
  };

  applicationsCache.unshift(newCase);
  return newCase;
}

export function updateCaseworkerDecision(
  applicationId: string,
  newStatus: ApplicationStatus,
  reviewerName: string,
  reviewerNotes?: string
): ApplicationCase | null {
  const app = getApplicationById(applicationId);
  if (!app) return null;

  const previousStatus = app.status;
  app.status = newStatus;
  app.updatedAt = new Date().toISOString();
  if (reviewerNotes) {
    app.reviewerNotes = reviewerNotes;
  }

  // Update audit log
  app.auditTrail.unshift({
    id: `aud-${Date.now()}`,
    timestamp: new Date().toISOString(),
    actor: 'CASEWORKER',
    actorName: reviewerName,
    action: `CASEWORKER_DECISION_${newStatus}`,
    previousStatus,
    newStatus,
    notes: reviewerNotes || `Caseworker set status to ${newStatus}`
  });

  // Re-generate explanation based on new decision
  const program = getProgramById(app.programId) || CIVIC_PROGRAMS[0];
  app.explanation = generateExplanation(program, app.applicantName, {
    ...app.assessment,
    autoDecision: newStatus
  });

  return app;
}
