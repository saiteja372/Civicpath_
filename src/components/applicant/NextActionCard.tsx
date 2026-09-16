'use client';

import React, { useEffect } from 'react';
import { NextAction, ApplicationStatus } from '@/lib/types';
import { Download, UploadCloud, Calendar, AlertCircle, CheckCircle2, Sparkles } from 'lucide-react';
import confetti from 'canvas-confetti';

interface NextActionCardProps {
  status: ApplicationStatus;
  nextActions: NextAction[];
  onUploadNewDocument?: (file: File) => void;
}

export const NextActionCard: React.FC<NextActionCardProps> = ({
  status,
  nextActions,
  onUploadNewDocument
}) => {
  const isApproved = status === 'AUTO_APPROVED' || status === 'HUMAN_APPROVED';

  useEffect(() => {
    if (isApproved) {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 }
      });
    }
  }, [isApproved]);

  const handleDownloadCertificate = () => {
    alert('🎉 Downloading official CivicPath Approval Voucher Certificate (PDF format with security QR code)...');
  };

  return (
    <div className={`rounded-2xl p-6 border transition-all ${
      isApproved 
        ? 'bg-gradient-to-br from-emerald-950/40 via-slate-900 to-slate-950 border-emerald-500/30 shadow-xl shadow-emerald-500/10'
        : status === 'ACTION_REQUIRED'
        ? 'bg-gradient-to-br from-cyan-950/40 via-slate-900 to-slate-950 border-cyan-500/30 shadow-xl shadow-cyan-500/10'
        : 'bg-gradient-to-br from-amber-950/40 via-slate-900 to-slate-950 border-amber-500/30 shadow-xl shadow-amber-500/10'
    }`}>
      <div className="flex items-center justify-between pb-4 border-b border-white/10">
        <div className="flex items-center gap-3">
          <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${
            isApproved ? 'bg-emerald-500/20 text-emerald-400' : 'bg-amber-500/20 text-amber-400'
          }`}>
            {isApproved ? <CheckCircle2 className="w-6 h-6" /> : <AlertCircle className="w-6 h-6" />}
          </div>
          <div>
            <h3 className="text-lg font-bold text-white flex items-center gap-2">
              Next Action Guidance
              {isApproved && <Sparkles className="w-4 h-4 text-emerald-400 animate-pulse" />}
            </h3>
            <p className="text-xs text-slate-300">
              {isApproved 
                ? 'Your benefit is active! Complete the following final steps.' 
                : 'Follow these actionable instructions to finalize your application.'}
            </p>
          </div>
        </div>
      </div>

      {/* Action Items List */}
      <div className="mt-5 space-y-4">
        {nextActions.map((action) => {
          const isDownload = action.type === 'DOWNLOAD_CERTIFICATE';
          const isUpload = action.type === 'UPLOAD_DOCUMENT';

          return (
            <div key={action.id} className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 space-y-3">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h4 className="text-sm font-semibold text-slate-100 flex items-center gap-2">
                    {action.title}
                  </h4>
                  <p className="text-xs text-slate-400 mt-1">{action.description}</p>
                </div>
              </div>

              {/* Action Handlers */}
              <div className="pt-2">
                {isDownload && (
                  <button
                    onClick={handleDownloadCertificate}
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold bg-gradient-to-r from-emerald-600 to-teal-500 text-white shadow-lg shadow-emerald-500/25 hover:shadow-emerald-500/40 hover:scale-[1.02] active:scale-[0.98] transition-all"
                  >
                    <Download className="w-4 h-4" />
                    <span>Download Voucher Certificate (PDF)</span>
                  </button>
                )}

                {isUpload && (
                  <label className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold bg-gradient-to-r from-cyan-600 to-blue-600 text-white shadow-lg shadow-cyan-500/25 hover:shadow-cyan-500/40 cursor-pointer hover:scale-[1.02] active:scale-[0.98] transition-all">
                    <UploadCloud className="w-4 h-4" />
                    <span>Upload Updated Utility Bill</span>
                    <input 
                      type="file" 
                      className="hidden" 
                      onChange={(e) => {
                        if (e.target.files && e.target.files[0] && onUploadNewDocument) {
                          onUploadNewDocument(e.target.files[0]);
                        }
                      }}
                    />
                  </label>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
