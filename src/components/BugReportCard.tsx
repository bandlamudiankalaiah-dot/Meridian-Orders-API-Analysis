import React, { useState } from 'react';
import { BUG_REPORT } from '../data/assignmentData';
import { 
  Bug, 
  Copy, 
  Check, 
  Terminal, 
  AlertCircle, 
  CheckCircle2, 
  Wrench, 
  Tag, 
  GitPullRequest
} from 'lucide-react';

export const BugReportCard: React.FC = () => {
  const [copied, setCopied] = useState(false);

  const copyMarkdown = () => {
    const md = `### ${BUG_REPORT.title}

**Component:** ${BUG_REPORT.component}
**Affected Order:** \`${BUG_REPORT.affectedOrder}\`

#### Problem
${BUG_REPORT.problem}

#### Affected Order
\`${BUG_REPORT.affectedOrder}\`

#### Actual Result
\`\`\`json
{
  "subtotal": ${BUG_REPORT.actual.subtotal},
  "tax": ${BUG_REPORT.actual.tax},
  "shipping": ${BUG_REPORT.actual.shipping},
  "total": ${BUG_REPORT.actual.total}
}
\`\`\`
*Other orders return integer smallest-unit values. For example: \`${BUG_REPORT.actual.sampleOtherOrder}\`*

#### Expected Result
${BUG_REPORT.expected.formatDescription}

#### Suggested Investigation
${BUG_REPORT.suggestedInvestigation}`;

    navigator.clipboard.writeText(md);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section id="bug-report" className="py-12 sm:py-16 border-b border-slate-200 bg-slate-50/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-xs font-bold uppercase tracking-wider text-indigo-600">
                Task 3B — Technical Bug Report
              </span>
              <span className="text-xs text-slate-400">•</span>
              <span className="text-xs font-medium text-slate-500">Engineering Hand-off</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
              Engineering Bug Report
            </h2>
            <p className="text-sm sm:text-base text-slate-600 max-w-2xl mt-1">
              Structured ticket ready for engineering triage, reproduction, and remediation.
            </p>
          </div>

          <button
            onClick={copyMarkdown}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-slate-800 bg-white border border-slate-300 rounded-lg hover:bg-slate-50 transition-colors shadow-2xs self-start md:self-auto"
          >
            {copied ? (
              <>
                <Check className="w-4 h-4 text-emerald-600" />
                <span className="text-emerald-700">Ticket Copied (Markdown)</span>
              </>
            ) : (
              <>
                <Copy className="w-4 h-4 text-slate-500" />
                <span>Copy Bug Report (Markdown)</span>
              </>
            )}
          </button>
        </div>

        {/* ISSUE TRACKER CARD */}
        <div className="max-w-4xl mx-auto rounded-2xl border border-slate-200 bg-white shadow-sm overflow-hidden">
          {/* Ticket Header */}
          <div className="p-6 border-b border-slate-200 bg-slate-900 text-white">
            <div className="flex flex-wrap items-center justify-between gap-3 mb-3">
              <div className="flex items-center gap-2">
                <span className="p-1.5 rounded-md bg-rose-600 text-white">
                  <Bug className="w-4 h-4" />
                </span>
                <span className="font-mono text-xs font-bold text-slate-300">
                  {BUG_REPORT.ticketId}
                </span>
                <span className="text-slate-500">•</span>
                <span className="text-xs font-semibold text-slate-400">
                  {BUG_REPORT.component}
                </span>
              </div>
            </div>

            <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
              {BUG_REPORT.title}
            </h3>
          </div>

          {/* Ticket Body Content */}
          <div className="p-6 sm:p-8 space-y-6 text-sm text-slate-800 font-sans">
            {/* 1. Problem Statement */}
            <div className="space-y-1.5">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
                Problem Description
              </span>
              <p className="text-base text-slate-900 font-medium">
                {BUG_REPORT.problem}
              </p>
            </div>

            {/* 2. Affected Order */}
            <div className="p-3.5 rounded-lg bg-slate-50 border border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-slate-500 block">
                  Affected Order
                </span>
                <span className="font-mono font-bold text-slate-900 text-sm">
                  {BUG_REPORT.affectedOrder}
                </span>
              </div>
              <span className="text-xs text-slate-500">
                File: <code className="font-mono bg-white px-2 py-0.5 rounded border border-slate-200 text-slate-700">{BUG_REPORT.sourceFile}</code>
              </span>
            </div>

            {/* 3. Actual vs Expected Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {/* Actual Result */}
              <div className="rounded-xl border border-rose-200 bg-rose-50/30 p-4 space-y-3">
                <div className="flex items-center gap-2 text-rose-800">
                  <AlertCircle className="w-4 h-4 text-rose-600" />
                  <span className="text-xs font-bold uppercase tracking-wider">
                    Actual Result
                  </span>
                </div>
                
                <div className="rounded-lg bg-slate-950 p-3 text-xs font-mono text-amber-200 leading-relaxed border border-slate-800">
                  <div className="text-slate-400">// ord_1006 payload snippet</div>
                  <div>subtotal: {BUG_REPORT.actual.subtotal}</div>
                  <div>tax: {BUG_REPORT.actual.tax}</div>
                  <div>shipping: {BUG_REPORT.actual.shipping}</div>
                  <div className="text-rose-400 font-bold">total: {BUG_REPORT.actual.total}</div>
                </div>

                <p className="text-xs text-slate-700">
                  Other orders return integer smallest-unit values. For example:
                  <code className="block mt-1 font-mono font-semibold text-slate-900 bg-white p-1.5 rounded border border-slate-200">
                    {BUG_REPORT.actual.sampleOtherOrder}
                  </code>
                </p>
              </div>

              {/* Expected Result */}
              <div className="rounded-xl border border-emerald-200 bg-emerald-50/30 p-4 space-y-3">
                <div className="flex items-center gap-2 text-emerald-800">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <span className="text-xs font-bold uppercase tracking-wider">
                    Expected Result
                  </span>
                </div>

                <p className="text-xs text-slate-700 leading-normal">
                  {BUG_REPORT.expected.formatDescription}
                </p>

                <div className="rounded-lg bg-slate-950 p-3 text-xs font-mono text-emerald-300 leading-relaxed border border-slate-800">
                  <div className="text-slate-400">// Documented integer format for $53.62</div>
                  <div className="text-emerald-400 font-bold">total: {BUG_REPORT.expected.sampleFormattedTotal}</div>
                </div>

                <p className="text-xs text-slate-600">
                  Standardizes all values into smallest-currency integers (cents) across all endpoints.
                </p>
              </div>
            </div>

            {/* 4. Suggested Investigation */}
            <div className="rounded-xl border border-indigo-200 bg-indigo-50/40 p-4 sm:p-5 space-y-2">
              <div className="flex items-center gap-2 text-indigo-900">
                <Wrench className="w-4 h-4 text-indigo-600" />
                <span className="text-xs font-bold uppercase tracking-wider">
                  Suggested Investigation
                </span>
              </div>
              <p className="text-sm text-slate-800 font-medium leading-relaxed">
                {BUG_REPORT.suggestedInvestigation}
              </p>
              <p className="text-xs text-slate-600 pt-1">
                Verify the response serialization logic for ord_1006 to ensure all order endpoints consistently format monetary values as integers in the smallest currency unit.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
