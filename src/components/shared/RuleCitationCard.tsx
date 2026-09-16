'use client';

import React, { useState } from 'react';
import { RuleEvaluation } from '@/lib/types';
import { StatusBadge } from './StatusBadge';
import { FileText, ChevronDown, ExternalLink, ShieldCheck, Sparkles } from 'lucide-react';

interface RuleCitationCardProps {
  rule: RuleEvaluation;
  onSelectCitation?: (docId: string, snippet?: string) => void;
}

export const RuleCitationCard: React.FC<RuleCitationCardProps> = ({ rule, onSelectCitation }) => {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <div className={`rounded-xl border transition-all duration-200 ${
      rule.status === 'PASS' 
        ? 'bg-slate-900/60 border-emerald-500/20 hover:border-emerald-500/40'
        : rule.status === 'FLAGGED'
        ? 'bg-slate-900/60 border-amber-500/30 hover:border-amber-500/50'
        : 'bg-slate-900/60 border-rose-500/30 hover:border-rose-500/50'
    }`}>
      {/* Header Bar */}
      <div 
        onClick={() => setIsOpen(!isOpen)}
        className="p-4 flex items-center justify-between cursor-pointer select-none"
      >
        <div className="flex items-center gap-3">
          <div className={`w-8 h-8 rounded-lg flex items-center justify-center font-mono text-xs font-bold ${
            rule.status === 'PASS' 
              ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
              : rule.status === 'FLAGGED'
              ? 'bg-amber-500/10 text-amber-400 border border-amber-500/30'
              : 'bg-rose-500/10 text-rose-400 border border-rose-500/20'
          }`}>
            {rule.ruleCode.substring(0, 3)}
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h4 className="text-sm font-semibold text-slate-100">{rule.title}</h4>
              <span className="text-[10px] font-medium px-2 py-0.5 rounded bg-slate-800 text-slate-400 border border-slate-700">
                {rule.category}
              </span>
            </div>
            <p className="text-xs text-slate-400 mt-0.5">{rule.description}</p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <StatusBadge status={rule.status} size="sm" />
          <ChevronDown className={`w-4 h-4 text-slate-400 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
        </div>
      </div>

      {/* Expanded Details & Evidence Citation */}
      {isOpen && (
        <div className="px-4 pb-4 pt-1 border-t border-slate-800/80 space-y-3">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs bg-slate-950/50 p-3 rounded-lg border border-slate-800">
            <div>
              <span className="text-slate-400 font-medium">Required Threshold:</span>
              <div className="font-mono text-slate-200 mt-0.5 font-semibold">{rule.threshold}</div>
            </div>
            <div>
              <span className="text-slate-400 font-medium">Extracted Evidence Value:</span>
              <div className={`font-mono mt-0.5 font-semibold ${
                rule.status === 'PASS' ? 'text-emerald-300' : rule.status === 'FLAGGED' ? 'text-amber-300' : 'text-rose-300'
              }`}>
                {rule.actualValue}
              </div>
            </div>
          </div>

          {rule.flagReason && (
            <div className="p-2.5 rounded-lg bg-amber-500/10 border border-amber-500/20 text-xs text-amber-300 flex items-start gap-2">
              <ShieldCheck className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
              <div>
                <span className="font-semibold">Reviewer Flag Context:</span> {rule.flagReason}
              </div>
            </div>
          )}

          {/* Citation Badge */}
          {rule.citation && (
            <div className="flex items-center justify-between p-2.5 rounded-lg bg-indigo-950/30 border border-indigo-500/20 hover:border-indigo-500/40 transition-colors">
              <div className="flex items-center gap-2.5">
                <FileText className="w-4 h-4 text-indigo-400" />
                <div className="text-xs">
                  <span className="text-indigo-300 font-medium flex items-center gap-1.5">
                    Cited Evidence: <span className="underline decoration-indigo-400/40">{rule.citation.documentName}</span>
                    <span className="px-1.5 py-0.2 text-[9px] bg-indigo-500/20 text-indigo-300 rounded-full border border-indigo-500/30">
                      OCR {rule.citation.confidence}% Confidence
                    </span>
                  </span>
                  <p className="text-[11px] text-slate-400 mt-0.5 font-mono">
                    Field: &quot;{rule.citation.extractedField}&quot; ➔ Value: &quot;{rule.citation.extractedValue}&quot;
                  </p>
                </div>
              </div>

              <button
                onClick={() => onSelectCitation && rule.citation && onSelectCitation(rule.citation.documentId, rule.citation.extractedValue)}
                className="flex items-center gap-1 text-[11px] font-semibold text-indigo-400 hover:text-indigo-300 bg-indigo-500/10 hover:bg-indigo-500/20 px-2.5 py-1 rounded-md border border-indigo-500/30 transition-all"
              >
                <Sparkles className="w-3 h-3 text-cyan-400" />
                <span>Inspect Trace</span>
                <ExternalLink className="w-3 h-3" />
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
