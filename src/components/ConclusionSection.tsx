import React from 'react';
import { ASSIGNMENT_META } from '../data/assignmentData';
import { 
  AlertOctagon, 
  FileText, 
  CheckCircle2, 
  AlertTriangle,
  Info
} from 'lucide-react';

export const ConclusionSection: React.FC = () => {
  const summaryIssues = [
    {
      id: 1,
      title: "Inconsistent Monetary Format (Most Serious Issue)",
      file: "orders_page2.json (ord_1006)",
      summary: "Monetary fields are returned as decimal values (total: 53.62) rather than integer cents (total: 5470) used in other orders. This is the primary data issue contributing to the reconciliation difference.",
      impact: "High",
    },
    {
      id: 2,
      title: "Undocumented Order Status ('refunded')",
      file: "orders_page1.json (ord_1003)",
      summary: "ord_1003 contains status 'refunded', which is omitted from the documented enum (pending, shipped, delivered, cancelled). Clients validating status against the documentation may reject the record.",
      impact: "High",
    },
    {
      id: 3,
      title: "Customer Email Can Be Null",
      file: "orders_page2.json (ord_1005)",
      summary: "ord_1005 has customer.email = null and customer.name = 'Guest', conflicting with the documentation stating customer.email is always present.",
      impact: "High",
    },
    {
      id: 4,
      title: "Pagination Flag Inconsistency",
      file: "orders_page1.json",
      summary: "The documentation says has_more determines whether another page should be requested. The response has has_more=false while next_cursor is populated, so the relationship between these fields should be clarified.",
      impact: "Medium",
    },
    {
      id: 5,
      title: "Non-Existent Order Returns HTTP 200",
      file: "order_ord_9999.json",
      summary: "Querying a non-existent order returns HTTP 200 OK with {\"order\": null} rather than the documented HTTP 404 Not Found, preventing standard HTTP error handling.",
      impact: "High",
    },
  ];

  return (
    <section id="conclusion" className="py-12 sm:py-16 border-b border-slate-200 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="mb-8">
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs font-bold uppercase tracking-wider text-indigo-600">
              Conclusion
            </span>
            <span className="text-xs text-slate-400">•</span>
            <span className="text-xs font-medium text-slate-500">Summary of API & Data Quality Issues</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
            Summary of Identified Data Quality Issues
          </h2>
          <p className="text-sm sm:text-base text-slate-600 max-w-3xl mt-1">
            A concise overview of the five documented discrepancies identified during the audit of the Meridian Orders API responses.
          </p>
        </div>

        {/* 5 Issues Summary Grid */}
        <div className="space-y-3.5 mb-8">
          {summaryIssues.map((issue) => (
            <div
              key={issue.id}
              className={`p-4 sm:p-5 rounded-xl border transition-colors ${
                issue.id === 1
                  ? 'border-rose-300 bg-rose-50/30'
                  : 'border-slate-200 bg-slate-50/50 hover:bg-slate-50'
              }`}
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-1.5">
                <div className="flex items-center gap-2">
                  <span className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold font-mono ${
                    issue.id === 1 ? 'bg-rose-600 text-white' : 'bg-slate-200 text-slate-700'
                  }`}>
                    {issue.id}
                  </span>
                  <h3 className="text-sm sm:text-base font-bold text-slate-900">
                    {issue.title}
                  </h3>
                </div>
                <div className="flex items-center gap-2">
                  <code className="text-xs font-mono text-slate-500 bg-white px-2 py-0.5 rounded border border-slate-200">
                    {issue.file}
                  </code>
                  <span className={`text-xs font-semibold px-2 py-0.5 rounded ${
                    issue.impact === 'High' ? 'bg-rose-50 text-rose-700 border border-rose-200' : 'bg-amber-50 text-amber-800 border border-amber-200'
                  }`}>
                    {issue.impact}
                  </span>
                </div>
              </div>
              <p className="text-xs sm:text-sm text-slate-700 leading-relaxed pl-8">
                {issue.summary}
              </p>
            </div>
          ))}
        </div>

        {/* Analytical Takeaway Card */}
        <div className="rounded-xl border border-slate-200 bg-slate-50 p-5 sm:p-6 mb-8">
          <div className="flex items-start gap-3">
            <Info className="w-5 h-5 text-indigo-600 shrink-0 mt-0.5" />
            <div>
              <h4 className="text-sm font-bold text-slate-900 mb-1">
                Analytical Takeaway & Recommended Next Step
              </h4>
              <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                Total calculated revenue across all six captured orders is <strong className="text-slate-900 font-semibold">$328.03</strong> under the explicitly stated assumption that ord_1006's 53.62 represents $53.62. Because this assumption directly impacts financial reconciliation (a naive 53 cents interpretation results in $274.94, creating a $53.09 difference), this format should be confirmed with the API owner before finalized reporting.
              </p>
            </div>
          </div>
        </div>

        {/* Candidate Signoff Block */}
        <div className="pt-6 border-t border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-slate-900 text-white font-bold flex items-center justify-center font-sans text-xs">
              A
            </div>
            <div>
              <span className="text-sm font-bold text-slate-900 block">
                {ASSIGNMENT_META.candidateName}
              </span>
              <span className="text-xs text-slate-500">
                {ASSIGNMENT_META.role} Take-Home Submission
              </span>
            </div>
          </div>
          <div className="text-xs text-slate-500 sm:text-right">
            <span className="font-semibold text-slate-700 block">Project Reference: {ASSIGNMENT_META.ticketReference}</span>
            <span>Presentation of Captured API Responses</span>
          </div>
        </div>
      </div>
    </section>
  );
};
