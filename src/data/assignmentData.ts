import { Finding, OrderRecord, BugReportData, StakeholderEmail } from '../types';

export const ASSIGNMENT_META = {
  projectTitle: "Meridian Orders API — Product Analyst Take-Home Assignment",
  role: "Product Analyst Intern",
  candidateName: "Ankalaiah",
  ticketReference: "TICKET-4502",
  badges: ["API Analysis", "Data Quality", "Product Analysis"],
  disclaimer:
    "This is NOT a real API project. Meridian is a fictional company and the API is not live. This application is a professional presentation of analysis and assignment submission based strictly on captured API responses supplied for the evaluation.",
};

export const FINDINGS: Finding[] = [
  {
    id: 1,
    title: "Undocumented status value ('refunded')",
    category: "Schema & Enum Validation",
    documented: "Status can only be one of: 'pending', 'shipped', 'delivered', 'cancelled'.",
    actual: "orders_page1.json contains order ord_1003 with status = 'refunded'.",
    impact: "High. A client validating against the documented enum may reject the order or fail to handle refunds correctly.",
    severity: "High",
    affectedFile: "orders_page1.json",
    codeSnippet: {
      expected: `// Documented Enum\ntype OrderStatus = "pending" | "shipped" | "delivered" | "cancelled";`,
      actual: `// orders_page1.json (ord_1003)\n{\n  "id": "ord_1003",\n  "status": "refunded" // ⚠️ Not in documented enum\n}`
    }
  },
  {
    id: 2,
    title: "Customer email can be null",
    category: "Contract & Nullability",
    documented: "customer.email is always present and non-null.",
    actual: "orders_page2.json contains ord_1005 with customer.email = null and customer.name = 'Guest'.",
    impact: "High. Applications assuming email is always a string may fail when processing this order.",
    severity: "High",
    affectedFile: "orders_page2.json",
    codeSnippet: {
      expected: `// Documented Contract\ncustomer: {\n  email: string; // Non-nullable\n  name: string;\n}`,
      actual: `// orders_page2.json (ord_1005)\n{\n  "id": "ord_1005",\n  "customer": {\n    "name": "Guest",\n    "email": null // ⚠️ Null value violates documentation\n  }\n}`
    }
  },
  {
    id: 3,
    title: "Inconsistent monetary format",
    category: "Financial Data & Formatting",
    documented: "All monetary amounts are integers in the smallest currency unit (e.g., cents).",
    actual: "ord_1006 in orders_page2.json contains decimal floats: subtotal = 44.0, tax = 3.63, shipping = 5.99, total = 53.62.",
    impact: "High. Clients may interpret the value incorrectly because other orders use integer smallest-unit values.",
    severity: "Critical",
    affectedFile: "orders_page2.json",
    isMostCritical: true,
    codeSnippet: {
      expected: `// Documented Contract (e.g. ord_1001)\n{\n  "id": "ord_1001",\n  "total": 5470 // Integer in cents ($54.70)\n}`,
      actual: `// orders_page2.json (ord_1006)\n{\n  "id": "ord_1006",\n  "subtotal": 44.0,\n  "tax": 3.63,\n  "shipping": 5.99,\n  "total": 53.62 // ⚠️ Decimal float instead of integer cents\n}`
    }
  },
  {
    id: 4,
    title: "Pagination inconsistency",
    category: "API Pagination & Cursor",
    documented: "has_more determines whether another page should be requested.",
    actual: "orders_page1.json contains has_more = false together with next_cursor = 'cur_8f2a19bd'.",
    impact: "Medium. A client following has_more would stop and could miss additional orders.",
    severity: "Medium",
    affectedFile: "orders_page1.json",
    codeSnippet: {
      expected: `// Expected: if next_cursor is present, has_more should be true\n{\n  "has_more": true,\n  "next_cursor": "cur_8f2a19bd"\n}`,
      actual: `// orders_page1.json\n{\n  "has_more": false, // ⚠️ Inconsistent with populated next_cursor\n  "next_cursor": "cur_8f2a19bd"\n}`
    }
  },
  {
    id: 5,
    title: "Non-existent order returns HTTP 200",
    category: "HTTP Status & Error Handling",
    documented: "GET /v1/orders/{id} returns HTTP 404 if the order does not exist.",
    actual: "order_ord_9999.json represents a request for a non-existent order and returns HTTP 200 with {\"order\": null}.",
    impact: "High. A client may interpret HTTP 200 as a successful lookup instead of a missing resource.",
    severity: "High",
    affectedFile: "order_ord_9999.json",
    codeSnippet: {
      expected: `// Documented Response\nHTTP/1.1 404 Not Found\n{\n  "error": "Order not found",\n  "code": "resource_missing"\n}`,
      actual: `// Actual Response (order_ord_9999.json)\nHTTP/1.1 200 OK\n{\n  "order": null // ⚠️ 200 OK masking a missing resource\n}`
    }
  },
];

export const MOST_SERIOUS_ISSUE = {
  title: "Most Serious Issue: Inconsistent Monetary-Unit Format in ord_1006",
  description:
    "The inconsistent monetary-unit format in ord_1006 is the most serious issue because it directly affects financial calculations, ledger integrity, and revenue reconciliation. If a downstream service expects integer cents, it could interpret 53.62 as 53 cents or throw float precision rounding errors, leading to severe accounting errors.",
};

export const ORDERS_DATA: OrderRecord[] = [
  {
    id: "ord_1001",
    sourceFile: "orders_page1.json",
    rawSubtotal: "4850",
    rawTax: "400",
    rawShipping: "220",
    rawTotal: "5470",
    rawUnitFormat: "Integer (cents)",
    calculatedTotalUSD: 54.70,
    status: "delivered",
    customerName: "Alice Miller",
    customerEmail: "alice.miller@example.com",
    notes: "Follows documented integer cents format.",
  },
  {
    id: "ord_1002",
    sourceFile: "orders_page1.json",
    rawSubtotal: "2050",
    rawTax: "181",
    rawShipping: "150",
    rawTotal: "2381",
    rawUnitFormat: "Integer (cents)",
    calculatedTotalUSD: 23.81,
    status: "delivered",
    customerName: "Bob Vance",
    customerEmail: "bob.vance@example.com",
    notes: "Follows documented integer cents format.",
  },
  {
    id: "ord_1003",
    sourceFile: "orders_page1.json",
    rawSubtotal: "9200",
    rawTax: "753",
    rawShipping: "280",
    rawTotal: "10233",
    rawUnitFormat: "Integer (cents)",
    calculatedTotalUSD: 102.33,
    status: "refunded",
    customerName: "Carol Danvers",
    customerEmail: "carol.d@example.com",
    notes: "⚠️ Status is 'refunded' (undocumented status value).",
    isSpecialCase: true,
  },
  {
    id: "ord_1004",
    sourceFile: "orders_page2.json",
    rawSubtotal: "6100",
    rawTax: "460",
    rawShipping: "250",
    rawTotal: "6810",
    rawUnitFormat: "Integer (cents)",
    calculatedTotalUSD: 68.10,
    status: "shipped",
    customerName: "David Rose",
    customerEmail: "david.rose@example.com",
    notes: "Follows documented integer cents format.",
  },
  {
    id: "ord_1005",
    sourceFile: "orders_page2.json",
    rawSubtotal: "2250",
    rawTax: "197",
    rawShipping: "100",
    rawTotal: "2547",
    rawUnitFormat: "Integer (cents)",
    calculatedTotalUSD: 25.47,
    status: "pending",
    customerName: "Guest",
    customerEmail: null,
    notes: "⚠️ customer.email is null (violates non-nullable contract).",
    isSpecialCase: true,
  },
  {
    id: "ord_1006",
    sourceFile: "orders_page2.json",
    rawSubtotal: "44.0",
    rawTax: "3.63",
    rawShipping: "5.99",
    rawTotal: "53.62",
    rawUnitFormat: "Decimal (dollars)",
    calculatedTotalUSD: 53.62,
    status: "delivered",
    customerName: "Frank Chen",
    customerEmail: "frank.c@example.com",
    notes: "🚨 Inconsistent unit format: decimal dollar value (53.62) instead of integer cents (5362).",
    isSpecialCase: true,
  },
];

export const TOTAL_REVENUE = 328.03;

export const REVENUE_ASSUMPTION = {
  headline: "Important Reconciliation Assumption",
  detail:
    "ord_1006 uses decimal dollar-style values while the other orders use integer smallest-unit values. For this analysis, interpret 53.62 as $53.62, but clearly state that this should be confirmed with the API owner before production financial reporting.",
  discrepancyRisk:
    "If a system strictly parsed ord_1006 as smallest-unit integer (cents) or integer-truncated 53.62 to 53 cents, the calculated total would drop to $274.95 (a $53.08 deficit). Clarification with engineering is mandatory.",
};

export const PRIYA_EMAIL: StakeholderEmail = {
  subject: "Re: Revenue reconciliation — TICKET-4502",
  recipientName: "Priya",
  recipientEmail: "priya@meridian.internal",
  senderName: "Ankalaiah",
  senderRole: "Product Analyst Intern",
  ticketId: "TICKET-4502",
  body: `Hi Priya,

I found a data-format issue that can explain the reconciliation difference. Most order totals are returned in cents as documented, but ord_1006 returns decimal dollar values (53.62) instead of the documented integer smallest-unit format.

There are also other API inconsistencies, including a refunded status that isn't documented and a missing customer email despite the documentation saying it is always present.

Using the documented currency convention and interpreting ord_1006 as $53.62, the six captured orders total $328.03.

I recommend confirming the intended representation of ord_1006 before using the API data for financial reporting.

Regards,
Ankalaiah`,
};

export const BUG_REPORT: BugReportData = {
  ticketId: "ENG-8912",
  title: "Orders API returns monetary values in inconsistent units",
  component: "Orders API / Serialization",
  priority: "P1 - High",
  problem: "GET /v1/orders returns monetary fields using two different formats.",
  affectedOrder: "ord_1006 in orders_page2.json",
  sourceFile: "orders_page2.json",
  actual: {
    subtotal: 44.0,
    tax: 3.63,
    shipping: 5.99,
    total: 53.62,
    sampleOtherOrder: "ord_1001 total = 5470 (integer cents)",
  },
  expected: {
    formatDescription: "All monetary fields should follow the documented format: integer values in the smallest currency unit.",
    sampleFormattedTotal: 5362,
  },
  suggestedInvestigation:
    "Check the serialization/conversion logic for ord_1006 and ensure all monetary fields use the same currency-unit convention.",
};

export const CONCLUSION_RISKS = [
  {
    title: "Financial Integrity & Reporting Discrepancies",
    severity: "Critical",
    description:
      "Decimal representation vs. integer cents in ord_1006 directly threatens automated reconciliation, invoice generation, and financial audits. A mismatch causes an immediate $53.08 calculation error.",
  },
  {
    title: "Silent Client-Side System Failures",
    severity: "High",
    description:
      "Undocumented enum values (status: 'refunded') and null email values (ord_1005) trigger unhandled exceptions in strictly-typed downstream consumers (e.g. TypeScript, Kotlin, Java, Go).",
  },
  {
    title: "Data Truncation via Flawed Pagination Logic",
    severity: "Medium",
    description:
      "Conflicting signals in page 1 (has_more: false alongside next_cursor: 'cur_8f2a19bd') cause ETL ingestion pipelines to prematurely terminate, stranding orders on subsequent pages.",
  },
  {
    title: "False Success Masking Missing Resources",
    severity: "High",
    description:
      "Returning HTTP 200 with {'order': null} on non-existent records violates standard REST semantics (HTTP 404), causing client cache corruption and potential null-pointer crashes.",
  },
];
