'use client';

import React from 'react';
import Link from 'next/link';
import { Navbar } from '@/components/shared/Navbar';
import { CIVIC_PROGRAMS } from '@/lib/mock-data';
import { LayoutGrid, ArrowRight, ShieldCheck, FileText, Building2 } from 'lucide-react';

export default function ProgramsPage() {
  return (
    <div className="min-h-screen bg-[#07090e] text-slate-100 flex flex-col">
      <Navbar />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-8 flex-1">
        {/* Page Header */}
        <div className="space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-300 text-xs font-semibold">
            <LayoutGrid className="w-3.5 h-3.5 text-indigo-400" />
            <span>Municipal Benefits & Permitting Catalog</span>
          </div>
          <h1 className="text-3xl font-extrabold text-white">Civic Programs Catalog</h1>
          <p className="text-sm text-slate-400 max-w-3xl">
            Explore active public support schemes. Every scheme uses CivicPath transparent eligibility pre-checking with instant document OCR extraction.
          </p>
        </div>

        {/* Programs Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {CIVIC_PROGRAMS.map((prog) => (
            <div key={prog.id} className="glass-panel glass-panel-hover rounded-2xl p-6 border border-white/10 space-y-6 flex flex-col justify-between">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono font-bold px-2.5 py-1 bg-indigo-500/10 text-indigo-300 rounded border border-indigo-500/20">
                    {prog.code}
                  </span>
                  <span className="text-xs font-medium px-2.5 py-1 bg-slate-800 text-slate-300 rounded-full border border-slate-700">
                    {prog.category}
                  </span>
                </div>

                <div>
                  <h2 className="text-xl font-bold text-white">{prog.title}</h2>
                  <p className="text-xs text-slate-400 mt-2 leading-relaxed">{prog.description}</p>
                </div>

                {/* Income & Eligibility Summary Box */}
                <div className="p-4 bg-slate-950/70 rounded-xl border border-slate-800 space-y-2 text-xs">
                  <div className="flex justify-between items-center text-slate-300">
                    <span className="text-slate-400">Single Household Limit:</span>
                    <span className="font-mono font-bold text-emerald-400">${prog.incomeLimitSingle.toLocaleString()} / yr</span>
                  </div>
                  <div className="flex justify-between items-center text-slate-300">
                    <span className="text-slate-400">Family Household Limit:</span>
                    <span className="font-mono font-bold text-emerald-400">${prog.incomeLimitHousehold.toLocaleString()} / yr</span>
                  </div>
                  <div className="pt-2 border-t border-slate-800 text-slate-400">
                    <span className="font-semibold text-slate-300">Eligibility Rule:</span> {prog.eligibilitySummary}
                  </div>
                </div>

                {/* Required Documents List */}
                <div className="space-y-2">
                  <span className="text-xs font-semibold text-slate-300 flex items-center gap-1.5">
                    <FileText className="w-3.5 h-3.5 text-cyan-400" />
                    Required Supporting Evidence:
                  </span>
                  <ul className="space-y-1">
                    {prog.requiredDocuments.map((doc, i) => (
                      <li key={i} className="text-xs text-slate-400 flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-indigo-400" />
                        <span>{doc}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="pt-4 border-t border-slate-800/80 flex items-center justify-between">
                <span className="text-xs text-slate-500 font-mono">Instant Pre-Check Ready</span>
                <Link
                  href={`/apply/${prog.id}`}
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold bg-gradient-to-r from-indigo-600 to-cyan-500 text-white shadow-lg shadow-indigo-500/25 hover:shadow-indigo-500/40 hover:scale-[1.02] active:scale-[0.98] transition-all"
                >
                  <span>Apply Now</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </main>

      <footer className="py-8 px-4 border-t border-white/10 text-center text-xs text-slate-500 bg-slate-950">
        CivicPath • Municipal Benefits Catalog
      </footer>
    </div>
  );
}
