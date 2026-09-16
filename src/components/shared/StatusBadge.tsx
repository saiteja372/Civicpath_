'use client';

import React from 'react';
import { ApplicationStatus, RuleStatus } from '@/lib/types';
import { CheckCircle2, AlertTriangle, XCircle, Clock, FileEdit, ShieldAlert } from 'lucide-react';

interface StatusBadgeProps {
  status: ApplicationStatus | RuleStatus;
  size?: 'sm' | 'md' | 'lg';
}

export const StatusBadge: React.FC<StatusBadgeProps> = ({ status, size = 'md' }) => {
  const sizeClasses = {
    sm: 'px-2 py-0.5 text-xs gap-1',
    md: 'px-2.5 py-1 text-xs font-medium gap-1.5',
    lg: 'px-3.5 py-1.5 text-sm font-semibold gap-2'
  };

  switch (status) {
    case 'AUTO_APPROVED':
    case 'HUMAN_APPROVED':
    case 'PASS':
      return (
        <span className={`inline-flex items-center rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 ${sizeClasses[size]}`}>
          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
          {status === 'PASS' ? 'PASSED' : status === 'AUTO_APPROVED' ? 'Auto Approved' : 'Approved by Reviewer'}
        </span>
      );

    case 'FLAGGED_FOR_REVIEW':
    case 'FLAGGED':
      return (
        <span className={`inline-flex items-center rounded-full bg-amber-500/10 text-amber-400 border border-amber-500/25 ${sizeClasses[size]}`}>
          <AlertTriangle className="w-3.5 h-3.5 text-amber-400 shrink-0" />
          {status === 'FLAGGED' ? 'FLAGGED' : 'Needs Review'}
        </span>
      );

    case 'ACTION_REQUIRED':
      return (
        <span className={`inline-flex items-center rounded-full bg-cyan-500/10 text-cyan-400 border border-cyan-500/25 ${sizeClasses[size]}`}>
          <FileEdit className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
          Action Required
        </span>
      );

    case 'REJECTED':
    case 'FAIL':
      return (
        <span className={`inline-flex items-center rounded-full bg-rose-500/10 text-rose-400 border border-rose-500/20 ${sizeClasses[size]}`}>
          <XCircle className="w-3.5 h-3.5 text-rose-400 shrink-0" />
          {status === 'FAIL' ? 'FAILED' : 'Ineligible'}
        </span>
      );

    case 'SUBMITTED':
      return (
        <span className={`inline-flex items-center rounded-full bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 ${sizeClasses[size]}`}>
          <Clock className="w-3.5 h-3.5 text-indigo-400 shrink-0" />
          Processing
        </span>
      );

    default:
      return (
        <span className={`inline-flex items-center rounded-full bg-slate-800 text-slate-300 border border-slate-700 ${sizeClasses[size]}`}>
          <ShieldAlert className="w-3.5 h-3.5 text-slate-400 shrink-0" />
          {status}
        </span>
      );
  }
};
