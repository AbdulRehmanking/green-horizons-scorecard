"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { 
  ArrowLeft, 
  Code2, 
  Copy, 
  Check, 
  ExternalLink,
  Calendar,
  Filter,
  RefreshCw
} from "lucide-react";

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
  const [copied, setCopied] = useState(false);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [filteredData, setFilteredData] = useState<WeekData[] | null>(null);
  const [error, setError] = useState<string | null>(null);

  const fetchData = async (start?: string, end?: string) => {
    setLoading(true);
    setError(null);
    try {
      let url = "/api/scorecard";
      const params = new URLSearchParams();
      if (start) params.append("start", start);
      if (end) params.append("end", end);
      if (params.toString()) url += `?${params.toString()}`;

      const res = await fetch(url);
      const result = await res.json();

      if (!res.ok) {
        setError(result.error || "Failed to fetch data");
        setFilteredData(null);
      } else {
        setData(result.data);
        setFilteredData(result.data);
      }
    } catch (err) {
      setError("Network error: " + (err instanceof Error ? err.message : "Unknown error"));
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleApplyFilter = () => {
    fetchData(startDate || undefined, endDate || undefined);
  };

  const handleReset = () => {
    setStartDate("");
    setEndDate("");
    fetchData();
  };

  const handleCopy = () => {
    if (filteredData) {
      navigator.clipboard.writeText(JSON.stringify(filteredData, null, 2));
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const formatMoney = (n: number) => `$${n.toLocaleString(undefined, { maximumFractionDigits: 0 })}`;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50/30">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-md border-b border-gray-200/50 sticky top-0 z-20">
        <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center shadow-lg shadow-blue-500/25">
              <Code2 className="w-5 h-5 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-900">API Endpoint</h1>
              <p className="text-xs text-gray-500">GET /api/scorecard • JSON Response</p>
            </div>
          </div>
          <Link 
            href="/" 
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-gray-100 hover:bg-gray-200 transition-colors text-sm font-medium text-gray-700"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Home
          </Link>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-6 py-8">
        {/* Filter Section */}
        <div className="bg-white/70 backdrop-blur-sm rounded-2xl shadow-sm border border-gray-100 p-6 mb-6">
          <div className="flex items-center gap-2 mb-4">
            <Filter className="w-4 h-4 text-gray-500" />
            <h3 className="text-sm font-semibold text-gray-700">Filter by Date Range</h3>
          </div>
          <div className="flex flex-wrap items-end gap-4">
            <div>
              <label className="text-xs font-medium text-gray-500 block mb-1">Start Date</label>
              <input 
                type="date" 
                value={startDate} 
                onChange={(e) => setStartDate(e.target.value)}
                className="px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white"
              />
            </div>
            <div>
              <label className="text-xs font-medium text-gray-500 block mb-1">End Date</label>
              <input 
                type="date" 
                value={endDate} 
                onChange={(e) => setEndDate(e.target.value)}
                className="px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white"
              />
            </div>
            <button 
              onClick={handleApplyFilter}
              className="px-4 py-2 bg-blue-500 text-white rounded-lg text-sm font-medium hover:bg-blue-600 transition-colors"
            >
              Apply Filter
            </button>
            <button 
              onClick={handleReset}
              className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg text-sm font-medium hover:bg-gray-200 transition-colors"
            >
              Reset
            </button>
          </div>
        </div>

        {/* Stats */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 text-sm text-gray-500">
              <span className={`inline-block w-2 h-2 rounded-full ${error ? 'bg-red-500' : loading ? 'bg-yellow-500' : 'bg-green-500'}`}></span>
              {loading ? "Loading..." : error ? "Error" : `${filteredData?.length || 0} weeks`}
            </div>
            {filteredData && (
              <div className="flex items-center gap-4 text-xs text-gray-400">
                <span>📊 {filteredData.length} rows</span>
                <span>💰 {formatMoney(filteredData.reduce((s, r) => s + r.revenue, 0))}</span>
                <span>👥 {filteredData.reduce((s, r) => s + r.signups, 0)} signups</span>
              </div>
            )}
          </div>
          <div className="flex gap-2">
            <button 
              onClick={handleCopy}
              className="flex items-center gap-2 px-4 py-2 bg-gray-100 rounded-lg text-sm font-medium hover:bg-gray-200 transition-colors text-gray-700"
            >
              {copied ? <Check className="w-4 h-4 text-green-500" /> : <Copy className="w-4 h-4" />}
              {copied ? "Copied!" : "Copy JSON"}
            </button>
            <button 
              onClick={() => window.open("/api/scorecard", "_blank")}
              className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-lg text-sm font-medium hover:bg-blue-600 transition-colors"
            >
              <ExternalLink className="w-4 h-4" />
              Open Raw
            </button>
          </div>
        </div>

        {/* JSON Viewer */}
        <div className="bg-white/70 backdrop-blur-sm rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="px-6 py-3 border-b border-gray-100 flex justify-between items-center bg-gray-50/50">
            <div className="flex items-center gap-2">
              <Code2 className="w-4 h-4 text-gray-400" />
              <span className="text-xs font-mono text-gray-500">Response</span>
            </div>
            <span className="text-xs text-gray-400">application/json</span>
          </div>
          <div className="p-6 overflow-auto max-h-[500px]">
            {loading ? (
              <div className="flex items-center justify-center py-12">
                <div className="inline-block animate-spin rounded-full h-8 w-8 border-3 border-blue-500 border-t-transparent"></div>
                <span className="ml-3 text-gray-500">Loading data...</span>
              </div>
            ) : error ? (
              <div className="text-red-500 p-4 bg-red-50 rounded-lg border border-red-200">
                <p className="font-medium">Error</p>
                <p className="text-sm">{error}</p>
              </div>
            ) : filteredData ? (
              <pre className="text-sm font-mono text-gray-800 whitespace-pre-wrap break-all">
                {JSON.stringify(filteredData, null, 2)}
              </pre>
            ) : (
              <div className="text-gray-400 text-center py-8">No data available</div>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="mt-6 text-center text-sm text-gray-400">
          <p>API Endpoint: /api/scorecard • 18-week season: Mar 2 – Jul 5, 2026</p>
        </div>
      </main>
    </div>
  );
}