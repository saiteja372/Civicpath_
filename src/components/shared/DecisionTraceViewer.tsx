'use client';

import React from 'react';
import { AuditLogEntry, ApplicationStatus } from '@/lib/types';
import { StatusBadge } from './StatusBadge';
import { Bot, User, ShieldCheck, Clock, FileCheck2, ArrowRight } from 'lucide-react';

interface DecisionTraceViewerProps {
  auditTrail: AuditLogEntry[];
  currentStatus: ApplicationStatus;
  overallConfidence: number;
}

export const DecisionTraceViewer: React.FC<DecisionTraceViewerProps> = ({
  auditTrail,
  currentStatus,
  overallConfidence
}) => {
  return (
    <div className="glass-panel rounded-2xl p-6 border border-white/10 space-y-6">
      <div className="flex items-center justify-between pb-4 border-b border-slate-800">
        <div>
          <h3 className="text-lg font-bold text-white flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-indigo-400" />
            Immutable Evidence-to-Decision Audit Trace
          </h3>
          <p className="text-xs text-slate-400 mt-1">
            End-to-end cryptographic and verification log tracking input evidence, rule evaluation, and final state.
          </p>
        </div>

        <div className="text-right">
          <div className="text-xs text-slate-400">Current State</div>
          <div className="mt-1">
            <StatusBadge status={currentStatus} size="lg" />
          </div>
        </div>
      </div>

      {/* Confidence Meter */}
      <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400 font-bold text-sm">
            {overallConfidence}%
          </div>
          <div>
            <div className="text-sm font-semibold text-slate-200">System Confidence Score</div>
            <div className="text-xs text-slate-400">Based on OCR accuracy, rule match precision, and cross-document validation.</div>
          </div>
        </div>

        <div className="w-32 bg-slate-800 rounded-full h-2.5 overflow-hidden border border-slate-700">
          <div 
            className={`h-full rounded-full transition-all duration-500 ${
              overallConfidence >= 90 ? 'bg-gradient-to-r from-emerald-500 to-teal-400' : 'bg-gradient-to-r from-amber-500 to-yellow-400'
            }`}
            style={{ width: `${overallConfidence}%` }}
          />
        </div>
      </div>

      {/* Audit Timeline */}
      <div className="relative pl-6 space-y-6 before:absolute before:left-2.5 before:top-3 before:bottom-3 before:w-0.5 before:bg-slate-800">
        {auditTrail.map((entry, idx) => {
          const isAI = entry.actor === 'SYSTEM_AI';
          const isCaseworker = entry.actor === 'CASEWORKER';

          return (
            <div key={entry.id || idx} className="relative group">
              {/* Timeline Node Icon */}
              <div className={`absolute -left-[31px] top-1 w-7 h-7 rounded-full flex items-center justify-center border text-xs ${
                isAI 
                  ? 'bg-indigo-950 border-indigo-500 text-indigo-400 shadow-md shadow-indigo-500/20' 
                  : isCaseworker 
                  ? 'bg-amber-950 border-amber-500 text-amber-400 shadow-md shadow-amber-500/20'
                  : 'bg-slate-900 border-slate-700 text-slate-300'
              }`}>
                {isAI ? <Bot className="w-3.5 h-3.5" /> : isCaseworker ? <ShieldCheck className="w-3.5 h-3.5" /> : <User className="w-3.5 h-3.5" />}
              </div>

              {/* Event Content */}
              <div className="bg-slate-950/40 p-3.5 rounded-xl border border-slate-800/80 hover:border-slate-700 transition-colors">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-slate-200">{entry.action.replace(/_/g, ' ')}</span>
                    <span className={`text-[10px] px-2 py-0.5 rounded font-mono ${
                      isAI ? 'bg-indigo-500/10 text-indigo-300 border border-indigo-500/20' : 'bg-amber-500/10 text-amber-300 border border-amber-500/20'
                    }`}>
                      {entry.actorName}
                    </span>
                  </div>

                  <span className="text-[11px] text-slate-500 font-mono flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    {new Date(entry.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' })}
                  </span>
                </div>

                {entry.notes && (
                  <p className="text-xs text-slate-300 mt-2 font-mono bg-slate-900/60 p-2 rounded border border-slate-800">
                    {entry.notes}
                  </p>
                )}

                {entry.previousStatus && entry.newStatus && (
                  <div className="flex items-center gap-2 mt-2 text-xs text-slate-400 font-mono">
                    <span>State Transition:</span>
                    <span className="text-slate-400">{entry.previousStatus}</span>
                    <ArrowRight className="w-3 h-3 text-indigo-400" />
                    <span className="text-emerald-400 font-semibold">{entry.newStatus}</span>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
