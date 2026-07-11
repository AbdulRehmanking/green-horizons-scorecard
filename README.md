# Green Horizons — Weekly Scorecard Dashboard

> A production-grade analytics dashboard that tracks 5 key business metrics for a lawn care company across an 18-week seasonal window.

---

## 🌐 Live Demo

**Dashboard:** https://green-horizons-scorecard.vercel.app

**API Endpoint:** https://green-horizons-scorecard.vercel.app/api/metrics

---

## 📋 Table of Contents

- [Overview](#overview)
- [Tech Stack](#tech-stack)
- [Getting Started](#getting-started)
- [API Documentation](#api-documentation)
- [Metrics Explained](#metrics-explained)
- [Data Quality Findings](#data-quality-findings)
- [Architecture Decisions](#architecture-decisions)
- [Project Structure](#project-structure)
- [Deployment](#deployment)
- [AI Disclosure](#ai-disclosure)

---

## 📖 Overview

Green Horizons is a lawn care company that needed a way to track weekly performance during their busy season (March 2 – July 5, 2026). This dashboard pulls from 7 CSV data sources, calculates 5 core business metrics, and presents them in a clean, interactive interface.

**What this project does:**
- ✅ Parses real operational data from CSV files
- ✅ Calculates weekly revenue, signups, cancellation rates, revenue per crew-day, and active staff
- ✅ Provides a REST API endpoint for programmatic access
- ✅ Displays professional dashboard with KPI cards, charts, and detailed data tables

---

## 🛠️ Tech Stack

| Category | Technology |
|----------|------------|
| **Framework** | Next.js 16 (App Router) |
| **Language** | TypeScript |
| **Styling** | Tailwind CSS |
| **Charts** | Recharts |
| **CSV Parsing** | Papaparse |
| **Deployment** | Vercel |
| **Version Control** | Git + GitHub |

---

## 🚀 Getting Started

### Prerequisites
- Node.js 18+
- npm or yarn

### Installation

```bash
# Clone the repository
git clone https://github.com/AbdulRehmanking/green-horizons-scorecard.git

# Navigate to project
cd green-horizons-scorecard

# Install dependencies
npm install

# Run development server
npm run dev