import React from 'react';
import { ASSIGNMENT_META } from '../data/assignmentData';
import { ArrowUp, ShieldCheck } from 'lucide-react';

export const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-slate-900 text-slate-400 py-12 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 pb-8 border-b border-slate-800">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <div className="w-6 h-6 rounded bg-indigo-600 flex items-center justify-center text-white font-bold text-xs">
                M
              </div>
              <span className="text-white font-bold text-base tracking-tight">
                Meridian Orders API
              </span>
              <span className="text-xs text-slate-500 font-mono">
                take-home-submission
              </span>
            </div>
            <p className="text-xs text-slate-400 max-w-xl">
              Prepared by <strong className="text-slate-200">{ASSIGNMENT_META.candidateName}</strong> for the {ASSIGNMENT_META.role} evaluation.
            </p>
          </div>

          <button
            onClick={scrollToTop}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold transition-colors print:hidden"
          >
            <span>Back to top</span>
            <ArrowUp className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>
            Disclaimer: Meridian is a fictional company created solely for assessment purposes. All data presented originates from static assignment payloads.
          </p>
          <p className="shrink-0 font-mono">
            Candidate: {ASSIGNMENT_META.candidateName}
          </p>
        </div>
      </div>
    </footer>
  );
};
