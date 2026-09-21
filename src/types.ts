export type Severity = 'Critical' | 'High' | 'Medium' | 'Low';

export interface Finding {
  id: number;
  title: string;
  category: string;
  documented: string;
  actual: string;
  impact: string;
  severity: Severity;
  affectedFile: string;
  codeSnippet?: {
    expected: string;
    actual: string;
  };
  isMostCritical?: boolean;
}

export interface OrderRecord {
  id: string;
  sourceFile: string;
  rawSubtotal: string;
  rawTax: string;
  rawShipping: string;
  rawTotal: string;
  rawUnitFormat: 'Integer (cents)' | 'Decimal (dollars)';
  calculatedTotalUSD: number;
  status: string;
  customerName: string;
  customerEmail: string | null;
  notes?: string;
  isSpecialCase?: boolean;
}

export interface BugReportData {
  ticketId: string;
  title: string;
  problem: string;
  affectedOrder: string;
  sourceFile: string;
  actual: {
    subtotal: number | string;
    tax: number | string;
    shipping: number | string;
    total: number | string;
    sampleOtherOrder: string;
  };
  expected: {
    formatDescription: string;
    sampleFormattedTotal: number;
  };
  suggestedInvestigation: string;
  component: string;
}

export interface StakeholderEmail {
  subject: string;
  recipientName: string;
  senderName: string;
  senderRole: string;
  ticketId: string;
  body: string;
}
