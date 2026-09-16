'use client';

import React, { useState } from 'react';
import { ApplicationCase, ApplicationStatus } from '@/lib/types';
import { StatusBadge } from '../shared/StatusBadge';
import { RuleCitationCard } from '../shared/RuleCitationCard';
import { FileText, Eye, CheckCircle2, XCircle, AlertTriangle, MessageSquare, ShieldCheck, Sparkles, Building2 } from 'lucide-react';

interface SplitScreenInspectorProps {
  appCase: ApplicationCase;
  onUpdateStatus: (status: ApplicationStatus, notes: string) => void;
}

export const SplitScreenInspector: React.FC<SplitScreenInspectorProps> = ({ appCase, onUpdateStatus }) => {
  const [activeDocId, setActiveDocId] = useState<string>(appCase.documents[0]?.id || '');
  const [highlightedText, setHighlightedText] = useState<string>('');
  const [reviewerNotes, setReviewerNotes] = useState<string>('');

  const activeDoc = appCase.documents.find(d => d.id === activeDocId) || appCase.documents[0];

  const handleSelectCitation = (docId: string, snippet?: string) => {
    setActiveDocId(docId);
    if (snippet) setHighlightedText(snippet);
  };

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="glass-panel rounded-2xl p-6 border border-white/10 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-3">
            <span className="text-xl font-bold text-white">{appCase.applicantName}</span>
            <span className="font-mono text-xs px-2.5 py-1 bg-slate-800 text-indigo-300 rounded border border-slate-700">
              {appCase.applicationId}
            </span>
            <StatusBadge status={appCase.status} size="md" />
          </div>
          <p className="text-xs text-slate-400 mt-1 flex items-center gap-2">
            <Building2 className="w-3.5 h-3.5 text-indigo-400" />
            Program: <span className="text-slate-200 font-semibold">{appCase.programTitle}</span> | Household of {appCase.householdSize} | Annual Income: ${appCase.annualIncome.toLocaleString()}
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="text-right">
            <div className="text-[11px] text-slate-400">OCR Risk Assessment</div>
            <div className="text-xs font-bold text-emerald-400 flex items-center justify-end gap-1">
              <Sparkles className="w-3.5 h-3.5" />
              {appCase.assessment.overallConfidence}% Confidence
            </div>
          </div>
        </div>
      </div>

      {/* Split Screen Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* LEFT PANE: Document Inspector (5 cols) */}
        <div className="lg:col-span-5 glass-panel rounded-2xl p-5 border border-white/10 flex flex-col space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-800">
            <h3 className="text-sm font-bold text-white flex items-center gap-2">
              <Eye className="w-4 h-4 text-cyan-400" />
              Evidence Document Inspector
            </h3>
            <span className="text-xs text-slate-400 font-mono">{appCase.documents.length} File(s) Attached</span>
          </div>

          {/* Document Selector Tabs */}
          <div className="flex gap-2 overflow-x-auto pb-1">
            {appCase.documents.map((doc) => (
              <button
                key={doc.id}
                onClick={() => setActiveDocId(doc.id)}
                className={`flex items-center gap-2 px-3 py-2 rounded-lg text-xs font-medium transition-all whitespace-nowrap ${
                  activeDocId === doc.id
                    ? 'bg-indigo-600/30 text-indigo-300 border border-indigo-500/40 shadow-sm'
                    : 'bg-slate-900/60 text-slate-400 border border-slate-800 hover:text-slate-200'
                }`}
              >
                <FileText className="w-3.5 h-3.5 text-cyan-400" />
                <span>{doc.name.length > 18 ? doc.name.substring(0, 18) + '...' : doc.name}</span>
              </button>
            ))}
          </div>

          {/* Document Content / OCR Highlighting View */}
          {activeDoc && (
            <div className="flex-1 bg-slate-950 rounded-xl border border-slate-800 p-4 space-y-4 font-mono text-xs">
              <div className="flex items-center justify-between pb-2 border-b border-slate-800 text-[11px] text-slate-400">
                <span>Doc Type: {activeDoc.type}</span>
                <span className="text-indigo-400 font-semibold">OCR Confidence: {activeDoc.ocrConfidence}%</span>
              </div>

              {/* Extracted Key-Value Fields */}
              <div className="p-3 bg-slate-900/90 rounded-lg border border-slate-800 space-y-2">
                <span className="text-[10px] text-slate-500 uppercase tracking-wider font-bold">Extracted Fields:</span>
                {Object.entries(activeDoc.extractedFields || {}).map(([key, item]) => (
                  <div key={key} className="flex items-center justify-between text-xs">
                    <span className="text-slate-400">{key}:</span>
                    <span className={`font-bold ${highlightedText && item.value.includes(highlightedText) ? 'text-amber-300 bg-amber-500/20 px-1 rounded' : 'text-slate-200'}`}>
                      {item.value}
                    </span>
                  </div>
                ))}
              </div>

              {/* Full OCR Raw Text Viewer */}
              <div className="p-3 bg-slate-900/40 rounded-lg border border-slate-800 max-h-60 overflow-y-auto space-y-1 text-slate-300 text-[11px] leading-relaxed">
                <div className="text-[10px] text-slate-500 uppercase font-bold mb-2">OCR Text Extract Stream:</div>
                <pre className="whitespace-pre-wrap font-mono">{activeDoc.ocrExtractedText}</pre>
              </div>
            </div>
          )}
        </div>

        {/* RIGHT PANE: Rule Evaluation & Decision Toolbar (7 cols) */}
        <div className="lg:col-span-7 space-y-6">
          {/* Rule Engine Breakdown */}
          <div className="glass-panel rounded-2xl p-5 border border-white/10 space-y-4">
            <h3 className="text-sm font-bold text-white flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              Automated Rule Evaluation & Evidence Citations
            </h3>

            <div className="space-y-3">
              {appCase.assessment.rules.map((rule) => (
                <RuleCitationCard
                  key={rule.ruleId}
                  rule={rule}
                  onSelectCitation={handleSelectCitation}
                />
              ))}
            </div>
          </div>

          {/* Caseworker Action Toolbar */}
          <div className="glass-panel rounded-2xl p-5 border border-white/10 space-y-4 bg-slate-950/80">
            <h3 className="text-sm font-bold text-white flex items-center gap-2">
              <MessageSquare className="w-4 h-4 text-amber-400" />
              Caseworker Decision & Override Panel
            </h3>

            {/* Justification Notes Input */}
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">
                Caseworker Rationale / Override Justification Notes:
              </label>
              <textarea
                value={reviewerNotes}
                onChange={(e) => setReviewerNotes(e.target.value)}
                placeholder="Enter caseworker rationale, special medical deduction notes, or clarification reasons..."
                rows={3}
                className="w-full bg-slate-900 border border-slate-700 rounded-xl p-3 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500 transition-colors"
              />
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <button
                onClick={() => onUpdateStatus('HUMAN_APPROVED', reviewerNotes)}
                className="flex-1 min-w-[140px] inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold bg-gradient-to-r from-emerald-600 to-teal-500 text-white shadow-lg shadow-emerald-500/20 hover:shadow-emerald-500/30 hover:scale-[1.02] active:scale-[0.98] transition-all"
              >
                <CheckCircle2 className="w-4 h-4" />
                <span>Approve (Human Override)</span>
              </button>

              <button
                onClick={() => onUpdateStatus('ACTION_REQUIRED', reviewerNotes)}
                className="flex-1 min-w-[140px] inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold bg-gradient-to-r from-cyan-600 to-blue-600 text-white shadow-lg shadow-cyan-500/20 hover:shadow-cyan-500/30 hover:scale-[1.02] active:scale-[0.98] transition-all"
              >
                <AlertTriangle className="w-4 h-4" />
                <span>Request Revision</span>
              </button>

              <button
                onClick={() => onUpdateStatus('REJECTED', reviewerNotes)}
                className="flex-1 min-w-[120px] inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold bg-rose-600/30 text-rose-300 border border-rose-500/30 hover:bg-rose-600/50 transition-all"
              >
                <XCircle className="w-4 h-4" />
                <span>Reject Case</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
