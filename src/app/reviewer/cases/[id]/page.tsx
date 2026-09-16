'use client';

import React, { useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { Navbar } from '@/components/shared/Navbar';
import { getApplicationById, updateCaseworkerDecision } from '@/lib/store';
import { SplitScreenInspector } from '@/components/reviewer/SplitScreenInspector';
import { ApplicationStatus } from '@/lib/types';
import { ArrowLeft, UserCheck } from 'lucide-react';
import Link from 'next/link';

export default function CaseReviewPage() {
  const params = useParams();
  const router = useRouter();
  const caseId = (params?.id as string) || 'case-1002';

  const [appCase, setAppCase] = useState(() => getApplicationById(caseId));

  if (!appCase) {
    return (
      <div className="min-h-screen bg-[#07090e] text-slate-100 flex flex-col">
        <Navbar />
        <div className="max-w-xl mx-auto py-20 text-center space-y-4">
          <h1 className="text-xl font-bold text-white">Case Not Found</h1>
          <p className="text-xs text-slate-400">The requested case reference could not be located in the reviewer queue.</p>
          <Link href="/reviewer" className="inline-flex items-center gap-2 text-xs text-amber-400 hover:text-amber-300">
            <ArrowLeft className="w-4 h-4" /> Return to Reviewer Queue
          </Link>
        </div>
      </div>
    );
  }

  const handleUpdateStatus = (newStatus: ApplicationStatus, notes: string) => {
    const updated = updateCaseworkerDecision(appCase.id, newStatus, 'Caseworker Inspector Carter', notes);
    if (updated) {
      setAppCase({ ...updated });
      alert(`🎉 Caseworker decision recorded! Case ${updated.applicationId} set to status: ${newStatus}`);
    }
  };

  return (
    <div className="min-h-screen bg-[#07090e] text-slate-100 flex flex-col">
      <Navbar />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6 flex-1 w-full">
        {/* Navigation Header */}
        <div className="flex items-center justify-between">
          <Link
            href="/reviewer"
            className="inline-flex items-center gap-2 text-xs font-semibold text-slate-400 hover:text-white transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Reviewer Queue</span>
          </Link>

          <span className="text-xs text-amber-400 font-mono flex items-center gap-1.5">
            <UserCheck className="w-4 h-4" />
            Active Session: Inspector Carter (Springfield Municipal District)
          </span>
        </div>

        {/* Split Screen Inspector Tool */}
        <SplitScreenInspector
          appCase={appCase}
          onUpdateStatus={handleUpdateStatus}
        />
      </main>
    </div>
  );
}
