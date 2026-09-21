# Meridian Orders API — Product Analyst Assignment

**Candidate:** Ankalaiah | **Role:** Product Analyst Intern | **Reference:** TICKET-4502  

> **Note:** Meridian is a fictional company. Technical instructions are in [DEVELOPMENT.md](./DEVELOPMENT.md).

---

## Task 1 — API Analysis & Discrepancies

Audit of captured response files (`orders_page1.json`, `orders_page2.json`, `order_ord_9999.json`) against documentation:

1. **Undocumented Order Status:** `orders_page1.json` contains `ord_1003` with `status = "refunded"`. Documented statuses: `pending`, `shipped`, `delivered`, `cancelled`.  
   *Impact: High.* Clients validating enums may reject the record or fail refund workflows.
2. **Customer Email Nullability:** `orders_page2.json` contains `ord_1005` with `customer.email = null` (`customer.name = "Guest"`). Documentation states `customer.email` is always present.  
   *Impact: High.* Clients expecting non-null email strings may fail validation or require null handling.
3. **Inconsistent Monetary Representation (Most Serious Issue):** `orders_page2.json` contains `ord_1006` with decimal dollar values (`subtotal: 44.0`, `tax: 3.63`, `shipping: 5.99`, `total: 53.62`), whereas other orders use integer cents (`ord_1001 total: 5470`).  
   *Impact: High.* Mixing decimal dollars and integer cents can contribute to revenue reconciliation differences.
4. **Pagination Inconsistency:** The documentation says `has_more` determines whether another page should be requested. `orders_page1.json` returns `has_more = false` with populated `next_cursor` (`cur_8f2a19bd`).  
   *Impact: Medium.* Clients following `has_more` stop pagination after page 1, missing subsequent orders.
5. **Non-Existent Order Returns HTTP 200:** Requesting non-existent `ord_9999` returns HTTP 200 OK with `{"order": null}`. Expected: HTTP 404 Not Found.  
   *Impact: High.* Clients cannot rely on standard HTTP error status codes.

---

## Task 2 — Revenue Reconciliation

Captured orders across both pages:

| Order ID | Source File | Customer | Status | Subtotal | Tax | Shipping | Total | Format | USD |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| **ord_1001** | `orders_page1.json` | Rina Okafor | shipped | 4500 | 371 | 599 | 5470 | Cents | $54.70 |
| **ord_1002** | `orders_page1.json` | Tigist Abebe | delivered | 2200 | 181 | 0 | 2381 | Cents | $23.81 |
| **ord_1003** | `orders_page1.json` | Johan Lindqvist | refunded | 8900 | 734 | 599 | 10233 | Cents | $102.33 |
| **ord_1004** | `orders_page1.json` | Mateo Dela Cruz | shipped | 6200 | 511 | 599 | 6810 | Cents | $68.10 |
| **ord_1005** | `orders_page2.json` | Guest | delivered | 1800 | 148 | 599 | 2547 | Cents | $25.47 |
| **ord_1006** | `orders_page2.json` | Piotr Nowak | shipped | 44.0 | 3.63 | 5.99 | 53.62 | Dollars | $53.62 |
| **TOTAL** | — | — | — | — | — | — | — | — | **$328.03** |

*Assumption:* Total revenue is **$328.03** under the explicit assumption that `ord_1006`'s `53.62` represents **$53.62**, because the response uses decimal dollar values. Confirm with API owners before finalized reporting. If parsed as 53 cents, total is **$274.94** ($53.09 difference).

---

## Task 3A — Stakeholder Email to Priya

**Subject:** Re: Orders API Revenue Reconciliation — Findings & Verified Figures

Hi Priya,

Thank you for reaching out. I reviewed the Orders API responses and identified the data issue contributing to the reconciliation difference.

The discrepancy stems from inconsistent monetary representations: orders `ord_1001` through `ord_1005` return amounts in integer cents (e.g., `5470` = $54.70), while `ord_1006` returns values in decimal dollars (`total: 53.62` = $53.62).

Under the assumption that `ord_1006` represents $53.62, the total revenue across all six orders is **$328.03**. If a system parsed `53.62` as 53 cents, the total would incorrectly calculate as **$274.94** ($53.09 difference).

Additionally:
- `ord_1003` has undocumented status `"refunded"`.
- `ord_1005` contains `customer.email = null`.
- `orders_page1.json` has `has_more = false` with populated `next_cursor`.
- `ord_9999` returns HTTP 200 with `{"order": null}` instead of HTTP 404.

I have documented the issue under TICKET-4502 and recommend confirming the intended convention with the API team before finalizing financial reports.

Best regards,  
Ankalaiah  
Product Analyst Intern

---

## Task 3B — Engineering Bug Report

- **Reference:** TICKET-4502
- **Title:** Orders API returns monetary values in inconsistent units
- **Component:** Orders API / Serialization
- **Affected Order:** `ord_1006` in `orders_page2.json`

### Problem Summary
`GET /v1/orders` returns monetary fields using inconsistent units. Orders `ord_1001`–`ord_1005` return integer cents; `ord_1006` returns decimal floating-point dollars.

### Evidence
- `ord_1001` (orders_page1.json): `{"subtotal": 4500, "tax": 371, "shipping": 599, "total": 5470}`
- `ord_1006` (orders_page2.json): `{"subtotal": 44.0, "tax": 3.63, "shipping": 5.99, "total": 53.62}`

### Expected vs. Actual Behavior
- **Expected:** All monetary fields should be returned as integers in the smallest currency unit. If the intended total for ord_1006 is $53.62, the API should return total: 5362, with the corresponding monetary fields represented consistently.
- **Actual:** `ord_1006` returns decimal floating-point dollars.

### Impact
Clients parsing monetary fields as integer cents could miscalculate ord_1006 as 53 cents, contributing to reconciliation discrepancies.

### Suggested Investigation
Verify serialization logic for `ord_1006` so all endpoints format monetary values as integers in the smallest currency unit.
