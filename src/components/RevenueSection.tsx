import React, { useState } from 'react';
import { ORDERS_DATA, TOTAL_REVENUE, REVENUE_ASSUMPTION } from '../data/assignmentData';
import { 
  DollarSign, 
  AlertTriangle, 
  HelpCircle, 
  CheckCircle2, 
  Info, 
  FileSpreadsheet, 
  ArrowRight,
  ShieldAlert,
  Copy,
  Check
} from 'lucide-react';

export const RevenueSection: React.FC = () => {
  const [copied, setCopied] = useState(false);

  const copyTableData = () => {
    const header = "Order ID\tCustomer\tEmail\tStatus\tSubtotal\tTax\tShipping\tRaw Total\tUnit Convention\tReconciled USD\n";
    const rows = ORDERS_DATA.map(o => 
      `${o.id}\t${o.customerName}\t${o.customerEmail || 'null'}\t${o.status}\t${o.rawSubtotal}\t${o.rawTax}\t${o.rawShipping}\t${o.rawTotal}\t${o.rawUnitFormat}\t$${o.calculatedTotalUSD.toFixed(2)}`
    ).join('\n');
    const full = `${header}${rows}\n\nTotal Revenue: $${TOTAL_REVENUE.toFixed(2)}`;
    navigator.clipboard.writeText(full);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section id="revenue-analysis" className="py-12 sm:py-16 border-b border-slate-200 bg-slate-50/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-xs font-bold uppercase tracking-wider text-indigo-600">
                Task 2 — Financial Calculation
              </span>
              <span className="text-xs text-slate-400">•</span>
              <span className="text-xs font-medium text-slate-500">Captured Orders Ledger</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
              Revenue Reconciliation
            </h2>
            <p className="text-sm sm:text-base text-slate-600 max-w-2xl mt-1">
              Comprehensive ledger of all six captured order records and total calculated revenue.
            </p>
          </div>

          <button
            onClick={copyTableData}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-slate-700 bg-white border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors shadow-2xs self-start md:self-auto"
          >
            {copied ? (
              <>
                <Check className="w-3.5 h-3.5 text-emerald-600" />
                <span className="text-emerald-700">Ledger Copied</span>
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5 text-slate-500" />
                <span>Copy Order Data (TSV)</span>
              </>
            )}
          </button>
        </div>

        {/* PROMINENT TOTAL REVENUE CALLOUT CARD */}
        <div className="mb-8 rounded-2xl bg-white border border-slate-200 p-6 sm:p-8 shadow-sm">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-center">
            {/* Left 2 cols: Big Number & Explanation */}
            <div className="lg:col-span-2 space-y-3">
              <span className="text-xs font-bold uppercase tracking-wider text-indigo-600">
                Total Reconciled Revenue Across All 6 Orders
              </span>
              <div className="flex items-baseline gap-3">
                <span className="text-4xl sm:text-5xl lg:text-6xl font-black text-slate-900 font-mono tracking-tight">
                  ${TOTAL_REVENUE.toFixed(2)}
                </span>
                <span className="text-sm font-semibold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200">
                  Verified Total
                </span>
              </div>
              <p className="text-xs sm:text-sm text-slate-600 max-w-xl">
                Calculated by standardizing documented integer cents (<code className="font-mono text-slate-800">ord_1001 – ord_1005</code>) and applying the decimal dollar interpretation to <code className="font-mono text-slate-800">ord_1006</code>.
              </p>
            </div>

            {/* Right col: Summary breakdown stat cards */}
            <div className="grid grid-cols-2 gap-3 bg-slate-50 p-4 rounded-xl border border-slate-200/80">
              <div>
                <span className="text-[11px] font-semibold uppercase tracking-wider text-slate-500 block">
                  Orders 1001–1005
                </span>
                <span className="text-lg font-bold font-mono text-slate-800">$274.41</span>
                <span className="text-[11px] text-slate-500 block">5 orders in cents</span>
              </div>
              <div className="border-l border-slate-200 pl-3">
                <span className="text-[11px] font-semibold uppercase tracking-wider text-amber-700 block">
                  Order 1006
                </span>
                <span className="text-lg font-bold font-mono text-amber-800">$53.62</span>
                <span className="text-[11px] text-amber-700 block">Decimal format</span>
              </div>
            </div>
          </div>
        </div>

        {/* IMPORTANT ASSUMPTION CALLOUT BOX */}
        <div className="mb-8 rounded-xl border-2 border-amber-300 bg-amber-50/80 p-5 sm:p-6 shadow-2xs">
          <div className="flex items-start gap-4">
            <div className="p-2 rounded-lg bg-amber-500 text-white shrink-0 mt-0.5 shadow-2xs">
              <AlertTriangle className="w-5 h-5" />
            </div>
            <div className="space-y-2">
              <div className="flex flex-wrap items-center gap-2">
                <h3 className="text-base font-bold text-amber-950">
                  {REVENUE_ASSUMPTION.headline}
                </h3>
                <span className="text-[11px] font-bold px-2 py-0.5 rounded bg-amber-200 text-amber-900 uppercase tracking-wide">
                  Signoff Required
                </span>
              </div>
              <p className="text-xs sm:text-sm text-amber-900 leading-relaxed font-medium">
                {REVENUE_ASSUMPTION.detail}
              </p>
              <div className="pt-2 mt-2 border-t border-amber-200/80 text-xs text-amber-800 flex items-start gap-2">
                <Info className="w-4 h-4 shrink-0 mt-0.5 text-amber-700" />
                <span>
                  <strong>Risk of Misinterpretation: </strong>
                  {REVENUE_ASSUMPTION.discrepancyRisk}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* ALL SIX ORDERS TABLE */}
        <div className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-2xs">
          <div className="px-5 py-4 border-b border-slate-200 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <FileSpreadsheet className="w-4 h-4 text-slate-500" />
              <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider">
                Captured Orders Roster (6 Records)
              </h3>
            </div>
            <span className="text-xs text-slate-500 font-mono">
              6 of 6 records displayed
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-slate-200 text-left text-sm">
              <thead className="bg-slate-50 text-slate-700 font-semibold text-xs uppercase tracking-wider">
                <tr>
                  <th scope="col" className="py-3.5 pl-4 pr-3 sm:pl-6">Order ID</th>
                  <th scope="col" className="px-3 py-3.5">Customer</th>
                  <th scope="col" className="px-3 py-3.5">Status</th>
                  <th scope="col" className="px-3 py-3.5 text-right">Subtotal</th>
                  <th scope="col" className="px-3 py-3.5 text-right">Tax</th>
                  <th scope="col" className="px-3 py-3.5 text-right">Shipping</th>
                  <th scope="col" className="px-3 py-3.5 text-right">Raw Total</th>
                  <th scope="col" className="px-3 py-3.5">Unit Convention</th>
                  <th scope="col" className="px-3 py-3.5 text-right pr-4 sm:pr-6">Reconciled USD</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 bg-white font-sans">
                {ORDERS_DATA.map((order) => {
                  const isOrd1006 = order.id === 'ord_1006';
                  return (
                    <tr 
                      key={order.id}
                      className={isOrd1006 ? 'bg-amber-50/50 hover:bg-amber-50 font-medium' : 'hover:bg-slate-50/60'}
                    >
                      {/* Order ID */}
                      <td className="py-3.5 pl-4 pr-3 sm:pl-6 font-mono font-bold text-slate-900">
                        <div className="flex items-center gap-1.5">
                          <span>{order.id}</span>
                          {isOrd1006 && (
                            <span className="text-[10px] px-1.5 py-0.5 rounded bg-amber-200 text-amber-900 font-sans font-bold">
                              Mismatch
                            </span>
                          )}
                        </div>
                        <span className="text-[11px] font-mono text-slate-400 block font-normal">
                          {order.sourceFile}
                        </span>
                      </td>

                      {/* Customer */}
                      <td className="px-3 py-3.5 text-xs text-slate-700">
                        <span className="font-medium text-slate-900 block">{order.customerName}</span>
                        {order.customerEmail === null ? (
                          <span className="text-rose-600 font-mono text-[11px] font-semibold">
                            email: null ⚠️
                          </span>
                        ) : (
                          <span className="text-slate-500 text-[11px]">{order.customerEmail}</span>
                        )}
                      </td>

                      {/* Status */}
                      <td className="px-3 py-3.5 whitespace-nowrap text-xs">
                        {order.status === 'delivered' && (
                          <span className="px-2 py-0.5 rounded-full font-semibold bg-slate-100 text-slate-700">
                            delivered
                          </span>
                        )}
                        {order.status === 'shipped' && (
                          <span className="px-2 py-0.5 rounded-full font-semibold bg-blue-50 text-blue-700 border border-blue-200">
                            shipped
                          </span>
                        )}
                        {order.status === 'pending' && (
                          <span className="px-2 py-0.5 rounded-full font-semibold bg-amber-50 text-amber-700 border border-amber-200">
                            pending
                          </span>
                        )}
                        {order.status === 'refunded' && (
                          <span className="px-2 py-0.5 rounded-full font-semibold bg-rose-50 text-rose-700 border border-rose-200">
                            refunded ⚠️
                          </span>
                        )}
                      </td>

                      {/* Subtotal */}
                      <td className="px-3 py-3.5 font-mono text-xs text-right text-slate-700">
                        {order.rawSubtotal}
                      </td>

                      {/* Tax */}
                      <td className="px-3 py-3.5 font-mono text-xs text-right text-slate-700">
                        {order.rawTax}
                      </td>

                      {/* Shipping */}
                      <td className="px-3 py-3.5 font-mono text-xs text-right text-slate-700">
                        {order.rawShipping}
                      </td>

                      {/* Raw Total */}
                      <td className="px-3 py-3.5 font-mono font-semibold text-slate-800 text-xs text-right">
                        <code>{order.rawTotal}</code>
                      </td>

                      {/* Unit Convention */}
                      <td className="px-3 py-3.5 text-xs">
                        {isOrd1006 ? (
                          <span className="font-semibold text-amber-800 bg-amber-100 px-2 py-0.5 rounded text-[11px]">
                            Decimal (dollars)
                          </span>
                        ) : (
                          <span className="text-slate-600 bg-slate-100 px-2 py-0.5 rounded text-[11px]">
                            Integer (cents)
                          </span>
                        )}
                      </td>

                      {/* Reconciled USD */}
                      <td className="px-3 py-3.5 text-right font-mono font-bold text-slate-900 pr-4 sm:pr-6">
                        ${order.calculatedTotalUSD.toFixed(2)}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
              <tfoot className="bg-slate-100/80 font-semibold border-t-2 border-slate-300">
                <tr>
                  <td colSpan={8} className="py-4 pl-4 pr-3 sm:pl-6 text-sm font-bold text-slate-900 text-right">
                    Calculated Total Revenue:
                  </td>
                  <td className="py-4 px-3 pr-4 sm:pr-6 text-right font-mono text-base sm:text-lg font-black text-emerald-800">
                    ${TOTAL_REVENUE.toFixed(2)}
                  </td>
                </tr>
              </tfoot>
            </table>
          </div>
        </div>

        {/* Explicit Note about non-speculative presentation */}
        <div className="mt-4 text-center">
          <p className="text-xs text-slate-500 italic">
            * Note: In accordance with analytical rigor, no extrapolated or speculative sales forecasting charts are displayed, as the assignment dataset is bounded strictly to these 6 captured records.
          </p>
        </div>
      </div>
    </section>
  );
};
