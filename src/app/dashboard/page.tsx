"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  BarChart, Bar
} from "recharts";

type WeekData = {
  weekStart: string;
  revenue: number;
  signups: number;
  cancellationRate: number;
  revenuePerCrewDay: number;
  activeStaff: number;
};

export default function Dashboard() {
  const [data, setData] = useState<WeekData[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/metrics")
      .then(r => r.json())
      .then(d => { setData(d); setLoading(false); });
  }, []);

  if (loading) return <div className="p-8 text-gray-500">Loading scorecard…</div>;

  const totalRevenue = data.reduce((sum, row) => sum + row.revenue, 0);
  const totalSignups = data.reduce((sum, row) => sum + row.signups, 0);
  const avgCancellation = data.reduce((sum, row) => sum + row.cancellationRate, 0) / data.length;
  const avgRevenuePerCrew = data.reduce((sum, row) => sum + row.revenuePerCrewDay, 0) / data.length;
  const peakStaff = Math.max(...data.map(row => row.activeStaff));

  const formatMoney = (n: number) => `$${n.toLocaleString(undefined, { maximumFractionDigits: 0 })}`;

  // Color function for revenue cells
  const getRevenueColor = (value: number) => {
    const max = Math.max(...data.map(r => r.revenue));
    const ratio = value / max;
    if (ratio > 0.7) return 'bg-green-100 text-green-800';
    if (ratio > 0.4) return 'bg-yellow-50 text-yellow-800';
    return 'bg-gray-50 text-gray-600';
  };

  // Color function for cancellation rate
  const getCancellationColor = (value: number) => {
    if (value > 0.08) return 'bg-red-100 text-red-800';
    if (value > 0.05) return 'bg-orange-100 text-orange-800';
    return 'bg-green-50 text-green-800';
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header with Back Button */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Green Horizons</h1>
            <p className="text-sm text-gray-500">Weekly Scorecard • March 2 – July 5, 2026</p>
          </div>
          <Link href="/" className="text-sm text-green-600 hover:text-green-800 flex items-center gap-1">
            ← Back to Home
          </Link>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-8">
        {/* KPI Cards */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-8">
          <KpiCard label="Total Revenue" value={formatMoney(totalRevenue)} color="green" />
          <KpiCard label="Total Signups" value={totalSignups.toString()} color="blue" />
          <KpiCard label="Avg Cancellation" value={`${(avgCancellation * 100).toFixed(1)}%`} color="red" />
          <KpiCard label="Avg Revenue / Crew Day" value={formatMoney(avgRevenuePerCrew)} color="purple" />
          <KpiCard label="Peak Active Staff" value={peakStaff.toString()} color="orange" />
        </div>

        {/* Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <ChartCard title="Weekly Revenue" color="#16a34a">
            <LineChart data={data}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="weekStart" fontSize={11} />
              <YAxis fontSize={11} />
              <Tooltip formatter={(v: any) => formatMoney(v)} />
              <Line type="monotone" dataKey="revenue" stroke="#16a34a" strokeWidth={2.5} />
            </LineChart>
          </ChartCard>

          <ChartCard title="Signups Per Week" color="#2563eb">
            <BarChart data={data}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="weekStart" fontSize={11} />
              <YAxis fontSize={11} />
              <Tooltip />
              <Bar dataKey="signups" fill="#2563eb" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ChartCard>

          <ChartCard title="Cancellation Rate" color="#dc2626">
            <LineChart data={data}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="weekStart" fontSize={11} />
              <YAxis fontSize={11} tickFormatter={(v: any) => `${(v * 100).toFixed(0)}%`} />
              <Tooltip formatter={(v: any) => `${(v * 100).toFixed(1)}%`} />
              <Line type="monotone" dataKey="cancellationRate" stroke="#dc2626" strokeWidth={2.5} />
            </LineChart>
          </ChartCard>

          <ChartCard title="Revenue Per Crew Day" color="#9333ea">
            <LineChart data={data}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="weekStart" fontSize={11} />
              <YAxis fontSize={11} />
              <Tooltip formatter={(v: any) => formatMoney(v)} />
              <Line type="monotone" dataKey="revenuePerCrewDay" stroke="#9333ea" strokeWidth={2.5} />
            </LineChart>
          </ChartCard>

          <ChartCard title="Active Field Staff" color="#ea580c" span={2}>
            <LineChart data={data}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="weekStart" fontSize={11} />
              <YAxis fontSize={11} />
              <Tooltip />
              <Line type="monotone" dataKey="activeStaff" stroke="#ea580c" strokeWidth={2.5} />
            </LineChart>
          </ChartCard>
        </div>

        {/* SCROLLABLE TABLE with Colors */}
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
            <h2 className="text-lg font-semibold text-gray-900">Weekly Details</h2>
            <span className="text-sm text-gray-500">{data.length} weeks</span>
          </div>
          
          {/* Fixed height with scroll */}
          <div className="max-h-96 overflow-y-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50 sticky top-0 z-10">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Week</th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Revenue</th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Signups</th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Cancellation %</th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Revenue / Crew Day</th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Active Staff</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {data.map((row, i) => (
                  <tr key={i} className={i % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{row.weekStart}</td>
                    <td className={`px-6 py-4 whitespace-nowrap text-sm text-right font-medium rounded-md ${getRevenueColor(row.revenue)}`}>
                      {formatMoney(row.revenue)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 text-right">{row.signups}</td>
                    <td className={`px-6 py-4 whitespace-nowrap text-sm text-right font-medium rounded-md ${getCancellationColor(row.cancellationRate)}`}>
                      {(row.cancellationRate * 100).toFixed(1)}%
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 text-right">{formatMoney(row.revenuePerCrewDay)}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 text-right">
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                        {row.activeStaff}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  );
}

// Components
function KpiCard({ label, value, color }: { label: string; value: string; color: string }) {
  const colors: Record<string, string> = {
    green: 'bg-green-50 border-green-200 text-green-600',
    blue: 'bg-blue-50 border-blue-200 text-blue-600',
    red: 'bg-red-50 border-red-200 text-red-600',
    purple: 'bg-purple-50 border-purple-200 text-purple-600',
    orange: 'bg-orange-50 border-orange-200 text-orange-600',
  };
  return (
    <div className={`${colors[color] || colors.green} border rounded-lg p-4`}>
      <div className="text-xs text-gray-600 mb-1">{label}</div>
      <div className="text-2xl font-bold">{value}</div>
    </div>
  );
}

function ChartCard({ title, children, color, span = 1 }: { title: string; children: React.ReactElement; color: string; span?: number }) {
  return (
    <div className={`bg-white rounded-lg shadow p-4 ${span === 2 ? 'lg:col-span-2' : ''}`}>
      <h3 className="text-sm font-medium text-gray-700 mb-3 flex items-center">
        <span className="w-2 h-2 rounded-full mr-2" style={{ backgroundColor: color }}></span>
        {title}
      </h3>
      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          {children}
        </ResponsiveContainer>
      </div>
    </div>
  );
}