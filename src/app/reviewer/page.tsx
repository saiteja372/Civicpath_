'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Navbar } from '@/components/shared/Navbar';
import { getAllApplications } from '@/lib/store';
import { StatusBadge } from '@/components/shared/StatusBadge';
import { ApplicationStatus } from '@/lib/types';
import { UserCheck, ShieldAlert, CheckCircle2, Clock, Search, Filter, ArrowRight, Building2, AlertTriangle } from 'lucide-react';

export default function ReviewerDashboardPage() {
  const [applications, setApplications] = useState(() => getAllApplications());
  const [filterStatus, setFilterStatus] = useState<string>('ALL');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const filteredApps = applications.filter(app => {
    const matchesStatus = 
      filterStatus === 'ALL' ||
      (filterStatus === 'FLAGGED' && app.status === 'FLAGGED_FOR_REVIEW') ||
      (filterStatus === 'APPROVED' && (app.status === 'AUTO_APPROVED' || app.status === 'HUMAN_APPROVED')) ||
      (filterStatus === 'ACTION' && app.status === 'ACTION_REQUIRED');

    const matchesSearch = 
      app.applicantName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      app.applicationId.toLowerCase().includes(searchQuery.toLowerCase()) ||
      app.programTitle.toLowerCase().includes(searchQuery.toLowerCase());

    return matchesStatus && matchesSearch;
  });

  const pendingCount = applications.filter(a => a.status === 'FLAGGED_FOR_REVIEW').length;
  const approvedCount = applications.filter(a => a.status === 'AUTO_APPROVED' || a.status === 'HUMAN_APPROVED').length;
  const actionCount = applications.filter(a => a.status === 'ACTION_REQUIRED').length;

  return (
    <div className="min-h-screen bg-[#07090e] text-slate-100 flex flex-col">
      <Navbar />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8 flex-1 w-full">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-300 text-xs font-semibold">
              <UserCheck className="w-3.5 h-3.5 text-amber-400" />
              <span>Municipal Caseworker Reviewer Command Center</span>
            </div>
            <h1 className="text-3xl font-extrabold text-white mt-1">Reviewer Queue & Inspection Dashboard</h1>
            <p className="text-xs text-slate-400">Inspect evidence-to-decision traces, review AI flags, and execute human-in-the-loop overrides.</p>
          </div>
        </div>

        {/* Metrics Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
          <div className="p-4 rounded-2xl glass-panel border border-white/10 space-y-1">
            <div className="text-xs text-slate-400 font-medium">Total Applications</div>
            <div className="text-2xl font-bold text-white font-mono">{applications.length}</div>
          </div>

          <div className="p-4 rounded-2xl glass-panel border border-amber-500/30 bg-amber-950/20 space-y-1">
            <div className="text-xs text-amber-400 font-semibold flex items-center justify-between">
              <span>Pending Human Review</span>
              <AlertTriangle className="w-4 h-4" />
            </div>
            <div className="text-2xl font-bold text-amber-300 font-mono">{pendingCount}</div>
          </div>

          <div className="p-4 rounded-2xl glass-panel border border-emerald-500/30 bg-emerald-950/20 space-y-1">
            <div className="text-xs text-emerald-400 font-semibold flex items-center justify-between">
              <span>Approved Cases</span>
              <CheckCircle2 className="w-4 h-4" />
            </div>
            <div className="text-2xl font-bold text-emerald-300 font-mono">{approvedCount}</div>
          </div>

          <div className="p-4 rounded-2xl glass-panel border border-cyan-500/30 bg-cyan-950/20 space-y-1">
            <div className="text-xs text-cyan-400 font-semibold flex items-center justify-between">
              <span>Action Required</span>
              <Clock className="w-4 h-4" />
            </div>
            <div className="text-2xl font-bold text-cyan-300 font-mono">{actionCount}</div>
          </div>
        </div>

        {/* Filter & Search Toolbar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-4 rounded-2xl glass-panel border border-white/10">
          <div className="relative w-full sm:w-80">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
            <input
              type="text"
              placeholder="Search applicant name, ID, scheme..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-9 pr-4 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500"
            />
          </div>

          {/* Status Tabs */}
          <div className="flex items-center gap-1.5 overflow-x-auto w-full sm:w-auto">
            {[
              { key: 'ALL', label: 'All Cases' },
              { key: 'FLAGGED', label: 'Needs Review', badge: pendingCount },
              { key: 'ACTION', label: 'Action Required', badge: actionCount },
              { key: 'APPROVED', label: 'Approved' }
            ].map(tab => (
              <button
                key={tab.key}
                onClick={() => setFilterStatus(tab.key)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all flex items-center gap-1.5 ${
                  filterStatus === tab.key
                    ? 'bg-indigo-600 text-white shadow-md'
                    : 'bg-slate-900 text-slate-400 hover:text-slate-200'
                }`}
              >
                <span>{tab.label}</span>
                {tab.badge !== undefined && tab.badge > 0 && (
                  <span className="px-1.5 py-0.2 text-[10px] bg-amber-500/20 text-amber-300 rounded-full font-mono">
                    {tab.badge}
                  </span>
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Applications List */}
        <div className="space-y-4">
          {filteredApps.map((app) => (
            <div key={app.id} className="glass-panel glass-panel-hover rounded-2xl p-6 border border-white/10 space-y-4 flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div className="space-y-2">
                <div className="flex items-center gap-3">
                  <h3 className="text-base font-bold text-white">{app.applicantName}</h3>
                  <span className="font-mono text-xs px-2.5 py-0.5 bg-slate-900 text-indigo-300 rounded border border-slate-800">
                    {app.applicationId}
                  </span>
                  <StatusBadge status={app.status} size="sm" />
                </div>

                <div className="flex flex-wrap items-center gap-4 text-xs text-slate-400">
                  <span className="flex items-center gap-1">
                    <Building2 className="w-3.5 h-3.5 text-indigo-400" />
                    {app.programTitle}
                  </span>
                  <span>• Household: {app.householdSize} member(s)</span>
                  <span>• Annual Income: ${app.annualIncome.toLocaleString()}</span>
                  <span>• OCR Score: <span className="text-indigo-300 font-bold">{app.assessment.overallConfidence}%</span></span>
                </div>
              </div>

              <div className="flex items-center gap-3 pt-2 md:pt-0 border-t md:border-t-0 border-slate-800">
                <Link
                  href={`/reviewer/cases/${app.id}`}
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold bg-gradient-to-r from-amber-600 to-indigo-600 text-white shadow-lg shadow-indigo-500/20 hover:scale-[1.02] active:scale-[0.98] transition-all"
                >
                  <span>Inspect Case</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
