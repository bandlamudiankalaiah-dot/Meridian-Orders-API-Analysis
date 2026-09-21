# Development & Deployment Guide

This document provides technical instructions for running, building, and deploying the Meridian Orders API Analysis web application.

---

## 🛠️ Tech Stack
- **Framework:** React 19 + TypeScript
- **Bundler:** Vite 6
- **Styling:** Tailwind CSS v4 (Clean, high-contrast, accessible light theme)
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

Because this application is a static frontend with no backend dependencies, it can be deployed to any static hosting provider:

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
2. Connect your Git provider and select the repository.
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
