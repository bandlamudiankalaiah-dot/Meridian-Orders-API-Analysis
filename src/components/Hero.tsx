import React from 'react';
import { ASSIGNMENT_META, TOTAL_REVENUE } from '../data/assignmentData';
import { 
  ShieldAlert, 
  CheckCircle2, 
  DollarSign, 
  FileSearch, 
  AlertTriangle,
  User,
  Layers,
  Sparkles
} from 'lucide-react';

export const Hero: React.FC = () => {
  return (
    <section className="pt-8 pb-10 sm:pt-12 sm:pb-14 border-b border-slate-200 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Badges row */}
        <div className="flex flex-wrap items-center gap-2 mb-4">
          {ASSIGNMENT_META.badges.map((badge, idx) => (
            <span
              key={idx}
              className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold bg-slate-100 text-slate-700 border border-slate-200"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-indigo-600"></span>
              {badge}
            </span>
          ))}
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium bg-amber-50 text-amber-800 border border-amber-200">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-500"></span>
            Ref: {ASSIGNMENT_META.ticketReference}
          </span>
        </div>

        {/* Main Headings */}
        <div className="max-w-4xl">
          <div className="text-xs sm:text-sm font-semibold text-indigo-600 tracking-wide uppercase mb-1.5">
            {ASSIGNMENT_META.role}
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight mb-4">
            Meridian Orders API — Product Analyst Take-Home Assignment
          </h1>
          <div className="flex flex-wrap items-center gap-y-2 gap-x-6 text-sm text-slate-600 mb-6 pb-6 border-b border-slate-100">
            <div className="flex items-center gap-1.5">
              <User className="w-4 h-4 text-slate-400" />
              <span>Candidate: <strong className="text-slate-900 font-semibold">{ASSIGNMENT_META.candidateName}</strong></span>
            </div>
            <div className="flex items-center gap-1.5">
              <Layers className="w-4 h-4 text-slate-400" />
              <span>Role: <span className="text-slate-800 font-medium">{ASSIGNMENT_META.role}</span></span>
            </div>
            <div className="flex items-center gap-1.5 text-slate-500">
              <FileSearch className="w-4 h-4 text-slate-400" />
              <span>Dataset: 2 Captured Pages + 1 Single Lookup</span>
            </div>
          </div>
        </div>

        {/* Disclaimer Callout Box */}
        <div className="mb-8 rounded-xl bg-slate-50 border border-slate-200/90 p-4 sm:p-5 shadow-2xs">
          <div className="flex items-start gap-3.5">
            <div className="p-1.5 bg-amber-100 text-amber-800 rounded-lg shrink-0 mt-0.5">
              <ShieldAlert className="w-4 h-4" />
            </div>
            <div className="text-xs sm:text-sm text-slate-700 leading-relaxed">
              <strong className="font-semibold text-slate-900">Project Notice & Data Origin: </strong>
              This is <strong className="text-slate-900">NOT a real API project</strong>. Meridian is a fictional company and the API is not live. 
              This website is a professional presentation of my analysis and assignment submission based strictly on the captured API response files supplied for evaluation (<code className="px-1.5 py-0.5 rounded bg-white border border-slate-200 text-slate-800 font-mono text-xs">orders_page1.json</code>, <code className="px-1.5 py-0.5 rounded bg-white border border-slate-200 text-slate-800 font-mono text-xs">orders_page2.json</code>, and <code className="px-1.5 py-0.5 rounded bg-white border border-slate-200 text-slate-800 font-mono text-xs">order_ord_9999.json</code>). No synthetic or fabricated API data has been added.
            </div>
          </div>
        </div>

        {/* High-level quick KPIs */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4">
          <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-2xs">
            <span className="text-xs font-medium text-slate-500 uppercase tracking-wider block mb-1">
              Captured Orders
            </span>
            <div className="flex items-baseline gap-2">
              <span className="text-2xl sm:text-3xl font-bold text-slate-900 font-mono">6</span>
              <span className="text-xs text-slate-500">records</span>
            </div>
            <p className="text-xs text-slate-500 mt-1">
              Across 2 response pages
            </p>
          </div>

          <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-2xs">
            <span className="text-xs font-medium text-slate-500 uppercase tracking-wider block mb-1">
              API Discrepancies
            </span>
            <div className="flex items-baseline gap-2">
              <span className="text-2xl sm:text-3xl font-bold text-indigo-600 font-mono">5</span>
              <span className="text-xs text-slate-500">findings</span>
            </div>
            <p className="text-xs text-slate-500 mt-1">
              Contract & schema violations
            </p>
          </div>

          <div className="bg-white p-4 rounded-xl border border-amber-200 bg-amber-50/40 shadow-2xs">
            <span className="text-xs font-medium text-amber-800 uppercase tracking-wider block mb-1">
              Most Critical Risk
            </span>
            <div className="flex items-baseline gap-2">
              <span className="text-base sm:text-lg font-bold text-amber-950">Monetary Unit</span>
            </div>
            <p className="text-xs text-amber-800 mt-1">
              ord_1006 format mismatch
            </p>
          </div>

          <div className="bg-white p-4 rounded-xl border border-emerald-200 bg-emerald-50/40 shadow-2xs">
            <span className="text-xs font-medium text-emerald-800 uppercase tracking-wider block mb-1">
              Reconciled Revenue
            </span>
            <div className="flex items-baseline gap-2">
              <span className="text-2xl sm:text-3xl font-bold text-emerald-900 font-mono">${TOTAL_REVENUE.toFixed(2)}</span>
            </div>
            <p className="text-xs text-emerald-800 mt-1">
              Pending API owner signoff
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
