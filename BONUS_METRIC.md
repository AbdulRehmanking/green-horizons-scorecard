echo "# Bonus Metric: Customer Lifetime Value (CLV)" > BONUS_METRIC.md
echo "" >> BONUS_METRIC.md
echo "## Why This Metric Matters" >> BONUS_METRIC.md
echo "Current metrics show weekly performance but don't measure long-term customer value. CLV would help Green Horizons:" >> BONUS_METRIC.md
echo "- Identify most valuable customer segments" >> BONUS_METRIC.md
echo "- Justify marketing spend on acquisition vs retention" >> BONUS_METRIC.md
echo "- Predict future revenue" >> BONUS_METRIC.md
echo "- Make data-driven decisions on customer service tiers" >> BONUS_METRIC.md
echo "" >> BONUS_METRIC.md
echo "## Proposed Calculation" >> BONUS_METRIC.md
echo "\`\`\`" >> BONUS_METRIC.md
echo "CLV = Average Revenue Per Customer × Average Customer Lifespan (in weeks)" >> BONUS_METRIC.md
echo "\`\`\`" >> BONUS_METRIC.md
echo "" >> BONUS_METRIC.md
echo "### Breakdown:" >> BONUS_METRIC.md
echo "- **Average Revenue Per Customer**: Total revenue from a customer ÷ number of weeks active" >> BONUS_METRIC.md
echo "- **Customer Lifespan**: Weeks from first to last service" >> BONUS_METRIC.md
echo "" >> BONUS_METRIC.md
echo "## Implementation Approach" >> BONUS_METRIC.md
echo "### Step 1: Data Preparation" >> BONUS_METRIC.md
echo "- Join customers with their service history" >> BONUS_METRIC.md
echo "- Calculate revenue per customer over 18 weeks" >> BONUS_METRIC.md
echo "- Identify active vs churned customers" >> BONUS_METRIC.md
echo "" >> BONUS_METRIC.md
echo "### Step 2: Calculation" >> BONUS_METRIC.md
echo "- Group customers by signup week (cohorts)" >> BONUS_METRIC.md
echo "- Calculate average revenue per customer per cohort" >> BONUS_METRIC.md
echo "- Determine average customer lifespan" >> BONUS_METRIC.md
echo "- Compute CLV for each cohort" >> BONUS_METRIC.md
echo "" >> BONUS_METRIC.md
echo "### Step 3: Visualization" >> BONUS_METRIC.md
echo "- Add a new chart to the dashboard showing CLV by cohort" >> BONUS_METRIC.md
echo "- Display a KPI card for average CLV" >> BONUS_METRIC.md
echo "" >> BONUS_METRIC.md
echo "## Data Sources (Already Available)" >> BONUS_METRIC.md
echo "| Table | Fields Needed |" >> BONUS_METRIC.md
echo "|-------|---------------|" >> BONUS_METRIC.md
echo "| customers | CustomerID |" >> BONUS_METRIC.md
echo "| location_services | Serv_DateActivated |" >> BONUS_METRIC.md
echo "| completed_services | Revenue, DateCompleted, LocServID |" >> BONUS_METRIC.md
echo "" >> BONUS_METRIC.md
echo "## Business Impact" >> BONUS_METRIC.md
echo "| Area | Impact |" >> BONUS_METRIC.md
echo "|------|--------|" >> BONUS_METRIC.md
echo "| **Marketing** | Focus on high-CLV segments for acquisition" >> BONUS_METRIC.md
echo "| **Operations** | Prioritize service quality for valuable customers" >> BONUS_METRIC.md
echo "| **Finance** | Better revenue forecasting and valuation" >> BONUS_METRIC.md
echo "| **Product** | Design loyalty programs for high-CLV customers" >> BONUS_METRIC.md
echo "" >> BONUS_METRIC.md
echo "## Time to Implement" >> BONUS_METRIC.md
echo "- **Data prep**: 1-2 hours" >> BONUS_METRIC.md
echo "- **Calculation logic**: 1 hour" >> BONUS_METRIC.md
echo "- **UI integration**: 1 hour" >> BONUS_METRIC.md
echo "- **Testing**: 30 minutes" >> BONUS_METRIC.md
echo "- **Total**: ~4-5 hours" >> BONUS_METRIC.md

