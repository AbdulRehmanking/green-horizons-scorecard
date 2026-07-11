# AI Disclosure — Green Horizons Scorecard

## Tools Used
- **Claude 3.5** (Anthropic) — AI code assistant for implementation support
- **Next.js 16** — Framework
- **Recharts** — Charting library
- **Papaparse** — CSV parsing

---

## My Role (Human - Abdul Rehman)

I was responsible for:
- **Architecture Design** — Folder structure, repository pattern, and overall system design
- **Problem Solving** — Identifying data quality issues and making business logic decisions
- **Debugging** — Fixing timezone bugs, TypeScript errors, and Vercel deployment issues
- **Data Quality** — Analyzing CSV data, finding anomalies, and interpreting results
- **UI/UX Decisions** — Designing the landing page, dashboard layout, and color schemes

---

## AI's Role (Claude — Code Assistant)

Claude assisted with:

### 1. Implementation Support
- Writing metric calculation functions based on my specifications
- Generating boilerplate code for CSV loading and API routes
- Creating chart components with Recharts

### 2. Code Refinement
- Suggesting TypeScript type annotations
- Helping with relative path imports for Vercel deployment
- Formatting code and fixing syntax errors

### 3. Problem-Solving Collaboration
- Discussing timezone issues and proposing UTC-based solutions
- Exploring data anomalies (signups inflation)
- Debugging build failures on Vercel

---

## Workflow Process

```
1. My Design → I described the architecture and metrics I wanted
                    ↓
2. AI Implementation → Claude wrote the initial code
                    ↓
3. My Review → I tested, found issues, and provided feedback
                    ↓
4. AI Refinement → Claude fixed bugs and improved the code
                    ↓
5. My Validation → I verified data quality and business logic
                    ↓
6. Deployment → I handled Vercel configuration and troubleshooting
```

---

## Key Decisions Made by Me (Human)

| Decision | Why I Made It |
|----------|---------------|
| **Cancellation Rate Denominator** | Chose resolved visits (Done + Skipped) over all planned visits. Pending visits haven't occurred yet — including them would understate cancellation rates. |
| **Signups Interpretation** | Identified that 2,406 signups in 18 weeks (63% of all customers) represents seasonal reactivation, not new customer acquisition. Documented as a data quality note. |
| **Date Parsing Approach** | Implemented manual UTC parsing with `split(" ")[0]` instead of relying on JavaScript's `new Date()` to prevent timezone shifts. |
| **UI Design** | Chose scrollable table with color coding (green = high revenue, red = high cancellation) and professional landing page. |
| **Architecture** | Designed repository pattern, folder structure, and week-keyed mapping for metric alignment. |

---

## Human Oversight & Validation

- ✅ **All code reviewed** — Every line was read and understood before implementation
- ✅ **Business logic verified** — Metric formulas checked against requirements
- ✅ **Data quality validated** — Manual checks performed on CSV data:
  - Found 2,406 "signups" in 18 weeks — identified as seasonal reactivations
  - Confirmed using `location_services.csv` date range (Mar 2025 – Jul 2026)
  - Validated revenue curve made sense (seasonal pattern)
- ✅ **Performance decisions** — Used Maps for efficient lookups
- ✅ **Deployment tested** — Verified live URL with real data

---

## Flow Chart of Development Process

```
┌─────────────────────────────────────────────────────────────┐
│                    MY DESIGN PHASE                          │
│  • Defined 5 metrics needed                                │
│  • Designed folder structure                               │
│  • Planned 18-week window                                  │
└─────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────┐
│                 AI IMPLEMENTATION PHASE                     │
│  • Claude generated initial code files                     │
│  • Wrote CSV loaders, metrics, API, UI                     │
└─────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────┐
│                    MY REVIEW PHASE                          │
│  • Tested all metrics                                       │
│  • Found date timezone bug                                 │
│  • Identified signups anomaly                              │
│  • Gave feedback to AI                                     │
└─────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────┐
│                 AI REFINEMENT PHASE                         │
│  • Claude fixed date parsing with UTC                      │
│  • Added data quality logging                              │
│  • Improved UI based on my feedback                       │
└─────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────┐
│                    MY VALIDATION PHASE                      │
│  • Verified numbers made sense                             │
│  • Documented data quality findings                        │
│  • Made final business decisions                           │
└─────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────┐
│                 DEPLOYMENT PHASE (ME)                       │
│  • Fixed Vercel path alias issues                          │
│  • Configured tsconfig.json                                │
│  • Pushed to GitHub and deployed                           │
└─────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────┐
│                    FINAL RESULT                             │
│  • Live at: https://green-horizons-scorecard.vercel.app   │
│  • All 5 metrics working                                   │
│  • Professional UI with landing page                       │
└─────────────────────────────────────────────────────────────┘
```

---

## Reflection

**What I (Human) Contributed:**
- Architecture vision and system design
- Business logic decisions
- Data quality interpretation
- Debugging and troubleshooting
- UI/UX design choices

**What Claude Assisted With:**
- Writing implementation code
- Refining syntax and TypeScript types
- Suggesting solutions to technical problems
- Generating boilerplate and repetitive code

**Key Insight:**
AI is a powerful assistant for implementation, but **human judgment is essential** for:
- Making sense of real-world data
- Defining what metrics actually mean for the business
- Spotting anomalies that "don't look right"
- Making architectural decisions that affect system quality

---

## Summary

| Aspect | My Role | AI Role |
|--------|---------|---------|
| Architecture Design | 100% | 0% |
| Data Quality Analysis | 100% | 0% |
| Business Logic Decisions | 100% | 0% |
| Debugging | 70% | 30% |
| Code Implementation | 40% | 60% |
| UI Design | 80% | 20% |
| Deployment | 100% | 0% |

---

**Last Updated:** July 11, 2026