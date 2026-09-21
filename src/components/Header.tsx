import React, { useState } from 'react';
import { 
  FileText, 
  Printer, 
  Copy, 
  Check, 
  Menu, 
  X,
  AlertCircle
} from 'lucide-react';
import { ASSIGNMENT_META } from '../data/assignmentData';

export const Header: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [copied, setCopied] = useState(false);

  const navLinks = [
    { label: 'Executive Summary', href: '#executive-summary' },
    { label: 'API Findings', href: '#api-findings' },
    { label: 'Revenue Analysis', href: '#revenue-analysis' },
    { label: 'Reply to Priya', href: '#reply-to-priya' },
    { label: 'Bug Report', href: '#bug-report' },
    { label: 'Conclusion', href: '#conclusion' },
  ];

  const copyAssignmentSummary = () => {
    const summary = `Meridian Orders API — Product Analyst Take-Home Assignment
Candidate: ${ASSIGNMENT_META.candidateName}
Total Orders Analyzed: 6
Reconciled Revenue: $328.03 (under confirmed assumption for ord_1006)
Key Issue: Inconsistent monetary units in ord_1006 (decimal dollars vs integer cents).
Total Findings: 5 documented anomalies.`;
    navigator.clipboard.writeText(summary);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200 shadow-xs print:hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Brand / Title */}
          <div className="flex items-center space-x-3">
            <div className="w-9 h-9 rounded-lg bg-indigo-600 flex items-center justify-center text-white font-bold text-sm shadow-xs">
              M
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-bold text-slate-900 text-sm tracking-tight sm:text-base">
                  Meridian Orders API
                </span>
                <span className="hidden sm:inline-flex items-center px-2 py-0.5 rounded text-xs font-semibold bg-indigo-50 text-indigo-700 border border-indigo-100">
                  Case Study
                </span>
              </div>
              <p className="text-xs text-slate-500 hidden sm:block">
                Candidate: <strong className="text-slate-700 font-medium">{ASSIGNMENT_META.candidateName}</strong> • {ASSIGNMENT_META.role}
              </p>
            </div>
          </div>

          {/* Desktop Nav Links */}
          <nav className="hidden lg:flex items-center space-x-1">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="px-3 py-1.5 rounded-md text-xs font-medium text-slate-600 hover:text-indigo-600 hover:bg-slate-100 transition-colors"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Action buttons */}
          <div className="flex items-center space-x-2">
            <button
              onClick={copyAssignmentSummary}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-slate-700 bg-white border border-slate-300 rounded-md hover:bg-slate-50 transition-colors shadow-2xs"
              title="Copy quick summary of assignment"
            >
              {copied ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-600" />
                  <span className="text-emerald-700">Copied</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5 text-slate-500" />
                  <span className="hidden sm:inline">Copy Summary</span>
                </>
              )}
            </button>

            <button
              onClick={handlePrint}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-white bg-slate-900 rounded-md hover:bg-slate-800 transition-colors shadow-2xs"
              title="Print or save as PDF"
            >
              <Printer className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Print / PDF</span>
            </button>

            {/* Mobile menu button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-md text-slate-600 hover:text-slate-900 hover:bg-slate-100"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile nav dropdown */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white border-b border-slate-200 px-4 pt-2 pb-4 space-y-1 shadow-md">
          <div className="pb-2 mb-2 border-b border-slate-100">
            <p className="text-xs font-medium text-slate-500">
              Candidate: <span className="text-slate-800 font-semibold">{ASSIGNMENT_META.candidateName}</span>
            </p>
            <p className="text-xs text-slate-500">{ASSIGNMENT_META.role}</p>
          </div>
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3 py-2 rounded-md text-sm font-medium text-slate-700 hover:text-indigo-600 hover:bg-slate-50"
            >
              {link.label}
            </a>
          ))}
        </div>
      )}
    </header>
  );
};
