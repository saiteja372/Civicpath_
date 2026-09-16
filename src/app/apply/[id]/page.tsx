'use client';

import React, { useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { Navbar } from '@/components/shared/Navbar';
import { getProgramById } from '@/lib/store';
import { createApplication } from '@/lib/store';
import { CIVIC_PROGRAMS } from '@/lib/mock-data';
import { FileText, UploadCloud, CheckCircle2, ArrowRight, ArrowLeft, Sparkles, Bot, ShieldCheck, Loader2 } from 'lucide-react';

export default function ApplyPage() {
  const router = useRouter();
  const params = useParams();
  const programId = (params?.id as string) || 'prog-housing-2026';
  const program = getProgramById(programId) || CIVIC_PROGRAMS[0];

  const [step, setStep] = useState<number>(1);
  const [isProcessing, setIsProcessing] = useState<boolean>(false);

  // Form State
  const [applicantName, setApplicantName] = useState('Elena Vance');
  const [applicantEmail, setApplicantEmail] = useState('elena.vance@example.com');
  const [applicantPhone, setApplicantPhone] = useState('+1 (555) 234-5678');
  const [householdSize, setHouseholdSize] = useState<number>(3);
  const [annualIncome, setAnnualIncome] = useState<number>(34200);
  const [residencyAddress, setResidencyAddress] = useState('742 Evergreen Terrace, Apt 4B, Springfield');

  // File Upload State
  const [uploadedFiles, setUploadedFiles] = useState<{ name: string; type: string; size: number }[]>([
    { name: 'State_Driver_License_Elena.pdf', type: 'Government ID', size: 1420000 },
    { name: 'August_2026_Paystub_AcmeCorp.pdf', type: 'Paystub', size: 890000 },
    { name: 'Springfield_Water_Electric_Aug2026.pdf', type: 'Utility Bill', size: 1100000 }
  ]);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const filesArray = Array.from(e.target.files).map(file => ({
        name: file.name,
        type: file.type.includes('pdf') ? 'PDF Document' : 'Image Scan',
        size: file.size
      }));
      setUploadedFiles(prev => [...prev, ...filesArray]);
    }
  };

  const handleRunEvaluationAndSubmit = () => {
    setIsProcessing(true);

    setTimeout(() => {
      const createdCase = createApplication({
        programId: program.id,
        applicantName,
        applicantEmail,
        applicantPhone,
        householdSize,
        annualIncome,
        residencyAddress,
        uploadedFiles
      });

      setIsProcessing(false);
      router.push(`/applications/${createdCase.id}`);
    }, 1800);
  };

  return (
    <div className="min-h-screen bg-[#07090e] text-slate-100 flex flex-col">
      <Navbar />

      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8 flex-1 w-full">
        {/* Header */}
        <div className="space-y-2 text-center sm:text-left">
          <span className="text-xs font-mono font-bold px-2.5 py-1 bg-indigo-500/10 text-indigo-300 rounded border border-indigo-500/20">
            PROGRAM: {program.code}
          </span>
          <h1 className="text-3xl font-extrabold text-white">Application Wizard: {program.title}</h1>
          <p className="text-xs text-slate-400">Complete profile details and upload supporting evidence for instant OCR eligibility evaluation.</p>
        </div>

        {/* Wizard Step Indicator */}
        <div className="grid grid-cols-3 gap-2 p-1 rounded-xl bg-slate-900 border border-slate-800 text-xs font-semibold">
          <div className={`p-3 rounded-lg flex items-center justify-center gap-2 transition-all ${
            step === 1 ? 'bg-indigo-600 text-white shadow-md' : 'text-slate-400'
          }`}>
            <span>1. Profile & Household</span>
          </div>
          <div className={`p-3 rounded-lg flex items-center justify-center gap-2 transition-all ${
            step === 2 ? 'bg-indigo-600 text-white shadow-md' : 'text-slate-400'
          }`}>
            <span>2. Evidence Documents</span>
          </div>
          <div className={`p-3 rounded-lg flex items-center justify-center gap-2 transition-all ${
            step === 3 ? 'bg-indigo-600 text-white shadow-md' : 'text-slate-400'
          }`}>
            <span>3. Instant Pre-Check</span>
          </div>
        </div>

        {/* STEP 1: Applicant Information */}
        {step === 1 && (
          <div className="glass-panel rounded-2xl p-6 border border-white/10 space-y-6">
            <h2 className="text-lg font-bold text-white flex items-center gap-2">
              <FileText className="w-5 h-5 text-indigo-400" />
              Applicant Profile & Household Details
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div>
                <label className="block text-slate-300 font-semibold mb-1">Full Legal Name</label>
                <input
                  type="text"
                  value={applicantName}
                  onChange={(e) => setApplicantName(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-700 rounded-xl p-3 text-white focus:outline-none focus:border-indigo-500"
                />
              </div>

              <div>
                <label className="block text-slate-300 font-semibold mb-1">Email Address</label>
                <input
                  type="email"
                  value={applicantEmail}
                  onChange={(e) => setApplicantEmail(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-700 rounded-xl p-3 text-white focus:outline-none focus:border-indigo-500"
                />
              </div>

              <div>
                <label className="block text-slate-300 font-semibold mb-1">Phone Number</label>
                <input
                  type="text"
                  value={applicantPhone}
                  onChange={(e) => setApplicantPhone(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-700 rounded-xl p-3 text-white focus:outline-none focus:border-indigo-500"
                />
              </div>

              <div>
                <label className="block text-slate-300 font-semibold mb-1">Household Size (Number of People)</label>
                <input
                  type="number"
                  min={1}
                  max={10}
                  value={householdSize}
                  onChange={(e) => setHouseholdSize(Number(e.target.value))}
                  className="w-full bg-slate-900 border border-slate-700 rounded-xl p-3 text-white focus:outline-none focus:border-indigo-500 font-mono"
                />
              </div>

              <div>
                <label className="block text-slate-300 font-semibold mb-1">Reported Annual Household Income ($)</label>
                <input
                  type="number"
                  step={100}
                  value={annualIncome}
                  onChange={(e) => setAnnualIncome(Number(e.target.value))}
                  className="w-full bg-slate-900 border border-slate-700 rounded-xl p-3 text-white focus:outline-none focus:border-indigo-500 font-mono"
                />
              </div>

              <div>
                <label className="block text-slate-300 font-semibold mb-1">Residential Address</label>
                <input
                  type="text"
                  value={residencyAddress}
                  onChange={(e) => setResidencyAddress(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-700 rounded-xl p-3 text-white focus:outline-none focus:border-indigo-500"
                />
              </div>
            </div>

            <div className="flex justify-end pt-4 border-t border-slate-800">
              <button
                onClick={() => setStep(2)}
                className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl text-xs font-bold bg-indigo-600 hover:bg-indigo-500 text-white shadow-lg shadow-indigo-600/30 transition-all"
              >
                <span>Continue to Evidence Upload</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* STEP 2: Evidence Upload */}
        {step === 2 && (
          <div className="glass-panel rounded-2xl p-6 border border-white/10 space-y-6">
            <h2 className="text-lg font-bold text-white flex items-center gap-2">
              <UploadCloud className="w-5 h-5 text-cyan-400" />
              Supporting Evidence Upload & OCR Scan
            </h2>

            {/* Dropzone */}
            <label className="border-2 border-dashed border-slate-700 hover:border-indigo-500 bg-slate-950/60 rounded-2xl p-8 flex flex-col items-center justify-center text-center cursor-pointer transition-colors">
              <UploadCloud className="w-10 h-10 text-indigo-400 mb-2" />
              <span className="text-sm font-semibold text-slate-200">Click or Drag & Drop Documents to Upload</span>
              <span className="text-xs text-slate-500 mt-1">Upload ID Proof, Recent Paystub, W-2, or Utility Bill (PDF, PNG, JPG)</span>
              <input type="file" multiple className="hidden" onChange={handleFileUpload} />
            </label>

            {/* Attached Files List */}
            <div className="space-y-3">
              <h3 className="text-xs font-semibold text-slate-300 uppercase tracking-wider">Uploaded Documents ({uploadedFiles.length})</h3>
              <div className="space-y-2">
                {uploadedFiles.map((file, idx) => (
                  <div key={idx} className="p-3 bg-slate-900/80 rounded-xl border border-slate-800 flex items-center justify-between text-xs">
                    <div className="flex items-center gap-3">
                      <FileText className="w-4 h-4 text-cyan-400" />
                      <div>
                        <div className="font-semibold text-slate-200">{file.name}</div>
                        <div className="text-[11px] text-slate-400 font-mono">{(file.size / 1000000).toFixed(2)} MB • {file.type}</div>
                      </div>
                    </div>
                    <span className="text-[10px] font-mono px-2 py-0.5 bg-emerald-500/10 text-emerald-400 rounded border border-emerald-500/20">
                      Ready for OCR Extraction
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex items-center justify-between pt-4 border-t border-slate-800">
              <button
                onClick={() => setStep(1)}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold bg-slate-800 text-slate-300 hover:bg-slate-700 transition-all"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Back</span>
              </button>

              <button
                onClick={() => setStep(3)}
                className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl text-xs font-bold bg-indigo-600 hover:bg-indigo-500 text-white shadow-lg shadow-indigo-600/30 transition-all"
              >
                <span>Proceed to Pre-Check</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* STEP 3: Pre-Check & Submit */}
        {step === 3 && (
          <div className="glass-panel rounded-2xl p-6 border border-white/10 space-y-6 text-center">
            <div className="w-14 h-14 rounded-2xl bg-indigo-500/10 border border-indigo-500/30 flex items-center justify-center mx-auto text-indigo-400 shadow-lg shadow-indigo-500/20">
              <Sparkles className="w-7 h-7" />
            </div>

            <div className="space-y-2">
              <h2 className="text-xl font-bold text-white">Ready for Instant Hybrid Evaluation</h2>
              <p className="text-xs text-slate-400 max-w-lg mx-auto">
                CivicPath will execute multimodal OCR on your {uploadedFiles.length} document(s), evaluate 4 deterministic eligibility rules, and generate your evidence-to-decision trace.
              </p>
            </div>

            {/* Summary Box */}
            <div className="p-4 bg-slate-950/80 rounded-xl border border-slate-800 max-w-md mx-auto text-left text-xs space-y-2 font-mono">
              <div className="flex justify-between text-slate-300">
                <span className="text-slate-500">Applicant:</span>
                <span className="text-white font-bold">{applicantName}</span>
              </div>
              <div className="flex justify-between text-slate-300">
                <span className="text-slate-500">Program:</span>
                <span className="text-indigo-300">{program.title}</span>
              </div>
              <div className="flex justify-between text-slate-300">
                <span className="text-slate-500">Household / Income:</span>
                <span className="text-emerald-400">{householdSize} person(s) / ${annualIncome.toLocaleString()}</span>
              </div>
            </div>

            <div className="pt-4 flex items-center justify-center gap-4">
              <button
                disabled={isProcessing}
                onClick={() => setStep(2)}
                className="px-4 py-2 rounded-xl text-xs font-semibold bg-slate-800 text-slate-300 hover:bg-slate-700 transition-all"
              >
                Back to Documents
              </button>

              <button
                disabled={isProcessing}
                onClick={handleRunEvaluationAndSubmit}
                className="inline-flex items-center gap-2 px-8 py-3 rounded-xl text-xs font-bold bg-gradient-to-r from-indigo-600 via-indigo-500 to-cyan-500 text-white shadow-xl shadow-indigo-500/30 hover:scale-[1.02] active:scale-[0.98] transition-all"
              >
                {isProcessing ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>Processing OCR & Rule Engine...</span>
                  </>
                ) : (
                  <>
                    <ShieldCheck className="w-4 h-4" />
                    <span>Run Evaluation & Submit Application</span>
                  </>
                )}
              </button>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
