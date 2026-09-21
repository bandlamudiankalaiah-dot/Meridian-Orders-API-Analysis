import React from 'react';
import { FINDINGS, MOST_SERIOUS_ISSUE } from '../data/assignmentData';
import { 
  AlertOctagon, 
  AlertTriangle, 
  DollarSign, 
  FileCode, 
  MailWarning, 
  Layers, 
  ArrowRight,
  ShieldCheck,
  Ban
} from 'lucide-react';

export const ExecutiveSummary: React.FC = () => {
  const getFindingIcon = (id: number) => {
    switch (id) {
      case 1:
        return <Layers className="w-4 h-4 text-rose-600" />;
      case 2:
        return <MailWarning className="w-4 h-4 text-rose-600" />;
      case 3:
        return <DollarSign className="w-4 h-4 text-amber-600" />;
      case 4:
        return <FileCode className="w-4 h-4 text-blue-600" />;
      case 5:
        return <Ban className="w-4 h-4 text-purple-600" />;
      default:
        return <AlertTriangle className="w-4 h-4 text-slate-600" />;
    }
  };

  const getSeverityBadge = (severity: string, isMostCritical?: boolean) => {
    if (isMostCritical) {
      return (
        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-bold bg-rose-100 text-rose-800 border border-rose-300">
          <AlertOctagon className="w-3 h-3 text-rose-600" />
          Critical Blocker
        </span>
      );
    }
    if (severity === 'High') {
      return (
        <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-semibold bg-rose-50 text-rose-700 border border-rose-200">
          High Impact
        </span>
      );
    }
    return (
      <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-semibold bg-amber-50 text-amber-800 border border-amber-200">
        Medium Impact
      </span>
    );
  };

  return (
    <section id="executive-summary" className="py-12 sm:py-16 border-b border-slate-200 bg-slate-50/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-indigo-600 mb-1 block">
              Overview & Key Takeaways
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
              Executive Summary
            </h2>
            <p className="text-sm sm:text-base text-slate-600 max-w-2xl mt-1">
              A structured evaluation of the Meridian Orders API contract against 6 captured records across 2 pages and 1 single-order lookup.
            </p>
          </div>
          <a 
            href="#api-findings"
            className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-indigo-600 hover:text-indigo-700 group transition-colors"
          >
            <span>Jump to in-depth technical diffs</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
          </a>
        </div>

        {/* MOST SERIOUS ISSUE HIGHLIGHT CARD */}
        <div className="mb-8 rounded-xl border-2 border-rose-200 bg-linear-to-r from-rose-50/90 via-amber-50/50 to-white p-6 shadow-sm">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-xl bg-rose-600 text-white flex items-center justify-center shrink-0 shadow-xs">
                <AlertOctagon className="w-6 h-6" />
              </div>
              <div>
                <div className="flex flex-wrap items-center gap-2 mb-1.5">
                  <span className="px-2.5 py-0.5 rounded-full text-xs font-bold uppercase tracking-wider bg-rose-600 text-white">
                    Highest Severity
                  </span>
                  <span className="text-xs font-semibold text-rose-900">
                    Finding #3: Financial Data Integrity
                  </span>
                </div>
                <h3 className="text-lg sm:text-xl font-bold text-slate-900 mb-1">
                  {MOST_SERIOUS_ISSUE.title}
                </h3>
                <p className="text-sm text-slate-700 leading-relaxed max-w-4xl">
                  {MOST_SERIOUS_ISSUE.description}
                </p>
              </div>
            </div>
            <div className="shrink-0 lg:text-right border-t lg:border-t-0 lg:border-l border-rose-200 pt-3 lg:pt-0 lg:pl-6">
              <span className="text-xs uppercase font-semibold text-rose-800 tracking-wider block mb-0.5">
                Financial Variance
              </span>
              <span className="text-2xl font-mono font-extrabold text-rose-700">$53.09 difference</span>
              <span className="text-xs text-rose-600 block mt-0.5">if parsed as 53 cents</span>
            </div>
          </div>
        </div>

        {/* 5 KEY FINDINGS CARDS */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {FINDINGS.map((finding) => (
            <div
              key={finding.id}
              className={`flex flex-col justify-between bg-white rounded-xl p-5 border transition-all hover:shadow-md ${
                finding.isMostCritical
                  ? 'border-rose-300 ring-1 ring-rose-200 bg-rose-50/20'
                  : 'border-slate-200 hover:border-slate-300'
              }`}
            >
              <div>
                {/* Header row */}
                <div className="flex items-center justify-between gap-2 mb-3">
                  <div className="flex items-center gap-2">
                    <div className="w-7 h-7 rounded-md bg-slate-100 flex items-center justify-center">
                      {getFindingIcon(finding.id)}
                    </div>
                    <span className="text-xs font-bold text-slate-500 font-mono">
                      Finding #{finding.id}
                    </span>
                  </div>
                  {getSeverityBadge(finding.severity, finding.isMostCritical)}
                </div>

                {/* Category & Title */}
                <span className="text-xs font-semibold text-indigo-600 uppercase tracking-wider block mb-1">
                  {finding.category}
                </span>
                <h4 className="text-base font-bold text-slate-900 mb-2 leading-snug">
                  {finding.title}
                </h4>

                {/* Snapshot of contract divergence */}
                <div className="space-y-2 text-xs mb-4">
                  <div className="p-2 rounded bg-slate-50 border border-slate-100">
                    <span className="font-semibold text-slate-500 uppercase tracking-wider block text-[10px] mb-0.5">
                      Documented Contract:
                    </span>
                    <p className="text-slate-700 line-clamp-2">{finding.documented}</p>
                  </div>
                  <div className="p-2 rounded bg-amber-50/60 border border-amber-100">
                    <span className="font-semibold text-amber-800 uppercase tracking-wider block text-[10px] mb-0.5">
                      Observed Behavior:
                    </span>
                    <p className="text-slate-900 font-medium line-clamp-2">{finding.actual}</p>
                  </div>
                </div>
              </div>

              {/* Impact Footer */}
              <div className="pt-3 border-t border-slate-100 mt-auto">
                <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block mb-0.5">
                  Business Impact:
                </span>
                <p className="text-xs text-slate-700 leading-normal">
                  {finding.impact}
                </p>
                <div className="mt-2.5 flex items-center justify-between text-[11px] text-slate-400">
                  <span>Source: <code className="font-mono text-slate-600">{finding.affectedFile}</code></span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
