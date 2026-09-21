# Meridian Orders API — Product Analyst Take-Home Assignment

**Candidate:** Ankalaiah  
**Role:** Product Analyst Intern  
**Project:** Take-Home Case Study & API Contract Audit  
**Ticket Reference:** TICKET-4502 / ENG-8912  

---

## 📌 Project Disclaimer & Context

> **IMPORTANT:** This is **NOT** a real API project. Meridian is a fictional company and the API is not live. This application is a professional one-page presentation of the candidate's analysis and take-home assignment submission based strictly on captured API responses provided for evaluation (`orders_page1.json`, `orders_page2.json`, and `order_ord_9999.json`). No fabricated API calls or synthetic data have been added.

---

## 📋 Executive Overview of Tasks

### Task 1 — API Contract Analysis
Identified 5 critical discrepancies between the documented API specification and actual response payloads:
1. **Undocumented Status:** `orders_page1.json` contains `ord_1003` with `status = "refunded"`, which is missing from the documented enum (`pending`, `shipped`, `delivered`, `cancelled`). *(Impact: High)*
2. **Customer Email Nullability:** `orders_page2.json` contains `ord_1005` with `customer.email = null` and `customer.name = "Guest"`, violating the contract stating `customer.email` is always present. *(Impact: High)*
3. **Inconsistent Monetary Units (Most Serious Issue):** `orders_page2.json` contains `ord_1006` with decimal dollar floats (`subtotal: 44.0`, `tax: 3.63`, `shipping: 5.99`, `total: 53.62`) instead of integer smallest-unit values (cents) used across all other orders (e.g., `ord_1001 total: 5470`). *(Impact: Critical/High)*
4. **Pagination Inconsistency:** `orders_page1.json` returns `has_more = false` alongside an active `next_cursor = "cur_8f2a19bd"`. Following `has_more` causes clients to prematurely terminate pagination and miss subsequent orders. *(Impact: Medium)*
5. **Non-Existent Order Returns HTTP 200:** Request for missing order `ord_9999` returns HTTP 200 OK with `{"order": null}` instead of the documented HTTP 404 Not Found, leading to false-positive success handling in client applications. *(Impact: High)*

---

### Task 2 — Revenue Reconciliation
Summary of all six captured orders:

| Order ID | Source File | Raw API Total | Format Convention | Reconciled USD |
| :--- | :--- | :--- | :--- | :--- |
| **ord_1001** | `orders_page1.json` | `5470` | Integer (cents) | **$54.70** |
| **ord_1002** | `orders_page1.json` | `2381` | Integer (cents) | **$23.81** |
| **ord_1003** | `orders_page1.json` | `10233` | Integer (cents) | **$102.33** |
| **ord_1004** | `orders_page2.json` | `6810` | Integer (cents) | **$68.10** |
| **ord_1005** | `orders_page2.json` | `2547` | Integer (cents) | **$25.47** |
| **ord_1006** | `orders_page2.json` | `53.62` | Decimal (dollars) | **$53.62** |
| **TOTAL** | — | — | — | **$328.03** |

*Important Assumption:* `ord_1006` uses decimal dollar-style values while the other orders use integer smallest-unit values. For this analysis, `53.62` is interpreted as **$53.62**, but this must be confirmed with the API owner before production financial reporting. If naively interpreted as integer cents, the total would drop to **$274.95** (a **$53.08** variance).

---

### Task 3A — Reply to Priya (Reconciliation Team)
Concise, professional stakeholder email explaining the root cause of the reconciliation difference, highlighting the other API anomalies, confirming the $328.03 total under the stated assumption, and recommending verification with the API team before financial sign-off.

---

### Task 3B — Engineering Bug Report
Structured engineering bug report (ENG-8912) detailing the inconsistent monetary unit serialization in `ord_1006`, comparing actual versus expected JSON representations, and providing a targeted investigation recommendation for backend engineers.

---

## 🛠️ Tech Stack
- **Framework:** React 19 + TypeScript
- **Bundler:** Vite 6
- **Styling:** Tailwind CSS v4 (Clean, high-contrast, accessible light SaaS theme)
- **Icons:** Lucide React
- **Architecture:** Pure static client-side single-page application (zero backend dependencies, zero database requirements)

---

## 🚀 How to Run Locally

### 1. Prerequisites
Ensure [Node.js](https://nodejs.org/) (version 18 or newer) is installed.

### 2. Installation
```bash
npm install
```

### 3. Start Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

### 4. Build Production Bundle
```bash
npm run build
```
The compiled, production-ready static assets will be output to the `dist/` directory.

---

## 🌐 How to Deploy

Because this application is a 100% static frontend with no backend dependencies, it can be deployed for free in under two minutes to any static hosting provider:

### Deploy to Vercel
1. Push your repository to GitHub.
2. Go to [vercel.com](https://vercel.com) and click **"Add New Project"**.
3. Import your GitHub repository.
4. Framework Preset: **Vite**.
5. Build Command: `npm run build`.
6. Output Directory: `dist`.
7. Click **Deploy**.

### Deploy to Netlify
1. Go to [netlify.com](https://netlify.com) and select **"Add new site" > "Import an existing project"**.
2. Connect your Git provider and select the repo.
3. Build command: `npm run build`.
4. Publish directory: `dist`.
5. Click **Deploy site**.
*(Alternatively: drag and drop the built `dist` folder into Netlify Drop).*

### Deploy to GitHub Pages
1. In `vite.config.ts`, ensure `base: './'` or `base: '/<repo-name>/'` is specified.
2. Build the project:
   ```bash
   npm run build
   ```
3. Deploy the `dist/` directory using GitHub Actions or the `gh-pages` package.

---

## 📄 License
MIT. Prepared by Ankalaiah for Product Analyst Intern Take-Home Evaluation.
