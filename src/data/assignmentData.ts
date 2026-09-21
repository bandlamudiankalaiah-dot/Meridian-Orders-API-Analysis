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
    impact: "High. Client systems expecting a non-null email string may fail validation or require additional null handling.",
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
    actual: "The documentation says has_more determines whether another page should be requested. The response has has_more=false while next_cursor is populated, so the relationship between these fields should be clarified.",
    impact: "Medium. A client following has_more would stop pagination, so the relationship between these fields should be clarified.",
    severity: "Medium",
    affectedFile: "orders_page1.json",
    codeSnippet: {
      expected: `// Documented Behavior\n// has_more determines whether another page should be requested.`,
      actual: `// orders_page1.json\n{\n  "has_more": false,\n  "next_cursor": "cur_8f2a19bd"\n}`
    }
  },
  {
    id: 5,
    title: "Non-existent order returns HTTP 200",
    category: "HTTP Status & Error Handling",
    documented: "Expected: HTTP 404 Not Found because the requested order does not exist.",
    actual: "order_ord_9999.json represents a request for a non-existent order and returns HTTP 200 with {\"order\": null}.",
    impact: "High. A client may interpret HTTP 200 as a successful lookup instead of a missing resource.",
    severity: "High",
    affectedFile: "order_ord_9999.json",
    codeSnippet: {
      expected: `HTTP/1.1 404 Not Found\n// Expected: HTTP 404 Not Found because the requested order does not exist.`,
      actual: `// Actual Response (order_ord_9999.json)\nHTTP/1.1 200 OK\n{\n  "order": null\n}`
    }
  },
];

export const MOST_SERIOUS_ISSUE = {
  title: "Most Serious Issue: Inconsistent Monetary-Unit Format in ord_1006",
  description:
    "The inconsistent monetary-unit format in ord_1006 is the most serious issue because it directly affects financial calculations and revenue reconciliation. If downstream systems expect integer cents as documented, treating 53.62 as 53 cents could cause calculation discrepancies and reporting errors.",
};

export const ORDERS_DATA: OrderRecord[] = [
  {
    id: "ord_1001",
    sourceFile: "orders_page1.json",
    rawSubtotal: "4500",
    rawTax: "371",
    rawShipping: "599",
    rawTotal: "5470",
    rawUnitFormat: "Integer (cents)",
    calculatedTotalUSD: 54.70,
    status: "shipped",
    customerName: "Rina Okafor",
    customerEmail: "r.okafor@example.com",
    notes: "Follows documented integer cents format.",
  },
  {
    id: "ord_1002",
    sourceFile: "orders_page1.json",
    rawSubtotal: "2200",
    rawTax: "181",
    rawShipping: "0",
    rawTotal: "2381",
    rawUnitFormat: "Integer (cents)",
    calculatedTotalUSD: 23.81,
    status: "delivered",
    customerName: "Tigist Abebe",
    customerEmail: "t.abebe@example.com",
    notes: "Follows documented integer cents format.",
  },
  {
    id: "ord_1003",
    sourceFile: "orders_page1.json",
    rawSubtotal: "8900",
    rawTax: "734",
    rawShipping: "599",
    rawTotal: "10233",
    rawUnitFormat: "Integer (cents)",
    calculatedTotalUSD: 102.33,
    status: "refunded",
    customerName: "Johan Lindqvist",
    customerEmail: "j.lindqvist@example.com",
    notes: "⚠️ Status is 'refunded' (undocumented status value).",
    isSpecialCase: true,
  },
  {
    id: "ord_1004",
    sourceFile: "orders_page1.json",
    rawSubtotal: "6200",
    rawTax: "511",
    rawShipping: "599",
    rawTotal: "6810",
    rawUnitFormat: "Integer (cents)",
    calculatedTotalUSD: 68.10,
    status: "shipped",
    customerName: "Mateo Dela Cruz",
    customerEmail: "m.delacruz@example.com",
    notes: "Follows documented integer cents format.",
  },
  {
    id: "ord_1005",
    sourceFile: "orders_page2.json",
    rawSubtotal: "1800",
    rawTax: "148",
    rawShipping: "599",
    rawTotal: "2547",
    rawUnitFormat: "Integer (cents)",
    calculatedTotalUSD: 25.47,
    status: "delivered",
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
    status: "shipped",
    customerName: "Piotr Nowak",
    customerEmail: "p.nowak@example.com",
    notes: "🚨 Inconsistent unit format: decimal dollar value (53.62) instead of integer cents (5362).",
    isSpecialCase: true,
  },
];

export const TOTAL_REVENUE = 328.03;

export const REVENUE_ASSUMPTION = {
  headline: "Important Reconciliation Assumption",
  detail:
    "ord_1006 uses decimal dollar-style values while the other orders use integer smallest-unit values. For this analysis, interpret 53.62 as $53.62, but this assumption should be confirmed with the API owner before finalizing financial reports.",
  discrepancyRisk:
    "If ord_1006 were interpreted as 53 cents, the total would be $274.94, creating a $53.09 difference.",
};

export const PRIYA_EMAIL: StakeholderEmail = {
  subject: "Re: Orders API Revenue Reconciliation — Findings & Verified Figures",
  recipientName: "Priya",
  senderName: "Ankalaiah",
  senderRole: "Product Analyst Intern",
  ticketId: "TICKET-4502",
  body: `Hi Priya,

I found a data-format issue that can explain the reconciliation difference. Most order totals are returned in cents as documented, but ord_1006 returns decimal dollar values (53.62) instead of the documented integer smallest-unit format.

There are also other API inconsistencies, including a refunded status that isn't documented and a missing customer email despite the documentation saying it is always present.

Interpreting ord_1006's decimal value as $53.62, the six captured orders total $328.03.

I recommend confirming the intended representation of ord_1006 before using the API data for financial reporting.

Regards,
Ankalaiah`,
};

export const BUG_REPORT: BugReportData = {
  ticketId: "TICKET-4502",
  title: "Orders API returns monetary values in inconsistent units",
  component: "Orders API / Serialization",
  problem: "GET /v1/orders returns monetary fields using two different formats across orders.",
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
    formatDescription:
      "All monetary fields should be returned as integers in the smallest currency unit. If the intended total for ord_1006 is $53.62, the API should return total: 5362, with the corresponding monetary fields represented consistently.",
    sampleFormattedTotal: 5362,
  },
  suggestedInvestigation:
    "Check the serialization and conversion logic for ord_1006 and ensure all monetary fields consistently use the documented smallest-unit integer convention.",
};

export const CONCLUSION_RISKS = [
  {
    title: "Financial Calculations & Reporting Discrepancies",
    severity: "Critical",
    description:
      "Decimal representation vs. integer cents in ord_1006 may cause reconciliation discrepancies and reporting variances in downstream financial systems.",
  },
  {
    title: "Client-Side Parsing & Validation Issues",
    severity: "High",
    description:
      "Undocumented enum values (status: 'refunded') and null email fields (ord_1005) could cause parsing errors or unexpected behavior in clients expecting the documented schema.",
  },
  {
    title: "Data Truncation via Pagination Logic",
    severity: "Medium",
    description:
      "Conflicting pagination signals (has_more: false alongside next_cursor: 'cur_8f2a19bd') could cause clients following has_more to stop pagination prematurely and miss subsequent orders.",
  },
  {
    title: "Ambiguous Response on Non-Existent Resources",
    severity: "High",
    description:
      "Returning HTTP 200 with {'order': null} instead of HTTP 404 could cause clients to misinterpret a missing resource as a successful query.",
  },
];
