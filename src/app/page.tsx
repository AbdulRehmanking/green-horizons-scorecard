"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { 
  LayoutDashboard, 
  Code2, 
  Bot,
  TrendingUp, 
  Calendar, 
  ArrowRight,
  Sparkles,
  Database,
  Users,
  DollarSign
} from "lucide-react";

export default function Home() {
  const [isLive, setIsLive] = useState(false);

  useEffect(() => {
    fetch("/api/metrics")
      .then(res => res.ok ? setIsLive(true) : setIsLive(false))
      .catch(() => setIsLive(false));
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-emerald-50/30">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-md border-b border-gray-200/50 sticky top-0 z-20">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-green-500 to-emerald-600 flex items-center justify-center shadow-lg shadow-green-500/25">
              <span className="text-white text-lg font-bold">G</span>
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-900">Green Horizons</h1>
              <p className="text-xs text-gray-500">Weekly Scorecard • Mar 2 – Jul 5, 2026</p>
            </div>
          </div>
          <div className="flex items-center gap-2 bg-green-50 px-3 py-1.5 rounded-full">
            <span className={`inline-block w-2 h-2 rounded-full ${isLive ? 'bg-green-500 animate-pulse' : 'bg-red-500'}`}></span>
            <span className="text-xs font-medium text-green-700">{isLive ? 'Live' : 'Loading...'}</span>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <main className="max-w-5xl mx-auto px-6 py-16">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-green-50 text-green-700 px-4 py-1.5 rounded-full text-sm font-medium mb-4">
            <Sparkles className="w-4 h-4" />
            <span>Production Ready Dashboard</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Weekly Scorecard
          </h1>
          <p className="text-lg text-gray-500 max-w-2xl mx-auto">
            Track revenue, signups, cancellation rates, and crew performance across 18 weeks of operational data.
          </p>
        </div>

        {/* Stats Row */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
          <StatCard icon={<Calendar className="w-4 h-4" />} label="Season" value="18 Weeks" sub="Mar 2 – Jul 5" />
          <StatCard icon={<TrendingUp className="w-4 h-4" />} label="Metrics" value="5" sub="Revenue, Signups, etc." />
          <StatCard icon={<Users className="w-4 h-4" />} label="Data Sources" value="7 CSVs" sub="Operational data" />
          <StatCard icon={<Database className="w-4 h-4" />} label="Status" value={isLive ? "Online" : "Loading"} sub={isLive ? "API Connected" : "Connecting..."} />
        </div>

        {/* 3 Cards Grid */}
        <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
          {/* Card 1: Dashboard / Scorecard */}
          <Link href="/dashboard" className="group">
            <div className="relative overflow-hidden bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-500 p-6 border border-gray-100 group-hover:border-green-200 h-full">
              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-green-50 to-emerald-50 rounded-full -translate-y-16 translate-x-16 group-hover:scale-150 transition-transform duration-500"></div>
              <div className="relative">
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-green-500 to-emerald-600 flex items-center justify-center shadow-lg shadow-green-500/25 mb-4 group-hover:scale-110 transition-transform duration-300">
                  <LayoutDashboard className="w-7 h-7 text-white" />
                </div>
                <h2 className="text-xl font-bold text-gray-900 group-hover:text-green-600 transition-colors">
                  Scorecard
                </h2>
                <p className="text-gray-500 text-sm mt-1">
                  View all 5 metrics with interactive charts and detailed tables
                </p>
                <div className="mt-4 flex items-center gap-2 text-green-600 font-medium text-sm group-hover:gap-3 transition-all">
                  <span>Open Scorecard</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </div>
          </Link>

          {/* Card 2: API Endpoint */}
          <Link href="/api-page" className="group">
            <div className="relative overflow-hidden bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-500 p-6 border border-gray-100 group-hover:border-blue-200 h-full">
              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-full -translate-y-16 translate-x-16 group-hover:scale-150 transition-transform duration-500"></div>
              <div className="relative">
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center shadow-lg shadow-blue-500/25 mb-4 group-hover:scale-110 transition-transform duration-300">
                  <Code2 className="w-7 h-7 text-white" />
                </div>
                <h2 className="text-xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors">
                  API Endpoint
                </h2>
                <p className="text-gray-500 text-sm mt-1">
                  Access the same data via REST API with date filtering
                </p>
                <div className="mt-4 flex items-center gap-2 text-blue-600 font-medium text-sm group-hover:gap-3 transition-all">
                  <span>View API</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </div>
          </Link>

          {/* Card 3: MCP Tool */}
          <Link href="/mcp-page" className="group">
            <div className="relative overflow-hidden bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-500 p-6 border border-gray-100 group-hover:border-purple-200 h-full">
              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-purple-50 to-pink-50 rounded-full -translate-y-16 translate-x-16 group-hover:scale-150 transition-transform duration-500"></div>
              <div className="relative">
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-purple-500 to-pink-600 flex items-center justify-center shadow-lg shadow-purple-500/25 mb-4 group-hover:scale-110 transition-transform duration-300">
                  <Bot className="w-7 h-7 text-white" />
                </div>
                <h2 className="text-xl font-bold text-gray-900 group-hover:text-purple-600 transition-colors">
                  MCP Tool
                </h2>
                <p className="text-gray-500 text-sm mt-1">
                  AI-powered tool with get_weekly_scorecard for LLM integration
                </p>
                <div className="mt-4 flex items-center gap-2 text-purple-600 font-medium text-sm group-hover:gap-3 transition-all">
                  <span>View MCP</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </div>
          </Link>
        </div>

        {/* Footer */}
        <footer className="mt-16 text-center text-sm text-gray-400 border-t border-gray-100 pt-6">
          <p>© 2026 Green Horizons — Built with Next.js • TypeScript • Tailwind</p>
        </footer>
      </main>
    </div>
  );
}

// Stat Card Component
function StatCard({ icon, label, value, sub }: { icon: React.ReactNode; label: string; value: string; sub: string }) {
  return (
    <div className="bg-white/50 backdrop-blur-sm rounded-xl border border-gray-100 p-4 text-center hover:bg-white transition-colors">
      <div className="flex items-center justify-center gap-2 text-gray-400 text-xs uppercase tracking-wider mb-1">
        {icon}
        <span>{label}</span>
      </div>
      <div className="text-lg font-bold text-gray-900">{value}</div>
      <div className="text-xs text-gray-400">{sub}</div>
    </div>
  );
}