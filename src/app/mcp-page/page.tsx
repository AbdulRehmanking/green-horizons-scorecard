"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { 
  ArrowLeft, 
  Bot, 
  Copy, 
  Check, 
  Terminal,
  Play,
  Calendar,
  RefreshCw,
  Server,
  CheckCircle2,
  AlertCircle
} from "lucide-react";

export default function MCPPage() {
  const [copied, setCopied] = useState(false);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [result, setResult] = useState<any[] | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [serverStatus, setServerStatus] = useState<"checking" | "online" | "offline">("checking");

  // Check server status on load
  useEffect(() => {
    const checkServer = async () => {
      try {
        const res = await fetch("/api/scorecard");
        if (res.ok) {
          setServerStatus("online");
        } else {
          setServerStatus("offline");
        }
      } catch {
        setServerStatus("offline");
      }
    };
    checkServer();
  }, []);

  const handleRunMCP = async () => {
    setLoading(true);
    setError(null);
    setResult(null);

    try {
      let url = "/api/scorecard";
      const params = new URLSearchParams();
      if (startDate) params.append("start", startDate);
      if (endDate) params.append("end", endDate);
      if (params.toString()) url += `?${params.toString()}`;

      const res = await fetch(url);
      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Failed to fetch data");
      } else {
        setResult(data.data || []);
      }
    } catch (err) {
      setError("Network error: " + (err instanceof Error ? err.message : "Unknown error"));
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = () => {
    if (result) {
      navigator.clipboard.writeText(JSON.stringify(result, null, 2));
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const formatMoney = (n: number) => `$${n.toLocaleString(undefined, { maximumFractionDigits: 0 })}`;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-purple-50/30">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-md border-b border-gray-200/50 sticky top-0 z-20">
        <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-500 to-pink-600 flex items-center justify-center shadow-lg shadow-purple-500/25">
              <Bot className="w-5 h-5 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-900">MCP Tool</h1>
              <p className="text-xs text-gray-500">get_weekly_scorecard • AI Integration</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2">
              {serverStatus === "checking" && (
                <span className="text-xs text-gray-400">Checking...</span>
              )}
              {serverStatus === "online" && (
                <span className="flex items-center gap-1 text-xs text-green-600">
                  <CheckCircle2 className="w-3 h-3" />
                  API Online
                </span>
              )}
              {serverStatus === "offline" && (
                <span className="flex items-center gap-1 text-xs text-red-600">
                  <AlertCircle className="w-3 h-3" />
                  API Offline
                </span>
              )}
            </div>
            <Link 
              href="/" 
              className="flex items-center gap-2 px-4 py-2 rounded-xl bg-gray-100 hover:bg-gray-200 transition-colors text-sm font-medium text-gray-700"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Home
            </Link>
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-6 py-8">
        {/* Info Section */}
        <div className="bg-white/70 backdrop-blur-sm rounded-2xl shadow-sm border border-gray-100 p-6 mb-6">
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-purple-100 flex items-center justify-center">
                <Terminal className="w-5 h-5 text-purple-600" />
              </div>
              <div>
                <h3 className="text-sm font-semibold text-gray-700">MCP Tool: get_weekly_scorecard</h3>
                <p className="text-xs text-gray-400">Model Context Protocol • stdio transport • Deployed on Vercel</p>
              </div>
            </div>
            <div className="flex items-center gap-2 bg-green-50 px-3 py-1.5 rounded-full">
              <span className="inline-block w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
              <span className="text-xs font-medium text-green-700">Live Data</span>
            </div>
          </div>
          <div className="mt-3 bg-gray-50 rounded-lg p-3 font-mono text-xs text-gray-600 overflow-x-auto flex items-center gap-4">
            <span className="text-purple-600">npm</span> run mcp
            <span className="text-gray-400"># Starts MCP server locally</span>
            <span className="text-gray-300">|</span>
            <span className="text-blue-600">GET</span>
            <span className="text-gray-600">/api/scorecard</span>
            <span className="text-gray-400"># Deployed API endpoint</span>
          </div>
        </div>

        {/* Controls */}
        <div className="bg-white/70 backdrop-blur-sm rounded-2xl shadow-sm border border-gray-100 p-6 mb-6">
          <div className="flex items-center gap-2 mb-4">
            <Calendar className="w-4 h-4 text-gray-500" />
            <h3 className="text-sm font-semibold text-gray-700">Filter by Date Range</h3>
          </div>
          <div className="flex flex-wrap items-end gap-4">
            <div>
              <label className="text-xs font-medium text-gray-500 block mb-1">Start Date</label>
              <input 
                type="date" 
                value={startDate} 
                onChange={(e) => setStartDate(e.target.value)}
                className="px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-white"
                placeholder="2026-03-02"
              />
            </div>
            <div>
              <label className="text-xs font-medium text-gray-500 block mb-1">End Date</label>
              <input 
                type="date" 
                value={endDate} 
                onChange={(e) => setEndDate(e.target.value)}
                className="px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-white"
                placeholder="2026-07-05"
              />
            </div>
            <button 
              onClick={handleRunMCP}
              disabled={loading}
              className="flex items-center gap-2 px-5 py-2 bg-purple-500 text-white rounded-lg text-sm font-medium hover:bg-purple-600 transition-colors disabled:opacity-50"
            >
              {loading ? <RefreshCw className="w-4 h-4 animate-spin" /> : <Play className="w-4 h-4" />}
              {loading ? "Running..." : "Run Tool"}
            </button>
            <button 
              onClick={() => {
                setStartDate("");
                setEndDate("");
                handleRunMCP();
              }}
              className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg text-sm font-medium hover:bg-gray-200 transition-colors"
            >
              Reset
            </button>
          </div>
        </div>

        {/* Result */}
        <div className="bg-white/70 backdrop-blur-sm rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="px-6 py-3 border-b border-gray-100 flex justify-between items-center bg-gray-50/50">
            <div className="flex items-center gap-2">
              <Bot className="w-4 h-4 text-gray-400" />
              <span className="text-xs font-mono text-gray-500">MCP Response</span>
              {result && (
                <span className="text-xs text-gray-400">• {result.length} weeks</span>
              )}
            </div>
            <div className="flex items-center gap-3">
              {result && (
                <span className="text-xs text-gray-400">
                  💰 {formatMoney(result.reduce((s, r) => s + r.revenue, 0))}
                  &nbsp;•&nbsp; 👥 {result.reduce((s, r) => s + r.signups, 0)}
                </span>
              )}
              {result && (
                <button 
                  onClick={handleCopy}
                  className="flex items-center gap-2 text-xs text-gray-500 hover:text-gray-700"
                >
                  {copied ? <Check className="w-3 h-3 text-green-500" /> : <Copy className="w-3 h-3" />}
                  {copied ? "Copied!" : "Copy"}
                </button>
              )}
            </div>
          </div>
          <div className="p-6 overflow-auto max-h-[450px]">
            {loading ? (
              <div className="flex items-center justify-center py-12">
                <div className="inline-block animate-spin rounded-full h-8 w-8 border-3 border-purple-500 border-t-transparent"></div>
                <span className="ml-3 text-gray-500">Calling MCP tool...</span>
              </div>
            ) : error ? (
              <div className="text-red-500 p-4 bg-red-50 rounded-lg border border-red-200">
                <p className="font-medium">Error</p>
                <p className="text-sm">{error}</p>
              </div>
            ) : result && result.length > 0 ? (
              <pre className="text-sm font-mono text-gray-800 whitespace-pre-wrap break-all">
                {JSON.stringify(result, null, 2)}
              </pre>
            ) : result && result.length === 0 ? (
              <div className="text-gray-400 text-center py-8">
                <Calendar className="w-12 h-12 mx-auto mb-3 opacity-30" />
                <p>No data found for the selected date range</p>
              </div>
            ) : (
              <div className="text-gray-400 text-center py-8">
                <Bot className="w-12 h-12 mx-auto mb-3 opacity-30" />
                <p>Click "Run Tool" to fetch live data from the API</p>
                <p className="text-xs mt-1">The tool calls <code className="bg-gray-100 px-1 py-0.5 rounded">/api/scorecard</code></p>
              </div>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="mt-6 text-center text-sm text-gray-400">
          <p>Data source: <a href="/api/scorecard" className="text-purple-600 hover:underline">/api/scorecard</a> • 18-week season: Mar 2 – Jul 5, 2026</p>
        </div>
      </main>
    </div>
  );
}