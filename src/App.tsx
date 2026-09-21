/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { ExecutiveSummary } from './components/ExecutiveSummary';
import { FindingsSection } from './components/FindingsSection';
import { RevenueSection } from './components/RevenueSection';
import { EmailCard } from './components/EmailCard';
import { BugReportCard } from './components/BugReportCard';
import { ConclusionSection } from './components/ConclusionSection';
import { Footer } from './components/Footer';

export default function App() {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans flex flex-col">
      <Header />
      <main className="flex-1">
        <Hero />
        <ExecutiveSummary />
        <FindingsSection />
        <RevenueSection />
        <EmailCard />
        <BugReportCard />
        <ConclusionSection />
      </main>
      <Footer />
    </div>
  );
}
