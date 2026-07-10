"use client";

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
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch("/api/metrics")
      .then(res => {
        if (!res.ok) throw new Error("Failed to fetch data");
        return res.json();
      })
      .then(d => {
        setData(d);
        setLoading(false);
      })
      .catch(err => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading scorecard...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center text-red-600">
          <p className="text-xl font-semibold">Error loading data</p>
          <p className="text-sm">{error}</p>
        </div>
      </div>
    );
  }

  // Calculate totals
  const totalRevenue = data.reduce((sum, row) => sum + row.revenue, 0);
  const totalSignups = data.reduce((sum, row) => sum + row.signups, 0);
  const avgCancellation = data.reduce((sum, row) => sum + row.cancellationRate, 0) / data.length;
  const avgRevenuePerCrew = data.reduce((sum, row) => sum + row.revenuePerCrewDay, 0) / data.length;
  const peakStaff = Math.max(...data.map(row => row.activeStaff));

  const formatMoney = (n: number): string => 
    `$${n.toLocaleString(undefined, { maximumFractionDigits: 0 })}`;

  const formatWeek = (dateStr: string): string => {
    const d = new Date(dateStr);
    return `${d.getMonth() + 1}/${d.getDate()}`;
  };

  // Safe formatters for Recharts - using 'any' to handle all value types
  const moneyFormatter = (value: any): string => {
    const num = typeof value === 'number' ? value : Number(value);
    return isNaN(num) ? '$0' : formatMoney(num);
  };

  const percentFormatter = (value: any): string => {
    const num = typeof value === 'number' ? value : Number(value);
    return isNaN(num) ? '0%' : `${(num * 100).toFixed(1)}%`;
  };

  const numberFormatter = (value: any): string => {
    const num = typeof value === 'number' ? value : Number(value);
    return isNaN(num) ? '0' : num.toString();
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Green Horizons</h1>
              <p className="text-sm text-gray-500">Weekly Scorecard • March 2 – July 5, 2026</p>
            </div>
            <div className="text-right">
              <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800">
                ● Live Data
              </span>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* KPI Cards */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 mb-8">
          <KpiCard 
            label="Total Revenue" 
            value={formatMoney(totalRevenue)} 
            sub={`Last week: ${formatMoney(data[data.length - 1]?.revenue || 0)}`}
            color="green"
          />
          <KpiCard 
            label="Total Signups" 
            value={totalSignups.toString()} 
            sub={`Last week: ${data[data.length - 1]?.signups || 0}`}
            color="blue"
          />
          <KpiCard 
            label="Avg Cancellation" 
            value={`${(avgCancellation * 100).toFixed(1)}%`} 
            sub={`Last week: ${((data[data.length - 1]?.cancellationRate || 0) * 100).toFixed(1)}%`}
            color="red"
          />
          <KpiCard 
            label="Avg Revenue / Crew Day" 
            value={formatMoney(avgRevenuePerCrew)} 
            sub={`Last week: ${formatMoney(data[data.length - 1]?.revenuePerCrewDay || 0)}`}
            color="purple"
          />
          <KpiCard 
            label="Peak Active Staff" 
            value={peakStaff.toString()} 
            sub={`Last week: ${data[data.length - 1]?.activeStaff || 0}`}
            color="orange"
          />
        </div>

        {/* Charts Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <ChartCard title="Weekly Revenue" color="#16a34a">
            <LineChart data={data}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="weekStart" tickFormatter={formatWeek} fontSize={11} />
              <YAxis fontSize={11} tickFormatter={(v: any) => `$${Number(v)/1000}k`} />
              <Tooltip 
                formatter={moneyFormatter}
                labelFormatter={(label: any) => `Week of ${label}`}
              />
              <Line type="monotone" dataKey="revenue" stroke="#16a34a" strokeWidth={2.5} dot={{ r: 3 }} />
            </LineChart>
          </ChartCard>

          <ChartCard title="Signups Per Week" color="#2563eb">
            <BarChart data={data}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="weekStart" tickFormatter={formatWeek} fontSize={11} />
              <YAxis fontSize={11} />
              <Tooltip 
                formatter={numberFormatter}
                labelFormatter={(label: any) => `Week of ${label}`}
              />
              <Bar dataKey="signups" fill="#2563eb" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ChartCard>

          <ChartCard title="Cancellation Rate" color="#dc2626">
            <LineChart data={data}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="weekStart" tickFormatter={formatWeek} fontSize={11} />
              <YAxis fontSize={11} tickFormatter={(v: any) => `${(Number(v) * 100).toFixed(0)}%`} />
              <Tooltip 
                formatter={percentFormatter}
                labelFormatter={(label: any) => `Week of ${label}`}
              />
              <Line type="monotone" dataKey="cancellationRate" stroke="#dc2626" strokeWidth={2.5} dot={{ r: 3 }} />
            </LineChart>
          </ChartCard>

          <ChartCard title="Revenue Per Crew Day" color="#9333ea">
            <LineChart data={data}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="weekStart" tickFormatter={formatWeek} fontSize={11} />
              <YAxis fontSize={11} tickFormatter={(v: any) => `$${Number(v)}`} />
              <Tooltip 
                formatter={moneyFormatter}
                labelFormatter={(label: any) => `Week of ${label}`}
              />
              <Line type="monotone" dataKey="revenuePerCrewDay" stroke="#9333ea" strokeWidth={2.5} dot={{ r: 3 }} />
            </LineChart>
          </ChartCard>

          <ChartCard title="Active Field Staff" color="#ea580c" span={2}>
            <LineChart data={data}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="weekStart" tickFormatter={formatWeek} fontSize={11} />
              <YAxis fontSize={11} />
              <Tooltip 
                formatter={numberFormatter}
                labelFormatter={(label: any) => `Week of ${label}`}
              />
              <Line type="monotone" dataKey="activeStaff" stroke="#ea580c" strokeWidth={2.5} dot={{ r: 3 }} />
            </LineChart>
          </ChartCard>
        </div>

        {/* Data Table */}
        <div className="mt-8 bg-white rounded-lg shadow overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-gray-900">Weekly Details</h2>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
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
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 text-right">{formatMoney(row.revenue)}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 text-right">{row.signups}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 text-right">{(row.cancellationRate * 100).toFixed(1)}%</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 text-right">{formatMoney(row.revenuePerCrewDay)}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 text-right">{row.activeStaff}</td>
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
function KpiCard({ label, value, sub, color }: { 
  label: string; 
  value: string; 
  sub: string;
  color: 'green' | 'blue' | 'red' | 'purple' | 'orange';
}) {
  const colors = {
    green: 'bg-green-50 border-green-200',
    blue: 'bg-blue-50 border-blue-200',
    red: 'bg-red-50 border-red-200',
    purple: 'bg-purple-50 border-purple-200',
    orange: 'bg-orange-50 border-orange-200',
  };
  
  const textColors = {
    green: 'text-green-600',
    blue: 'text-blue-600',
    red: 'text-red-600',
    purple: 'text-purple-600',
    orange: 'text-orange-600',
  };

  return (
    <div className={`${colors[color]} border rounded-lg p-4`}>
      <div className="text-xs text-gray-600 mb-1">{label}</div>
      <div className={`text-2xl font-bold ${textColors[color]}`}>{value}</div>
      <div className="text-xs text-gray-500 mt-1">{sub}</div>
    </div>
  );
}

function ChartCard({ 
  title, 
  children, 
  color,
  span = 1
}: { 
  title: string; 
  children: React.ReactElement;
  color: string;
  span?: 1 | 2;
}) {
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