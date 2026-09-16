'use client';

import React from 'react';
import Link from 'next/link';
import { Navbar } from '@/components/shared/Navbar';
import { CIVIC_PROGRAMS } from '@/lib/mock-data';
import { Shield, Sparkles, FileCheck, ArrowRight, Bot, Cpu, Zap, GitBranch, ArrowUpRight, Building2, CheckCircle2, Layers } from 'lucide-react';
import { motion } from 'framer-motion';

export default function HomePage() {
  return (
    <div className="min-h-screen bg-[#02040d] text-slate-100 flex flex-col relative overflow-hidden">
      {/* Radial Background Mesh Glow behind Hero */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[500px] bg-gradient-to-b from-cyan-500/10 via-violet-600/10 to-transparent rounded-full blur-[140px] pointer-events-none" />

      <Navbar />

      {/* 1. NEXACORE HERO & FLOATING CTAs */}
      <section className="relative pt-32 pb-20 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto w-full text-center space-y-10 z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-slate-900/60 border border-slate-800 text-cyan-300 text-xs font-semibold backdrop-blur-xl shadow-[0_0_20px_rgba(0,240,255,0.15)]"
        >
          <Sparkles className="w-3.5 h-3.5 text-cyan-400 animate-pulse" />
          <span>Vibeathon AI Hackathon Entry • Hirael Nexacore Architecture</span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-white leading-[1.12] font-display max-w-5xl mx-auto"
        >
          Clear Roads to Public Benefits with{' '}
          <span className="bg-gradient-to-r from-cyan-400 via-sky-300 to-violet-500 bg-clip-text text-transparent">
            Explainable AI
          </span>{' '}
          & Traceable Evidence
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="max-w-3xl mx-auto text-base sm:text-lg text-slate-400 font-normal leading-relaxed"
        >
          CivicPath automates government permit and benefit verification. By combining deterministic rule engines, 
          multimodal OCR document extraction, plain-language reasoning, and caseworker human-in-the-loop overrides, 
          civic decisions are fast, fair, and 100% transparent.
        </motion.p>

        {/* Hero Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-5 pt-3"
        >
          {/* Primary Floating Button */}
          <motion.div
            animate={{ y: [-4, 4, -4] }}
            transition={{ duration: 3.2, repeat: Infinity, ease: 'easeInOut' }}
          >
            <Link
              href="/apply/prog-housing-2026"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-4 rounded-full text-sm font-bold bg-cyan-400 text-slate-950 shadow-[0_0_25px_rgba(0,240,255,0.4)] hover:shadow-[0_0_35px_rgba(0,240,255,0.6)] hover:scale-105 active:scale-95 transition-all duration-300"
            >
              <FileCheck className="w-5 h-5 text-slate-950 font-bold" />
              <span className="font-bold">Launch Applicant Flow</span>
              <ArrowRight className="w-4 h-4 text-slate-950 font-bold" />
            </Link>
          </motion.div>

          {/* Secondary Ghost Violet Button */}
          <Link
            href="/reviewer"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-4 rounded-full text-sm font-bold bg-slate-900/40 text-violet-300 backdrop-blur-xl border border-violet-500/50 hover:bg-violet-500/10 shadow-[0_0_20px_rgba(157,78,221,0.2)] hover:shadow-[0_0_30px_rgba(157,78,221,0.35)] hover:scale-105 active:scale-95 transition-all duration-300"
          >
            <Bot className="w-5 h-5 text-violet-400" />
            <span>Open Caseworker Reviewer Portal</span>
          </Link>
        </motion.div>

        {/* 2. FLOATING AUDIT METRICS BADGES */}
        <div className="pt-16 grid grid-cols-2 sm:grid-cols-4 gap-4 max-w-5xl mx-auto text-left relative z-20">
          <motion.div
            animate={{ y: [-5, 5, -5] }}
            transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
            className="nexacore-glass rounded-2xl p-5 border border-slate-800 hover:border-cyan-500/50 space-y-1.5 transition-all"
          >
            <div className="text-cyan-400 font-bold text-2xl font-display flex items-center gap-1.5">
              <span>100%</span>
              <Zap className="w-4 h-4 text-cyan-400" />
            </div>
            <div className="text-xs font-bold text-white uppercase tracking-wider">Clean Data</div>
            <div className="text-[11px] text-slate-400 leading-snug">Rules link directly to document bounding boxes.</div>
          </motion.div>

          <motion.div
            animate={{ y: [-3, 3, -3] }}
            transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut', delay: 0.4 }}
            className="nexacore-glass rounded-2xl p-5 border border-slate-800 hover:border-cyan-500/50 space-y-1.5 transition-all"
          >
            <div className="text-cyan-300 font-bold text-2xl font-display flex items-center gap-1.5">
              <span>&lt; 2 Sec</span>
              <Cpu className="w-4 h-4 text-cyan-300" />
            </div>
            <div className="text-xs font-bold text-white uppercase tracking-wider">Processing</div>
            <div className="text-[11px] text-slate-400 leading-snug">Instant OCR field validation & rule execution.</div>
          </motion.div>

          <motion.div
            animate={{ y: [-6, 6, -6] }}
            transition={{ duration: 4.2, repeat: Infinity, ease: 'easeInOut', delay: 0.8 }}
            className="nexacore-glass rounded-2xl p-5 border border-slate-800 hover:border-violet-500/50 space-y-1.5 transition-all"
          >
            <div className="text-violet-400 font-bold text-2xl font-display flex items-center gap-1.5">
              <span>Human-in-Loop</span>
              <Shield className="w-4 h-4 text-violet-300" />
            </div>
            <div className="text-xs font-bold text-white uppercase tracking-wider">Caseworker Review</div>
            <div className="text-[11px] text-slate-400 leading-snug">Borderline cases routed to split-screen inspector.</div>
          </motion.div>

          <motion.div
            animate={{ y: [-4, 4, -4] }}
            transition={{ duration: 3.8, repeat: Infinity, ease: 'easeInOut', delay: 1.2 }}
            className="nexacore-glass rounded-2xl p-5 border border-slate-800 hover:border-violet-500/50 space-y-1.5 transition-all"
          >
            <div className="text-violet-300 font-bold text-2xl font-display flex items-center gap-1.5">
              <span>Actionable</span>
              <Sparkles className="w-4 h-4 text-violet-300" />
            </div>
            <div className="text-xs font-bold text-white uppercase tracking-wider">Next Steps</div>
            <div className="text-[11px] text-slate-400 leading-snug">Clear guidance on certificates or re-uploads.</div>
          </motion.div>
        </div>
      </section>

      {/* 3. THE 7-STEP PIPELINE (BENTO GRID FLOW) */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto w-full space-y-12 relative z-10">
        <div className="text-center space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-violet-500/10 border border-violet-500/30 text-violet-300 text-xs font-semibold">
            <GitBranch className="w-3.5 h-3.5 text-violet-400" />
            <span>Nexacore Bento Pipeline Flow</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white font-display">
            The 7-Step Evidence-to-Decision Pipeline
          </h2>
          <p className="text-sm text-slate-400 max-w-2xl mx-auto">
            Bento Grid flow connecting applicant evidence to deterministic rule evaluation and caseworker audit traces.
          </p>
        </div>

        {/* Bento Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-5 relative">
          {/* Card 1: Step 01 (5 cols) */}
          <div className="md:col-span-5 nexacore-glass nexacore-glass-hover rounded-3xl p-7 border border-slate-800 space-y-4 relative group">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono font-bold px-3 py-1 bg-cyan-500/10 text-cyan-300 rounded-full border border-cyan-500/30">
                STEP 01
              </span>
              <span className="text-xs font-mono text-cyan-400">INPUT DATA</span>
            </div>
            <h3 className="text-xl font-bold text-white font-display">Applicant Information</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Applicant submits profile data, household composition, income level, and target benefit scheme.
            </p>
            <div className="pt-3 border-t border-slate-800/80 flex items-center justify-between text-xs font-mono">
              <span className="text-slate-500">Validation Status:</span>
              <span className="text-cyan-300 font-semibold">Profile Complete</span>
            </div>
          </div>

          {/* Card 2: Step 02 (7 cols) */}
          <div className="md:col-span-7 nexacore-glass nexacore-glass-hover rounded-3xl p-7 border border-slate-800 space-y-4 relative group">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono font-bold px-3 py-1 bg-cyan-500/10 text-cyan-300 rounded-full border border-cyan-500/30">
                STEP 02
              </span>
              <span className="text-xs font-mono text-cyan-400">MULTIMODAL OCR</span>
            </div>
            <h3 className="text-xl font-bold text-white font-display">Evidence OCR Extraction</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Multimodal OCR parses IDs, paystubs, utility bills, and tax returns with key-value bounding box extraction and confidence scoring.
            </p>
            <div className="pt-3 border-t border-slate-800/80 flex items-center justify-between text-xs font-mono">
              <span className="text-slate-500">OCR Precision:</span>
              <span className="text-cyan-300 font-semibold">98.2% Field Confidence</span>
            </div>
          </div>

          {/* Card 3: Step 03 (7 cols) */}
          <div className="md:col-span-7 nexacore-glass nexacore-glass-hover rounded-3xl p-7 border border-slate-800 space-y-4 relative group">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono font-bold px-3 py-1 bg-violet-500/10 text-violet-300 rounded-full border border-violet-500/30">
                STEP 03
              </span>
              <span className="text-xs font-mono text-violet-400">HYBRID EVALUATION</span>
            </div>
            <h3 className="text-xl font-bold text-white font-display">Hybrid Assessment Engine</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Deterministic rule evaluator checks income caps, residency requirements, and document recency against municipal regulations.
            </p>
            <div className="pt-3 border-t border-slate-800/80 flex items-center justify-between text-xs font-mono">
              <span className="text-slate-500">Deterministic Rules:</span>
              <span className="text-violet-300 font-semibold">4 Rules Executed</span>
            </div>
          </div>

          {/* Card 4: Step 04-07 (5 cols) */}
          <div className="md:col-span-5 nexacore-glass nexacore-glass-hover rounded-3xl p-7 border border-slate-800 space-y-4 relative group">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono font-bold px-3 py-1 bg-violet-500/10 text-violet-300 rounded-full border border-violet-500/30">
                STEPS 04 - 07
              </span>
              <span className="text-xs font-mono text-violet-400">AUDIT TRACE</span>
            </div>
            <h3 className="text-xl font-bold text-white font-display">Explanation & Caseworker Trace</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Generates plain-language reasoning, next action guidance, and routes edge cases to split-screen caseworker review.
            </p>
            <div className="pt-3 border-t border-slate-800/80 flex items-center justify-between text-xs font-mono">
              <span className="text-slate-500">Audit Trail:</span>
              <span className="text-violet-300 font-semibold">Immutable Trace</span>
            </div>
          </div>
        </div>
      </section>

      {/* 4. MUNICIPAL PROGRAM CATALOG (HEX/GRID TILES) */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto w-full space-y-10 relative z-10 flex-1">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 text-xs font-semibold">
              <Building2 className="w-3.5 h-3.5 text-cyan-400" />
              <span>Municipal Support Schemes</span>
            </div>
            <h2 className="text-3xl font-extrabold text-white font-display mt-1">Active Municipal Programs</h2>
            <p className="text-xs text-slate-400 mt-1">Select a program to launch the interactive applicant wizard.</p>
          </div>

          <Link 
            href="/programs" 
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-semibold bg-slate-900 text-cyan-300 border border-cyan-500/30 hover:border-cyan-400 shadow-[0_0_15px_rgba(0,240,255,0.15)] transition-all"
          >
            <span>View All Programs</span>
            <ArrowUpRight className="w-4 h-4 text-cyan-400" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {CIVIC_PROGRAMS.map((prog) => (
            <div 
              key={prog.id} 
              className="nexacore-glass nexacore-glass-hover rounded-3xl p-7 border border-slate-800 space-y-5 flex flex-col justify-between group"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono font-bold px-3 py-1 bg-gradient-to-r from-cyan-500/20 to-violet-500/20 text-cyan-300 rounded-full border border-cyan-500/30">
                    {prog.code}
                  </span>
                  <span className="text-xs font-medium px-3 py-1 bg-slate-950 text-slate-300 rounded-full border border-slate-800">
                    {prog.category}
                  </span>
                </div>

                <div>
                  <h3 className="text-xl font-bold text-white font-display group-hover:text-cyan-300 transition-colors">{prog.title}</h3>
                  <p className="text-xs text-slate-400 mt-2 leading-relaxed">{prog.description}</p>
                </div>

                <div className="p-4 bg-slate-950/80 rounded-2xl border border-slate-800 space-y-1.5 text-xs font-mono">
                  <div className="text-slate-500">Household Income Limit:</div>
                  <div className="text-emerald-400 font-bold text-sm">
                    Single: ${prog.incomeLimitSingle.toLocaleString()} / Household: ${prog.incomeLimitHousehold.toLocaleString()}
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-slate-800/80 flex items-center justify-between">
                <span className="text-xs text-slate-400">{prog.requiredDocuments.length} required document(s)</span>
                <Link
                  href={`/apply/${prog.id}`}
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-bold bg-gradient-to-r from-cyan-500 via-sky-400 to-violet-600 text-slate-950 shadow-[0_0_20px_rgba(0,240,255,0.25)] hover:shadow-[0_0_30px_rgba(0,240,255,0.45)] hover:scale-105 active:scale-95 transition-all"
                >
                  <span className="font-bold">Apply Now</span>
                  <ArrowRight className="w-4 h-4 font-bold" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* FOOTER */}
      <footer className="py-8 px-4 border-t border-slate-800 text-center text-xs text-slate-500 bg-[#02040d] relative z-10">
        CivicPath • Built for Vibeathon • Hirael Nexacore UI Architecture & Transparent Civic Decisioning Engine
      </footer>
    </div>
  );
}
