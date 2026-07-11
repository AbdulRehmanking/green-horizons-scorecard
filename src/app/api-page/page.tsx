"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

type WeekData = {
  weekStart: string;
  revenue: number;
  signups: number;
  cancellationRate: number;
  revenuePerCrewDay: number;
  activeStaff: number;
};

export default function APIPage() {
  const [data, setData] = useState<WeekData[] | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/metrics")
      .then(r => r.json())
      .then(d => {
        setData(d);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header with Back Button */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">API Endpoint</h1>
            <p className="text-sm text-gray-500">Raw JSON data from /api/metrics</p>
          </div>
          <Link href="/" className="text-sm text-blue-600 hover:text-blue-800 flex items-center gap-1">
            ← Back to Home
          </Link>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-8">
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
            <h2 className="text-lg font-semibold text-gray-900">JSON Response</h2>
            <span className="text-sm text-gray-500">
              {loading ? 'Loading...' : data ? `${data.length} weeks` : 'No data'}
            </span>
          </div>
          
          <div className="p-6 overflow-auto max-h-[600px]">
            {loading ? (
              <div className="text-gray-500">Loading data...</div>
            ) : data ? (
              <pre className="text-sm text-gray-800 whitespace-pre-wrap">
                {JSON.stringify(data, null, 2)}
              </pre>
            ) : (
              <div className="text-red-500">Error loading data</div>
            )}
          </div>
        </div>

        {/* Back Button at Bottom */}
        <div className="mt-6 text-center">
          <Link href="/" className="text-green-600 hover:text-green-800">
            ← Back to Home
          </Link>
        </div>
      </main>
    </div>
  );
}