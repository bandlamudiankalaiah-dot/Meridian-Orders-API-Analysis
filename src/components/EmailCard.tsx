import React, { useState } from 'react';
import { PRIYA_EMAIL } from '../data/assignmentData';
import { 
  Mail, 
  Send, 
  Copy, 
  Check, 
  CornerDownRight, 
  Clock, 
  Tag, 
  UserCheck, 
  Paperclip,
  CheckCircle
} from 'lucide-react';

export const EmailCard: React.FC = () => {
  const [copied, setCopied] = useState(false);

  const copyEmailContent = () => {
    const emailText = `Subject: ${PRIYA_EMAIL.subject}

${PRIYA_EMAIL.body}`;
    navigator.clipboard.writeText(emailText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section id="reply-to-priya" className="py-12 sm:py-16 border-b border-slate-200 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-xs font-bold uppercase tracking-wider text-indigo-600">
                Task 3A — Stakeholder Communication
              </span>
              <span className="text-xs text-slate-400">•</span>
              <span className="text-xs font-medium text-slate-500">Cross-Functional Alignment</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
              Reply to Priya (Reconciliation Team)
            </h2>
            <p className="text-sm sm:text-base text-slate-600 max-w-2xl mt-1">
              Professional, concise written explanation addressing the revenue reconciliation discrepancy reported under TICKET-4502.
            </p>
          </div>

          <button
            onClick={copyEmailContent}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-white bg-indigo-600 rounded-lg hover:bg-indigo-700 transition-colors shadow-2xs self-start md:self-auto"
          >
            {copied ? (
              <>
                <Check className="w-4 h-4 text-emerald-300" />
                <span>Copied to Clipboard</span>
              </>
            ) : (
              <>
                <Copy className="w-4 h-4" />
                <span>Copy Full Email Text</span>
              </>
            )}
          </button>
        </div>

        {/* EMAIL CLIENT CARD */}
        <div className="max-w-4xl mx-auto rounded-2xl border border-slate-300 bg-white shadow-sm overflow-hidden">
          {/* Email Client Header Bar */}
          <div className="bg-slate-100/90 px-6 py-4 border-b border-slate-200 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="flex space-x-1.5">
                <div className="w-3 h-3 rounded-full bg-slate-300"></div>
                <div className="w-3 h-3 rounded-full bg-slate-300"></div>
                <div className="w-3 h-3 rounded-full bg-slate-300"></div>
              </div>
              <span className="text-xs font-semibold text-slate-600 flex items-center gap-1.5 ml-2">
                <Mail className="w-3.5 h-3.5 text-slate-500" />
                Internal Email Dispatch
              </span>
            </div>
            <div className="flex items-center gap-2">
              <span className="px-2 py-0.5 rounded text-[11px] font-mono font-medium bg-amber-100 text-amber-900 border border-amber-200">
                {PRIYA_EMAIL.ticketId}
              </span>
              <span className="text-xs text-slate-400 hidden sm:inline">Sent</span>
            </div>
          </div>

          {/* Email Metadata Fields */}
          <div className="px-6 py-4 border-b border-slate-100 bg-slate-50/50 space-y-2 text-xs sm:text-sm">
            <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-4">
              <span className="font-semibold text-slate-500 w-16 uppercase tracking-wider text-[11px]">
                Subject:
              </span>
              <span className="font-bold text-slate-900 font-sans">
                {PRIYA_EMAIL.subject}
              </span>
            </div>

            <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-4">
              <span className="font-semibold text-slate-500 w-16 uppercase tracking-wider text-[11px]">
                From:
              </span>
              <div className="flex items-center gap-2 text-slate-800">
                <span className="font-semibold">{PRIYA_EMAIL.senderName}</span>
                <span className="text-xs text-slate-500">({PRIYA_EMAIL.senderRole})</span>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-4">
              <span className="font-semibold text-slate-500 w-16 uppercase tracking-wider text-[11px]">
                To:
              </span>
              <div className="flex items-center gap-2 text-slate-800">
                <span className="font-semibold">{PRIYA_EMAIL.recipientName}</span>
                <span className="text-xs text-slate-500">&lt;{PRIYA_EMAIL.recipientEmail}&gt;</span>
              </div>
            </div>
          </div>

          {/* Email Body Content */}
          <div className="p-6 sm:p-8 bg-white font-sans text-slate-800 leading-relaxed text-sm sm:text-base space-y-4">
            <p className="font-medium text-slate-900">
              Hi Priya,
            </p>

            <p>
              I found a data-format issue that can explain the reconciliation difference. Most order totals are returned in cents as documented, but <code className="px-1.5 py-0.5 rounded bg-amber-50 text-amber-900 font-mono text-xs border border-amber-200">ord_1006</code> returns decimal dollar values (<strong className="text-slate-900 font-semibold">53.62</strong>) instead of the documented integer smallest-unit format.
            </p>

            <p>
              There are also other API inconsistencies, including a <strong className="text-slate-900 font-semibold">refunded</strong> status that isn't documented and a missing customer email despite the documentation saying it is always present.
            </p>

            <p>
              Using the documented currency convention and interpreting <code className="px-1.5 py-0.5 rounded bg-slate-100 text-slate-800 font-mono text-xs">ord_1006</code> as <strong className="text-slate-900 font-semibold">$53.62</strong>, the six captured orders total <strong className="text-emerald-700 font-mono font-bold">$328.03</strong>.
            </p>

            <p className="p-3.5 rounded-lg bg-amber-50/70 border border-amber-200/80 text-amber-950 font-medium text-xs sm:text-sm">
              I recommend confirming the intended representation of <code className="font-mono font-semibold">ord_1006</code> before using the API data for financial reporting.
            </p>

            <div className="pt-4 border-t border-slate-100 text-slate-700">
              <p>Regards,</p>
              <p className="font-bold text-slate-900 mt-1">{PRIYA_EMAIL.senderName}</p>
              <p className="text-xs text-slate-500">{PRIYA_EMAIL.senderRole}</p>
            </div>
          </div>

          {/* Email Key Communication Objectives Checklist */}
          <div className="px-6 py-3.5 bg-slate-50 border-t border-slate-200 text-xs text-slate-600 flex flex-wrap items-center justify-between gap-2">
            <div className="flex items-center gap-4">
              <span className="flex items-center gap-1 text-slate-700">
                <CheckCircle className="w-3.5 h-3.5 text-emerald-600" />
                Root cause identified
              </span>
              <span className="flex items-center gap-1 text-slate-700">
                <CheckCircle className="w-3.5 h-3.5 text-emerald-600" />
                Reconciled total ($328.03) provided
              </span>
              <span className="flex items-center gap-1 text-slate-700">
                <CheckCircle className="w-3.5 h-3.5 text-emerald-600" />
                Actionable next step recommended
              </span>
            </div>
            <span className="text-[11px] text-slate-400">Response formatted per assignment spec</span>
          </div>
        </div>
      </div>
    </section>
  );
};
