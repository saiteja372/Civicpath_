import { CivicProgram, ApplicationCase } from './types';

export const CIVIC_PROGRAMS: CivicProgram[] = [
  {
    id: 'prog-housing-2026',
    code: 'CP-HOUSING',
    title: 'Low-Income Housing & Energy Voucher',
    category: 'Housing & Utilities',
    description: 'Provides monthly rental assistance and electricity subsidies for low-to-moderate-income families.',
    badgeColor: 'emerald',
    incomeLimitSingle: 32000,
    incomeLimitHousehold: 48000,
    requiredDocuments: ['Government ID (Passport/State ID)', 'Recent Paystub (Last 30 Days)', 'Utility Bill (Last 90 Days)'],
    eligibilitySummary: 'Household income below $48,000/yr, valid municipal residence, and active utility account.'
  },
  {
    id: 'prog-health-2026',
    code: 'CP-HEALTH',
    title: 'Universal Community Healthcare Subsidy',
    category: 'Healthcare',
    description: 'Zero-deductible medical coverage and prescription subsidy for qualifying residents.',
    badgeColor: 'cyan',
    incomeLimitSingle: 38000,
    incomeLimitHousehold: 55000,
    requiredDocuments: ['Government ID', 'Tax Return (W2 or Form 1040)', 'Proof of Residence'],
    eligibilitySummary: 'Resident of Metro District, income under $55,000/yr, uninsured or underinsured.'
  },
  {
    id: 'prog-biz-2026',
    code: 'CP-BIZ-GRANT',
    title: 'Micro-Enterprise Growth & Resilience Grant',
    category: 'Economic Development',
    description: 'Direct $5,000 grant for local small business owners, micro-enterprises, and gig workers.',
    badgeColor: 'indigo',
    incomeLimitSingle: 60000,
    incomeLimitHousehold: 75000,
    requiredDocuments: ['Business Registration / License', 'Bank Statement (Last 60 Days)', 'Tax Return'],
    eligibilitySummary: 'Active local business operating >= 6 months with under $75k annual revenue.'
  },
  {
    id: 'prog-mobility-2026',
    code: 'CP-MOBILITY',
    title: 'Municipal Transit & Eco-Mobility Pass',
    category: 'Transportation',
    description: '100% subsidized public bus, subway, and electric bike access pass.',
    badgeColor: 'amber',
    incomeLimitSingle: 30000,
    incomeLimitHousehold: 42000,
    requiredDocuments: ['Government ID', 'Utility Bill or Lease Agreement'],
    eligibilitySummary: 'City resident, annual income under $30,000 single or $42,000 household.'
  }
];

export const INITIAL_APPLICATIONS: ApplicationCase[] = [
  {
    id: 'case-1001',
    applicationId: 'CP-2026-1001',
    programId: 'prog-housing-2026',
    programTitle: 'Low-Income Housing & Energy Voucher',
    applicantName: 'Elena Vance',
    applicantEmail: 'elena.vance@example.com',
    applicantPhone: '+1 (555) 234-5678',
    householdSize: 3,
    annualIncome: 34200,
    residencyAddress: '742 Evergreen Terrace, Apt 4B, Springfield',
    status: 'AUTO_APPROVED',
    submittedAt: '2026-09-14T09:30:00Z',
    updatedAt: '2026-09-14T09:31:15Z',
    documents: [
      {
        id: 'doc-ev-id',
        name: 'State_Driver_License_Elena.pdf',
        type: 'Government ID',
        size: 1420000,
        uploadDate: '2026-09-14T09:28:00Z',
        fileUrl: '/uploads/sample_id.pdf',
        ocrExtractedText: 'STATE OF ILLINOIS DRIVER LICENSE\nName: Vance, Elena\nDOB: 10/14/1991\nAddress: 742 Evergreen Terrace Apt 4B, Springfield IL 62704\nID No: V492-0194-8821\nExpires: 10/14/2028',
        ocrConfidence: 98.4,
        extractedFields: {
          fullName: { value: 'Elena Vance', confidence: 99.1 },
          dob: { value: '10/14/1991', confidence: 98.0 },
          address: { value: '742 Evergreen Terrace Apt 4B, Springfield IL 62704', confidence: 97.8 }
        }
      },
      {
        id: 'doc-ev-paystub',
        name: 'August_2026_Paystub_AcmeCorp.pdf',
        type: 'Paystub',
        size: 890000,
        uploadDate: '2026-09-14T09:29:00Z',
        fileUrl: '/uploads/sample_paystub.pdf',
        ocrExtractedText: 'ACME LOGISTICS INC - PAYSTUB\nEmployee: Elena Vance\nPay Period: Aug 01, 2026 - Aug 15, 2026\nGross Earnings: $1,425.00\nYear-To-Date Gross: $22,800.00\nProjected Annual Income: $34,200.00',
        ocrConfidence: 97.2,
        extractedFields: {
          employeeName: { value: 'Elena Vance', confidence: 98.5 },
          grossPay: { value: '$1,425.00', confidence: 97.0 },
          projectedAnnual: { value: '$34,200.00', confidence: 96.5 }
        }
      },
      {
        id: 'doc-ev-utility',
        name: 'Springfield_Water_Electric_Aug2026.pdf',
        type: 'Utility Bill',
        size: 1100000,
        uploadDate: '2026-09-14T09:29:30Z',
        fileUrl: '/uploads/sample_utility.pdf',
        ocrExtractedText: 'SPRINGFIELD UTILITIES\nAccount Holder: Elena Vance\nService Address: 742 Evergreen Terrace Apt 4B\nStatement Date: August 10, 2026\nTotal Due: $118.40',
        ocrConfidence: 99.0,
        extractedFields: {
          accountName: { value: 'Elena Vance', confidence: 99.2 },
          serviceAddress: { value: '742 Evergreen Terrace Apt 4B', confidence: 98.9 },
          statementDate: { value: 'August 10, 2026', confidence: 99.0 }
        }
      }
    ],
    assessment: {
      overallConfidence: 97.8,
      riskLevel: 'LOW',
      autoDecision: 'AUTO_APPROVED',
      evaluatedAt: '2026-09-14T09:31:15Z',
      rules: [
        {
          ruleId: 'r-inc-01',
          ruleCode: 'INCOME_LIMIT_CHECK',
          title: 'Household Income Eligibility',
          description: 'Verified annual household income must not exceed program limit ($48,000 for 3 members).',
          category: 'INCOME',
          status: 'PASS',
          threshold: '<= $48,000 / year',
          actualValue: '$34,200 / year ($13,800 below limit)',
          citation: {
            documentId: 'doc-ev-paystub',
            documentName: 'August_2026_Paystub_AcmeCorp.pdf',
            extractedField: 'Projected Annual Income',
            extractedValue: '$34,200.00',
            confidence: 96.5,
            pageNumber: 1
          }
        },
        {
          ruleId: 'r-res-01',
          ruleCode: 'RESIDENCY_VERIFICATION',
          title: 'Municipal Residency Proof',
          description: 'Documented address must match municipal jurisdiction and be verified within past 90 days.',
          category: 'RESIDENCY',
          status: 'PASS',
          threshold: 'Springfield Municipality, Issued < 90 days',
          actualValue: '742 Evergreen Terrace, Springfield IL (Aug 10, 2026)',
          citation: {
            documentId: 'doc-ev-utility',
            documentName: 'Springfield_Water_Electric_Aug2026.pdf',
            extractedField: 'Service Address & Statement Date',
            extractedValue: '742 Evergreen Terrace Apt 4B (Aug 10, 2026)',
            confidence: 98.9,
            pageNumber: 1
          }
        },
        {
          ruleId: 'r-id-01',
          ruleCode: 'IDENTITY_CROSS_MATCH',
          title: 'Identity & Name Consistency',
          description: 'Applicant name on ID must match utility bill and income proof.',
          category: 'IDENTITY',
          status: 'PASS',
          threshold: '100% Name Similarity',
          actualValue: 'Elena Vance (Exact match across 3 documents)',
          citation: {
            documentId: 'doc-ev-id',
            documentName: 'State_Driver_License_Elena.pdf',
            extractedField: 'Full Name',
            extractedValue: 'Elena Vance',
            confidence: 99.1,
            pageNumber: 1
          }
        },
        {
          ruleId: 'r-rec-01',
          ruleCode: 'DOCUMENT_RECENCY',
          title: 'Document Timeliness',
          description: 'Paystub and utility proof must be dated within 30 and 90 days respectively.',
          category: 'RECENCY',
          status: 'PASS',
          threshold: 'Issued after June 15, 2026',
          actualValue: 'Paystub: Aug 15, 2026 | Utility: Aug 10, 2026',
          citation: {
            documentId: 'doc-ev-utility',
            documentName: 'Springfield_Water_Electric_Aug2026.pdf',
            extractedField: 'Statement Date',
            extractedValue: 'August 10, 2026 (35 days old)',
            confidence: 99.0,
            pageNumber: 1
          }
        }
      ]
    },
    explanation: {
      summary: 'Application CP-2026-1001 meets all eligibility criteria for the Low-Income Housing Voucher program. Extracted evidence confirms annual household income of $34,200 ($13,800 under threshold) and verified residency.',
      passingHighlights: [
        'Annual household income ($34,200) is well below the $48,000 limit for a household of 3.',
        'Residency verified via Springfield Utility bill issued August 10, 2026.',
        'Perfect identity alignment across State ID, Paystub, and Utility proof (99% OCR confidence).'
      ],
      flaggedOrMissingItems: [],
      recommendationReasoning: 'Automated high-confidence verification complete (97.8% confidence score). No manual review required.',
      nextActions: [
        {
          id: 'act-101',
          title: 'Download Voucher Certificate',
          description: 'Download your official CivicPath Housing Voucher Certificate with digital verification QR code.',
          type: 'DOWNLOAD_CERTIFICATE'
        },
        {
          id: 'act-102',
          title: 'View Direct Benefit Schedule',
          description: 'See the timeline for utility bill credit disbursement to Springfield Water & Electric.',
          type: 'VIEW_STATUS'
        }
      ]
    },
    auditTrail: [
      {
        id: 'aud-01',
        timestamp: '2026-09-14T09:30:00Z',
        actor: 'APPLICANT',
        actorName: 'Elena Vance',
        action: 'APPLICATION_SUBMITTED',
        notes: 'Submitted application with 3 supporting documents.'
      },
      {
        id: 'aud-02',
        timestamp: '2026-09-14T09:30:45Z',
        actor: 'SYSTEM_AI',
        actorName: 'CivicPath AI Pipeline',
        action: 'OCR_AND_FIELD_EXTRACTION_COMPLETE',
        notes: 'Extracted key fields with 98.2% average confidence across 3 documents.'
      },
      {
        id: 'aud-03',
        timestamp: '2026-09-14T09:31:15Z',
        actor: 'SYSTEM_AI',
        actorName: 'CivicPath Hybrid Rule Engine',
        action: 'AUTO_DECISION_EXECUTED',
        previousStatus: 'SUBMITTED',
        newStatus: 'AUTO_APPROVED',
        notes: 'All 4 deterministic eligibility rules passed with >95% confidence. Auto-approval certificate generated.'
      }
    ]
  },
  {
    id: 'case-1002',
    applicationId: 'CP-2026-1002',
    programId: 'prog-housing-2026',
    programTitle: 'Low-Income Housing & Energy Voucher',
    applicantName: 'Marcus Sterling',
    applicantEmail: 'marcus.s@example.com',
    applicantPhone: '+1 (555) 987-6543',
    householdSize: 2,
    annualIncome: 49500,
    residencyAddress: '1048 Maple Street, Apt 12, Springfield',
    status: 'FLAGGED_FOR_REVIEW',
    submittedAt: '2026-09-15T14:15:00Z',
    updatedAt: '2026-09-15T14:16:30Z',
    documents: [
      {
        id: 'doc-ms-id',
        name: 'Marcus_Sterling_ID.pdf',
        type: 'Government ID',
        size: 1550000,
        uploadDate: '2026-09-15T14:10:00Z',
        fileUrl: '/uploads/sample_id_2.pdf',
        ocrExtractedText: 'STATE ID - Sterling, Marcus R.\nDOB: 05/22/1988\nAddress: 1048 Maple St Apt 12, Springfield IL',
        ocrConfidence: 96.0,
        extractedFields: {
          fullName: { value: 'Marcus Sterling', confidence: 97.5 }
        }
      },
      {
        id: 'doc-ms-tax',
        name: '2025_W2_Form_Sterling.pdf',
        type: 'Tax Return',
        size: 940000,
        uploadDate: '2026-09-15T14:12:00Z',
        fileUrl: '/uploads/sample_tax.pdf',
        ocrExtractedText: 'FORM W-2 Wage and Tax Statement 2025\nBox 1 Wages: $49,500.00\nEmployer: Apex Logistics LLC',
        ocrConfidence: 91.5,
        extractedFields: {
          wages: { value: '$49,500.00', confidence: 92.0 }
        }
      }
    ],
    assessment: {
      overallConfidence: 74.2,
      riskLevel: 'MEDIUM',
      autoDecision: 'FLAGGED_FOR_REVIEW',
      evaluatedAt: '2026-09-15T14:16:30Z',
      rules: [
        {
          ruleId: 'r-inc-02',
          ruleCode: 'INCOME_LIMIT_CHECK',
          title: 'Household Income Eligibility',
          description: 'Verified annual household income must not exceed program limit ($40,000 for 2 members).',
          category: 'INCOME',
          status: 'FLAGGED',
          threshold: '<= $40,000 / year',
          actualValue: '$49,500 / year ($9,500 OVER limit)',
          citation: {
            documentId: 'doc-ms-tax',
            documentName: '2025_W2_Form_Sterling.pdf',
            extractedField: 'Box 1 Wages',
            extractedValue: '$49,500.00',
            confidence: 92.0
          },
          flagReason: 'Extracted W-2 income of $49,500 exceeds the $40,000 cap for a 2-person household. Requires caseworker evaluation for potential medical deduction allowance.'
        },
        {
          ruleId: 'r-res-02',
          ruleCode: 'RESIDENCY_VERIFICATION',
          title: 'Municipal Residency Proof',
          description: 'Documented address must match municipal jurisdiction.',
          category: 'RESIDENCY',
          status: 'PASS',
          threshold: 'Springfield Municipality',
          actualValue: '1048 Maple Street, Springfield IL',
          citation: {
            documentId: 'doc-ms-id',
            documentName: 'Marcus_Sterling_ID.pdf',
            extractedField: 'Address',
            extractedValue: '1048 Maple St Apt 12',
            confidence: 96.0
          }
        }
      ]
    },
    explanation: {
      summary: 'Application CP-2026-1002 has been flagged for Caseworker Review because extracted annual income ($49,500) exceeds the standard threshold of $40,000 for a household of 2. If you have medical expenses or qualifying dependents, a caseworker can apply allowable adjustments.',
      passingHighlights: ['Residency confirmed in Springfield IL.'],
      flaggedOrMissingItems: [
        'Extracted W-2 wages ($49,500) exceed standard threshold ($40,000).'
      ],
      recommendationReasoning: 'Flagged for human caseworker review to check for special exemptions or medical cost offsets.',
      nextActions: [
        {
          id: 'act-201',
          title: 'Track Caseworker Review Status',
          description: 'A municipal caseworker will review your file within 24-48 hours. No action required right now.',
          type: 'VIEW_STATUS'
        }
      ]
    },
    auditTrail: [
      {
        id: 'aud-10',
        timestamp: '2026-09-15T14:15:00Z',
        actor: 'APPLICANT',
        actorName: 'Marcus Sterling',
        action: 'APPLICATION_SUBMITTED'
      },
      {
        id: 'aud-11',
        timestamp: '2026-09-15T14:16:30Z',
        actor: 'SYSTEM_AI',
        actorName: 'CivicPath AI Pipeline',
        action: 'FLAGGED_FOR_HUMAN_REVIEW',
        previousStatus: 'SUBMITTED',
        newStatus: 'FLAGGED_FOR_REVIEW',
        notes: 'Income threshold border surpassed ($49.5k vs $40k limit). Routed to Reviewer Queue.'
      }
    ]
  },
  {
    id: 'case-1003',
    applicationId: 'CP-2026-1003',
    programId: 'prog-mobility-2026',
    programTitle: 'Municipal Transit & Eco-Mobility Pass',
    applicantName: 'Sarah Jenkins',
    applicantEmail: 'sarah.j@example.com',
    applicantPhone: '+1 (555) 456-7890',
    householdSize: 1,
    annualIncome: 24000,
    residencyAddress: '312 Pine Needle Way, Springfield',
    status: 'ACTION_REQUIRED',
    submittedAt: '2026-09-15T16:00:00Z',
    updatedAt: '2026-09-16T08:15:00Z',
    documents: [
      {
        id: 'doc-sj-id',
        name: 'Sarah_Jenkins_ID.pdf',
        type: 'Government ID',
        size: 1200000,
        uploadDate: '2026-09-15T15:55:00Z',
        fileUrl: '/uploads/sample_id_3.pdf',
        ocrExtractedText: 'STATE ID: Sarah Jenkins\nDOB: 03/11/1995\n312 Pine Needle Way',
        ocrConfidence: 98.0,
        extractedFields: {
          fullName: { value: 'Sarah Jenkins', confidence: 99.0 }
        }
      },
      {
        id: 'doc-sj-util-old',
        name: 'Electric_Bill_Feb2026.pdf',
        type: 'Utility Bill',
        size: 780000,
        uploadDate: '2026-09-15T15:58:00Z',
        fileUrl: '/uploads/sample_util_old.pdf',
        ocrExtractedText: 'ELECTRIC CO\nStatement Date: February 14, 2026',
        ocrConfidence: 95.0,
        extractedFields: {
          statementDate: { value: 'February 14, 2026', confidence: 95.0 }
        }
      }
    ],
    assessment: {
      overallConfidence: 81.0,
      riskLevel: 'LOW',
      autoDecision: 'ACTION_REQUIRED',
      evaluatedAt: '2026-09-15T16:02:00Z',
      rules: [
        {
          ruleId: 'r-rec-03',
          ruleCode: 'DOCUMENT_RECENCY',
          title: 'Document Timeliness Check',
          description: 'Uploaded utility bill must be issued within the last 90 days.',
          category: 'RECENCY',
          status: 'FAIL',
          threshold: 'Issued after June 15, 2026',
          actualValue: 'February 14, 2026 (214 days old)',
          citation: {
            documentId: 'doc-sj-util-old',
            documentName: 'Electric_Bill_Feb2026.pdf',
            extractedField: 'Statement Date',
            extractedValue: 'February 14, 2026',
            confidence: 95.0
          },
          flagReason: 'Uploaded Electric Bill is dated Feb 14, 2026 (over 210 days old). Maximum allowed age is 90 days.'
        }
      ]
    },
    explanation: {
      summary: 'Action Required for CP-2026-1003: Your identity and income qualifications pass, but your utility bill is outdated (issued Feb 14, 2026). Please upload a recent utility bill or lease agreement dated within the last 90 days.',
      passingHighlights: ['Income $24,000 meets transit pass threshold ($30,000 limit).'],
      flaggedOrMissingItems: ['Uploaded utility proof is older than 90 days.'],
      recommendationReasoning: 'Pending applicant re-upload of fresh utility bill.',
      nextActions: [
        {
          id: 'act-301',
          title: 'Upload Fresh Proof of Residence',
          description: 'Upload a utility bill, internet bill, or bank statement dated within the last 90 days.',
          type: 'UPLOAD_DOCUMENT'
        }
      ]
    },
    auditTrail: [
      {
        id: 'aud-20',
        timestamp: '2026-09-15T16:00:00Z',
        actor: 'APPLICANT',
        actorName: 'Sarah Jenkins',
        action: 'APPLICATION_SUBMITTED'
      },
      {
        id: 'aud-21',
        timestamp: '2026-09-16T08:15:00Z',
        actor: 'CASEWORKER',
        actorName: 'Inspector Carter',
        action: 'REQUESTED_DOCUMENT_REVISION',
        previousStatus: 'FLAGGED_FOR_REVIEW',
        newStatus: 'ACTION_REQUIRED',
        notes: 'Requested updated utility bill under 90 days old.'
      }
    ]
  }
];
