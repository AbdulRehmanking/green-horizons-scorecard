"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

export default function Home() {
  const [isLive, setIsLive] = useState(false);

  useEffect(() => {
    // Check if API is live
    fetch("/api/metrics")
      .then(res => res.ok ? setIsLive(true) : setIsLive(false))
      .catch(() => setIsLive(false));
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-emerald-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm border-b border-gray-200 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="text-2xl">🌿</span>
              <span className="text-xl font-bold text-gray-800">Green Horizons</span>
            </div>
            <div className="flex items-center gap-2">
              <span className={`inline-block w-2 h-2 rounded-full ${isLive ? 'bg-green-500 animate-pulse' : 'bg-red-500'}`}></span>
              <span className="text-sm text-gray-500">{isLive ? 'Live' : 'Loading...'}</span>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <main className="max-w-4xl mx-auto px-4 py-16 md:py-24">
        <div className="text-center">
          {/* Logo / Icon */}
          <div className="flex justify-center mb-6">
            <div className="w-20 h-20 bg-green-100 rounded-2xl flex items-center justify-center">
              <span className="text-4xl">🌿</span>
            </div>
          </div>

          {/* Title */}
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Weekly Scorecard
          </h1>
          <p className="text-xl text-gray-500 mb-2">
            March 2 – July 5, 2026
          </p>
          <p className="text-md text-gray-400 mb-12 max-w-lg mx-auto">
            Track revenue, signups, cancellation rates, and crew performance across 18 weeks.
          </p>

          {/* Cards Grid */}
          <div className="grid md:grid-cols-2 gap-6 max-w-2xl mx-auto">
            {/* Dashboard Card */}
            <Link href="/dashboard" className="group">
              <div className="bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-300 p-8 border border-gray-100 hover:border-green-200">
                <div className="flex flex-col items-center">
                  <div className="w-14 h-14 bg-green-50 rounded-full flex items-center justify-center mb-4 group-hover:bg-green-100 transition-colors">
                    <svg className="w-7 h-7 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                    </svg>
                  </div>
                  <h2 className="text-xl font-semibold text-gray-800 group-hover:text-green-600 transition-colors">
                    Dashboard
                  </h2>
                  <p className="text-sm text-gray-400 mt-1">
                    View all 5 metrics with charts and tables
                  </p>
                  <span className="mt-4 text-sm font-medium text-green-600 group-hover:text-green-700">
                    Open Dashboard →
                  </span>
                </div>
              </div>
            </Link>

            {/* API Card */}
            <Link href="/api-page" className="group">
  <div className="bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-300 p-8 border border-gray-100 hover:border-blue-200">
    <div className="flex flex-col items-center">
      <div className="w-14 h-14 bg-blue-50 rounded-full flex items-center justify-center mb-4 group-hover:bg-blue-100 transition-colors">
        <svg className="w-7 h-7 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
      </div>
      <h2 className="text-xl font-semibold text-gray-800 group-hover:text-blue-600 transition-colors">
        API Endpoint
      </h2>
      <p className="text-sm text-gray-400 mt-1">
        View 18 weeks of JSON data
      </p>
      <span className="mt-4 text-sm font-medium text-blue-600 group-hover:text-blue-700">
        View JSON →
      </span>
    </div>
  </div>
</Link>
          </div>

          {/* Status Bar */}
          <div className="mt-12 flex items-center justify-center gap-6 text-sm text-gray-400">
            <span className="flex items-center gap-1">
              <span className="w-1.5 h-1.5 bg-green-500 rounded-full"></span>
              {isLive ? 'API Online' : 'Checking...'}
            </span>
            <span>•</span>
            <span>18 Weeks</span>
            <span>•</span>
            <span>5 Metrics</span>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-gray-200 bg-white/50 backdrop-blur-sm mt-16">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center text-sm text-gray-400">
            <span>© 2026 Green Horizons — Weekly Scorecard</span>
            <div className="flex gap-6 mt-2 md:mt-0">
              <a href="https://github.com/AbdulRehmanking/green-horizons-scorecard" target="_blank" rel="noopener noreferrer" className="hover:text-gray-600 transition-colors">
                GitHub
              </a>
              <span>•</span>
              <span>Built with Next.js</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}