import React from 'react';
import { CONCLUSION_RISKS, ASSIGNMENT_META } from '../data/assignmentData';
import { 
  ShieldCheck, 
  AlertOctagon, 
  CheckCircle2, 
  ArrowRight, 
  ListChecks, 
  UserCheck, 
  FileCheck2,
  Lock
} from 'lucide-react';

export const ConclusionSection: React.FC = () => {
  const recommendations = [
    {
      title: "Enforce Strict Monetary Serialization",
      action: "Implement automated serialization tests ensuring all currency amounts are strictly cast to 64-bit integer cents before HTTP output.",
    },
    {
      title: "Reconcile Enum Schema with Business Reality",
      action: "Formally add 'refunded' and other lifecycle states to the OpenAPI/JSON Schema specification and publish versioned client SDK updates.",
    },
    {
      title: "Fix Contract Nullability",
      action: "Clarify whether guest checkouts permit null email values or require fallback anonymous identifiers (e.g. guest-{id}@meridian.local).",
    },
    {
      title: "Standardize Cursor Pagination Logic",
      action: "Ensure has_more is true whenever next_cursor is not null to prevent premature termination of ETL data pipelines.",
    },
    {
      title: "Restore Standard REST HTTP Status Codes",
      action: "Update GET /v1/orders/{id} to return HTTP 404 Not Found when an order record is missing instead of HTTP 200 with null payload.",
    },
  ];

  return (
    <section id="conclusion" className="py-12 sm:py-16 border-b border-slate-200 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="mb-8">
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs font-bold uppercase tracking-wider text-indigo-600">
              Conclusion & Strategic Risk Assessment
            </span>
            <span className="text-xs text-slate-400">•</span>
            <span className="text-xs font-medium text-slate-500">Summary of Analytical Findings</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
            Data Quality Risks & Remediation Roadmap
          </h2>
          <p className="text-sm sm:text-base text-slate-600 max-w-3xl mt-1">
            Summary of critical system vulnerabilities identified during the Meridian Orders API audit and high-priority action items for the product and engineering teams.
          </p>
        </div>

        {/* 4 Primary Risk Categories */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-12">
          {CONCLUSION_RISKS.map((risk, index) => (
            <div
              key={index}
              className="p-5 rounded-xl border border-slate-200 bg-slate-50/50 hover:bg-slate-50 transition-colors"
            >
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-bold font-mono text-slate-500">
                  Risk Category 0{index + 1}
                </span>
                <span
                  className={`px-2.5 py-0.5 rounded-full text-xs font-bold ${
                    risk.severity === 'Critical'
                      ? 'bg-rose-100 text-rose-800 border border-rose-200'
                      : risk.severity === 'High'
                      ? 'bg-rose-50 text-rose-700 border border-rose-200'
                      : 'bg-amber-50 text-amber-800 border border-amber-200'
                  }`}
                >
                  {risk.severity} Risk
                </span>
              </div>
              <h3 className="text-base font-bold text-slate-900 mb-2">
                {risk.title}
              </h3>
              <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                {risk.description}
              </p>
            </div>
          ))}
        </div>

        {/* Actionable Engineering Roadmap */}
        <div className="rounded-2xl border border-indigo-100 bg-linear-to-br from-indigo-50/50 via-white to-slate-50 p-6 sm:p-8">
          <div className="flex items-center gap-2.5 mb-6">
            <div className="p-2 rounded-lg bg-indigo-600 text-white">
              <ListChecks className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg sm:text-xl font-bold text-slate-900">
                Recommended Remediation Roadmap
              </h3>
              <p className="text-xs sm:text-sm text-slate-600">
                Action items required before authorizing production financial integrations
              </p>
            </div>
          </div>

          <div className="space-y-3.5">
            {recommendations.map((rec, i) => (
              <div
                key={i}
                className="flex items-start gap-3 p-3.5 rounded-xl bg-white border border-slate-200/80 shadow-2xs"
              >
                <span className="flex items-center justify-center w-6 h-6 rounded-full bg-indigo-100 text-indigo-800 font-bold text-xs shrink-0 mt-0.5">
                  {i + 1}
                </span>
                <div>
                  <h4 className="text-sm font-bold text-slate-900 mb-0.5">
                    {rec.title}
                  </h4>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    {rec.action}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Candidate Signoff Block */}
          <div className="mt-8 pt-6 border-t border-slate-200/80 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-slate-900 text-white font-bold flex items-center justify-center font-sans text-sm">
                A
              </div>
              <div>
                <span className="text-sm font-bold text-slate-900 block">
                  {ASSIGNMENT_META.candidateName}
                </span>
                <span className="text-xs text-slate-500">
                  Candidate for {ASSIGNMENT_META.role}
                </span>
              </div>
            </div>
            <div className="text-xs text-slate-500 sm:text-right">
              <span className="font-semibold text-slate-700 block">Status: Completed Take-Home Submission</span>
              <span>Project Reference: {ASSIGNMENT_META.ticketReference}</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
