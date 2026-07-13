import { getWeeklyScorecard } from "../src/domain/services/scorecardService";

console.log("🧪 Running Scorecard Tests...\n");

const tests = [
  {
    name: "Returns 18 weeks by default",
    run: () => {
      const result = getWeeklyScorecard();
      return result.length === 18 && result[0].weekStart === '2026-03-02';
    }
  },
  {
    name: "Filters by start date",
    run: () => {
      const result = getWeeklyScorecard('2026-04-01');
      return result[0].weekStart === '2026-04-06';
    }
  },
  {
    name: "Filters by end date",
    run: () => {
      const result = getWeeklyScorecard(undefined, '2026-04-01');
      return result[result.length - 1].weekStart === '2026-03-30';
    }
  },
  {
    name: "Filters by date range",
    run: () => {
      const result = getWeeklyScorecard('2026-03-16', '2026-04-12');
      return result[0].weekStart === '2026-03-16' && 
             result[result.length - 1].weekStart === '2026-04-06';
    }
  },
  {
    name: "Empty array for no data",
    run: () => {
      const result = getWeeklyScorecard('2025-01-01', '2025-01-31');
      return result.length === 0;
    }
  },
  {
    name: "All rows have required fields",
    run: () => {
      const result = getWeeklyScorecard();
      return result.every(row => 
        row.weekStart && 
        typeof row.revenue === 'number' &&
        typeof row.signups === 'number' &&
        typeof row.cancellationRate === 'number' &&
        typeof row.revenuePerCrewDay === 'number' &&
        typeof row.activeStaff === 'number'
      );
    }
  }
];

let passed = 0;
let failed = 0;

tests.forEach((test, index) => {
  try {
    const result = test.run();
    if (result) {
      console.log(`✅ Test ${index + 1}: ${test.name}`);
      passed++;
    } else {
      console.log(`❌ Test ${index + 1}: ${test.name} - Failed`);
      failed++;
    }
  } catch (e) {
    console.log(`❌ Test ${index + 1}: ${test.name} - Error:`, e);
    failed++;
  }
});

console.log(`\n📊 Results: ${passed} passed, ${failed} failed, ${tests.length} total`);