'use client';

import React, { useState } from 'react';
import { useParams } from 'next/navigation';
import { Navbar } from '@/components/shared/Navbar';
import { getApplicationById } from '@/lib/store';
import { StatusBadge } from '@/components/shared/StatusBadge';
import { RuleCitationCard } from '@/components/shared/RuleCitationCard';
import { DecisionTraceViewer } from '@/components/shared/DecisionTraceViewer';
import { NextActionCard } from '@/components/applicant/NextActionCard';
import { Sparkles, FileText, ShieldCheck, Info, RefreshCw, CheckCircle2, ArrowLeft } from 'lucide-react';
import Link from 'next/link';

export default function ApplicationDashboardPage() {
  const params = useParams();
  const caseId = (params?.id as string) || 'case-1001';
  const appCase = getApplicationById(caseId);

  const [activeTab, setActiveTab] = useState<'EXPLANATION' | 'TRACE' | 'DOCUMENTS'>('EXPLANATION');

  if (!appCase) {
    return (
      <div className="min-h-screen bg-[#07090e] text-slate-100 flex flex-col">
        <Navbar />
        <div className="max-w-xl mx-auto py-20 text-center space-y-4">
          <h1 className="text-xl font-bold text-white">Application Not Found</h1>
          <p className="text-xs text-slate-400">The requested application reference could not be located.</p>
          <Link href="/programs" className="inline-flex items-center gap-2 text-xs text-indigo-400 hover:text-indigo-300">
            <ArrowLeft className="w-4 h-4" /> Back to Programs
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#07090e] text-slate-100 flex flex-col">
      <Navbar />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8 flex-1 w-full">
        {/* Header Bar */}
        <div className="glass-panel rounded-2xl p-6 border border-white/10 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-3">
              <span className="text-2xl font-bold text-white">{appCase.applicantName}</span>
              <span className="font-mono text-xs px-2.5 py-1 bg-slate-900 text-indigo-300 rounded border border-slate-700">
                {appCase.applicationId}
              </span>
              <StatusBadge status={appCase.status} size="lg" />
            </div>
            <p className="text-xs text-slate-400 mt-1">
              Program: <span className="text-slate-200 font-semibold">{appCase.programTitle}</span> | Submitted: {new Date(appCase.submittedAt).toLocaleDateString()}
            </p>
          </div>

          <div className="flex items-center gap-3">
            <Link
              href="/reviewer"
              className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-semibold bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 transition-all"
            >
              <ShieldCheck className="w-4 h-4 text-amber-400" />
              <span>Inspect in Caseworker View</span>
            </Link>
          </div>
        </div>

        {/* Next Action Guidance Banner */}
        <NextActionCard
          status={appCase.status}
          nextActions={appCase.explanation.nextActions}
        />

        {/* View Navigation Tabs */}
        <div className="flex items-center gap-2 border-b border-slate-800 pb-2">
          <button
            onClick={() => setActiveTab('EXPLANATION')}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all ${
              activeTab === 'EXPLANATION'
                ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/30'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900'
            }`}
          >
            <Sparkles className="w-4 h-4" />
            <span>AI Assessment & Plain Explanation</span>
          </button>

          <button
            onClick={() => setActiveTab('TRACE')}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all ${
              activeTab === 'TRACE'
                ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/30'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900'
            }`}
          >
            <ShieldCheck className="w-4 h-4" />
            <span>Evidence Audit Trace Timeline</span>
          </button>

          <button
            onClick={() => setActiveTab('DOCUMENTS')}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all ${
              activeTab === 'DOCUMENTS'
                ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/30'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900'
            }`}
          >
            <FileText className="w-4 h-4" />
            <span>Attached Evidence ({appCase.documents.length})</span>
          </button>
        </div>

        {/* TAB 1: Explanation & Rules */}
        {activeTab === 'EXPLANATION' && (
          <div className="space-y-6">
            {/* Plain Language Summary Card */}
            <div className="glass-panel rounded-2xl p-6 border border-white/10 space-y-4">
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <Info className="w-5 h-5 text-indigo-400" />
                Plain-Language Decision Explanation
              </h3>

              <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800 text-xs text-slate-200 leading-relaxed font-sans">
                {appCase.explanation.summary}
              </div>

              {/* Highlights & Missing */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                <div className="p-4 rounded-xl bg-emerald-950/20 border border-emerald-500/20 space-y-2">
                  <h4 className="text-xs font-bold text-emerald-400 uppercase tracking-wider flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4" />
                    Verified Eligibility Factors ({appCase.explanation.passingHighlights.length})
                  </h4>
                  <ul className="space-y-1.5 text-xs text-slate-300">
                    {appCase.explanation.passingHighlights.map((item, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 mt-1 shrink-0" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="p-4 rounded-xl bg-amber-950/20 border border-amber-500/20 space-y-2">
                  <h4 className="text-xs font-bold text-amber-400 uppercase tracking-wider flex items-center gap-1.5">
                    <Info className="w-4 h-4" />
                    Flagged Items / Remarks
                  </h4>
                  <ul className="space-y-1.5 text-xs text-slate-300">
                    {appCase.explanation.flaggedOrMissingItems.length > 0 ? (
                      appCase.explanation.flaggedOrMissingItems.map((item, i) => (
                        <li key={i} className="flex items-start gap-2">
                          <span className="w-1.5 h-1.5 rounded-full bg-amber-400 mt-1 shrink-0" />
                          <span>{item}</span>
                        </li>
                      ))
                    ) : (
                      <li className="text-slate-500 italic">No missing requirements or flagged items.</li>
                    )}
                  </ul>
                </div>
              </div>
            </div>

            {/* Rule Citation Cards */}
            <div className="space-y-3">
              <h3 className="text-sm font-bold text-white flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                Rule Evaluation Breakdown with Evidence Citations ({appCase.assessment.rules.length})
              </h3>
              {appCase.assessment.rules.map((rule) => (
                <RuleCitationCard key={rule.ruleId} rule={rule} />
              ))}
            </div>
          </div>
        )}

        {/* TAB 2: Decision Trace */}
        {activeTab === 'TRACE' && (
          <DecisionTraceViewer
            auditTrail={appCase.auditTrail}
            currentStatus={appCase.status}
            overallConfidence={appCase.assessment.overallConfidence}
          />
        )}

        {/* TAB 3: Attached Documents */}
        {activeTab === 'DOCUMENTS' && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {appCase.documents.map((doc) => (
              <div key={doc.id} className="glass-panel rounded-2xl p-5 border border-white/10 space-y-3">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-cyan-400">
                    <FileText className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-white">{doc.name}</h4>
                    <p className="text-[11px] text-slate-400 font-mono">{doc.type}</p>
                  </div>
                </div>

                <div className="p-3 bg-slate-950/80 rounded-xl border border-slate-800 text-[11px] space-y-1 font-mono">
                  <div className="text-slate-400">OCR Confidence: <span className="text-indigo-400 font-bold">{doc.ocrConfidence}%</span></div>
                  <div className="text-slate-400">Upload Date: {new Date(doc.uploadDate).toLocaleDateString()}</div>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
