import React, { useState } from 'react';
import { FINDINGS, MOST_SERIOUS_ISSUE } from '../data/assignmentData';
import { 
  CheckCircle2, 
  XCircle, 
  AlertTriangle, 
  Layers, 
  Code2, 
  Table as TableIcon, 
  LayoutGrid, 
  AlertOctagon,
  ChevronDown,
  ChevronUp,
  FileJson
} from 'lucide-react';

export const FindingsSection: React.FC = () => {
  const [viewMode, setViewMode] = useState<'cards' | 'table'>('cards');
  const [activeFilter, setActiveFilter] = useState<'all' | 'critical' | 'high' | 'medium'>('all');
  const [expandedCode, setExpandedCode] = useState<Record<number, boolean>>({
    1: true,
    2: true,
    3: true,
    4: true,
    5: true,
  });

  const toggleCode = (id: number) => {
    setExpandedCode(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const filteredFindings = FINDINGS.filter(f => {
    if (activeFilter === 'all') return true;
    if (activeFilter === 'critical') return f.isMostCritical;
    if (activeFilter === 'high') return f.severity === 'High';
    if (activeFilter === 'medium') return f.severity === 'Medium';
    return true;
  });

  return (
    <section id="api-findings" className="py-12 sm:py-16 border-b border-slate-200 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-xs font-bold uppercase tracking-wider text-indigo-600">
                Task 1 — API Analysis
              </span>
              <span className="text-xs text-slate-400">•</span>
              <span className="text-xs font-medium text-slate-500">Contract Verification</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
              API Findings & Documentation Gaps
            </h2>
            <p className="text-sm sm:text-base text-slate-600 max-w-3xl mt-1">
              Side-by-side comparison of official API documentation versus verified responses in the captured test payloads.
            </p>
          </div>

          {/* View Mode & Filter Controls */}
          <div className="flex flex-wrap items-center gap-2 self-start md:self-auto">
            {/* Filter pills */}
            <div className="inline-flex rounded-lg p-1 bg-slate-100 border border-slate-200 text-xs font-medium">
              <button
                onClick={() => setActiveFilter('all')}
                className={`px-2.5 py-1 rounded-md transition-colors ${
                  activeFilter === 'all' ? 'bg-white text-slate-900 shadow-2xs font-semibold' : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                All (5)
              </button>
              <button
                onClick={() => setActiveFilter('critical')}
                className={`px-2.5 py-1 rounded-md transition-colors ${
                  activeFilter === 'critical' ? 'bg-white text-rose-700 shadow-2xs font-semibold' : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Critical (1)
              </button>
              <button
                onClick={() => setActiveFilter('high')}
                className={`px-2.5 py-1 rounded-md transition-colors ${
                  activeFilter === 'high' ? 'bg-white text-rose-700 shadow-2xs font-semibold' : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                High (3)
              </button>
              <button
                onClick={() => setActiveFilter('medium')}
                className={`px-2.5 py-1 rounded-md transition-colors ${
                  activeFilter === 'medium' ? 'bg-white text-amber-700 shadow-2xs font-semibold' : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Medium (1)
              </button>
            </div>

            {/* Toggle View */}
            <div className="inline-flex rounded-lg p-1 bg-slate-100 border border-slate-200 text-xs font-medium">
              <button
                onClick={() => setViewMode('cards')}
                className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md transition-colors ${
                  viewMode === 'cards' ? 'bg-white text-slate-900 shadow-2xs font-semibold' : 'text-slate-600 hover:text-slate-900'
                }`}
                title="Detailed Cards View"
              >
                <LayoutGrid className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Cards</span>
              </button>
              <button
                onClick={() => setViewMode('table')}
                className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md transition-colors ${
                  viewMode === 'table' ? 'bg-white text-slate-900 shadow-2xs font-semibold' : 'text-slate-600 hover:text-slate-900'
                }`}
                title="Comparative Table View"
              >
                <TableIcon className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Table</span>
              </button>
            </div>
          </div>
        </div>

        {/* MOST SERIOUS ISSUE SUMMARY CALLOUT */}
        <div className="mb-8 p-4 sm:p-5 rounded-xl bg-slate-900 text-white shadow-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-start gap-3.5">
            <div className="p-2 bg-rose-600 rounded-lg shrink-0 mt-0.5 sm:mt-0 text-white">
              <AlertOctagon className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2 mb-0.5">
                <span className="text-xs font-bold uppercase tracking-wider text-rose-400">
                  Core Evaluation Finding
                </span>
              </div>
              <h4 className="text-base sm:text-lg font-bold text-white">
                Most Serious Issue: Inconsistent Monetary Format (ord_1006)
              </h4>
              <p className="text-xs sm:text-sm text-slate-300 mt-1 max-w-4xl">
                The inconsistent monetary-unit format in <code className="text-amber-300 font-mono">ord_1006</code> is the most serious because it directly affects financial calculations, billing, reporting, and revenue reconciliation.
              </p>
            </div>
          </div>
          <a
            href="#revenue-analysis"
            className="shrink-0 px-3.5 py-2 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold transition-colors flex items-center gap-1.5 shadow-2xs"
          >
            <span>View Revenue Impact</span>
            <ChevronDown className="w-4 h-4" />
          </a>
        </div>

        {/* CARDS VIEW */}
        {viewMode === 'cards' ? (
          <div className="space-y-6">
            {filteredFindings.map((finding) => (
              <div
                key={finding.id}
                className={`rounded-xl border transition-all ${
                  finding.isMostCritical
                    ? 'border-rose-300 bg-rose-50/10 shadow-xs'
                    : 'border-slate-200 bg-white hover:border-slate-300'
                }`}
              >
                {/* Header bar */}
                <div className="p-4 sm:p-5 border-b border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-slate-50/40 rounded-t-xl">
                  <div className="flex items-center gap-3">
                    <span className="flex items-center justify-center w-7 h-7 rounded-lg bg-slate-200 text-slate-800 font-mono text-xs font-bold">
                      #{finding.id}
                    </span>
                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="text-base sm:text-lg font-bold text-slate-900">
                          {finding.title}
                        </h3>
                        {finding.isMostCritical && (
                          <span className="hidden sm:inline-flex items-center gap-1 px-2 py-0.5 rounded text-[11px] font-bold bg-rose-100 text-rose-800 border border-rose-200">
                            Critical
                          </span>
                        )}
                      </div>
                      <span className="text-xs text-slate-500">
                        Category: <strong className="text-slate-700 font-medium">{finding.category}</strong> • File: <code className="font-mono text-slate-600">{finding.affectedFile}</code>
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 self-end sm:self-auto">
                    {finding.severity === 'Critical' ? (
                      <span className="px-2.5 py-1 rounded-md text-xs font-bold bg-rose-600 text-white">
                        Critical Impact
                      </span>
                    ) : finding.severity === 'High' ? (
                      <span className="px-2.5 py-1 rounded-md text-xs font-semibold bg-rose-50 text-rose-700 border border-rose-200">
                        High Impact
                      </span>
                    ) : (
                      <span className="px-2.5 py-1 rounded-md text-xs font-semibold bg-amber-50 text-amber-800 border border-amber-200">
                        Medium Impact
                      </span>
                    )}

                    {finding.codeSnippet && (
                      <button
                        onClick={() => toggleCode(finding.id)}
                        className="p-1.5 text-xs text-slate-500 hover:text-slate-900 bg-white border border-slate-200 rounded-md transition-colors"
                        title="Toggle schema comparison"
                      >
                        {expandedCode[finding.id] ? (
                          <ChevronUp className="w-4 h-4" />
                        ) : (
                          <ChevronDown className="w-4 h-4" />
                        )}
                      </button>
                    )}
                  </div>
                </div>

                {/* 3-Column Comparative Grid: Documentation vs Actual vs Impact */}
                <div className="p-4 sm:p-6 grid grid-cols-1 lg:grid-cols-3 gap-5">
                  {/* Column 1: Documentation */}
                  <div className="rounded-lg p-4 bg-emerald-50/40 border border-emerald-100/80">
                    <div className="flex items-center gap-2 mb-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                      <span className="text-xs font-bold uppercase tracking-wider text-emerald-900">
                        Documentation Says
                      </span>
                    </div>
                    <p className="text-sm text-slate-800 leading-relaxed font-medium">
                      {finding.documented}
                    </p>
                  </div>

                  {/* Column 2: Actual Response */}
                  <div className="rounded-lg p-4 bg-rose-50/40 border border-rose-100/80">
                    <div className="flex items-center gap-2 mb-2">
                      <XCircle className="w-4 h-4 text-rose-600 shrink-0" />
                      <span className="text-xs font-bold uppercase tracking-wider text-rose-900">
                        Actual API Response
                      </span>
                    </div>
                    <p className="text-sm text-slate-900 leading-relaxed font-semibold">
                      {finding.actual}
                    </p>
                  </div>

                  {/* Column 3: Impact */}
                  <div className="rounded-lg p-4 bg-slate-50 border border-slate-200">
                    <div className="flex items-center gap-2 mb-2">
                      <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0" />
                      <span className="text-xs font-bold uppercase tracking-wider text-slate-700">
                        Business & Client Impact
                      </span>
                    </div>
                    <p className="text-sm text-slate-700 leading-relaxed">
                      {finding.impact}
                    </p>
                  </div>
                </div>

                {/* Code diff / Schema snippet */}
                {finding.codeSnippet && expandedCode[finding.id] && (
                  <div className="px-4 pb-4 sm:px-6 sm:pb-6">
                    <div className="rounded-lg overflow-hidden border border-slate-800 bg-slate-950">
                      <div className="px-3 py-1.5 bg-slate-900 border-b border-slate-800 flex items-center justify-between text-xs text-slate-400">
                        <div className="flex items-center gap-2">
                          <Code2 className="w-3.5 h-3.5 text-indigo-400" />
                          <span className="font-mono font-medium">Schema Contract vs. Payload Verification</span>
                        </div>
                        <span className="text-[11px] font-mono text-slate-500">{finding.affectedFile}</span>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-slate-800 font-mono text-xs">
                        <div className="p-3 bg-slate-950/60">
                          <span className="text-[10px] font-bold text-emerald-400 uppercase tracking-wider block mb-1">
                            Expected Behavior (Docs)
                          </span>
                          <pre className="text-slate-300 overflow-x-auto whitespace-pre leading-relaxed">
                            {finding.codeSnippet.expected}
                          </pre>
                        </div>
                        <div className="p-3 bg-slate-900/40">
                          <span className="text-[10px] font-bold text-rose-400 uppercase tracking-wider block mb-1">
                            Observed Behavior (Payload)
                          </span>
                          <pre className="text-amber-200 overflow-x-auto whitespace-pre leading-relaxed">
                            {finding.codeSnippet.actual}
                          </pre>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        ) : (
          /* TABLE VIEW */
          <div className="border border-slate-200 rounded-xl overflow-hidden shadow-2xs bg-white">
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-slate-200 text-left text-sm">
                <thead className="bg-slate-50 font-semibold text-slate-900">
                  <tr>
                    <th scope="col" className="py-3.5 pl-4 pr-3 sm:pl-6 text-xs uppercase tracking-wider text-slate-600">
                      Finding #
                    </th>
                    <th scope="col" className="px-3 py-3.5 text-xs uppercase tracking-wider text-slate-600">
                      Documentation Contract
                    </th>
                    <th scope="col" className="px-3 py-3.5 text-xs uppercase tracking-wider text-slate-600">
                      Actual Response
                    </th>
                    <th scope="col" className="px-3 py-3.5 text-xs uppercase tracking-wider text-slate-600">
                      Impact
                    </th>
                    <th scope="col" className="px-3 py-3.5 text-xs uppercase tracking-wider text-slate-600">
                      Severity
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200 bg-white">
                  {filteredFindings.map((finding) => (
                    <tr 
                      key={finding.id}
                      className={finding.isMostCritical ? 'bg-rose-50/30' : 'hover:bg-slate-50/50'}
                    >
                      <td className="py-4 pl-4 pr-3 sm:pl-6 text-slate-900 font-medium">
                        <div className="flex items-center gap-2">
                          <span className="font-mono font-bold text-xs bg-slate-100 px-2 py-0.5 rounded">
                            #{finding.id}
                          </span>
                          <div>
                            <span className="font-semibold block text-slate-900">{finding.title}</span>
                            <span className="text-xs text-slate-500 font-mono">{finding.affectedFile}</span>
                          </div>
                        </div>
                      </td>
                      <td className="px-3 py-4 text-slate-700 text-xs sm:text-sm max-w-xs">
                        <div className="flex items-start gap-1.5">
                          <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                          <span>{finding.documented}</span>
                        </div>
                      </td>
                      <td className="px-3 py-4 text-slate-900 text-xs sm:text-sm font-medium max-w-xs">
                        <div className="flex items-start gap-1.5">
                          <XCircle className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
                          <span>{finding.actual}</span>
                        </div>
                      </td>
                      <td className="px-3 py-4 text-slate-700 text-xs sm:text-sm max-w-sm">
                        {finding.impact}
                      </td>
                      <td className="px-3 py-4 whitespace-nowrap">
                        {finding.isMostCritical ? (
                          <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-rose-600 text-white">
                            Critical
                          </span>
                        ) : finding.severity === 'High' ? (
                          <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-rose-50 text-rose-700 border border-rose-200">
                            High
                          </span>
                        ) : (
                          <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-amber-50 text-amber-800 border border-amber-200">
                            Medium
                          </span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
