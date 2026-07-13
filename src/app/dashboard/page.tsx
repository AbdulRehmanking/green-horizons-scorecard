"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  BarChart, Bar, AreaChart, Area, ComposedChart
} from "recharts";
import { 
  TrendingUp, TrendingDown, Users, DollarSign, 
  Activity, Award, BarChart3, ArrowLeft,
  Calendar, ChevronRight
} from "lucide-react";

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

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-16 w-16 border-4 border-green-500 border-t-transparent"></div>
          <p className="mt-4 text-gray-600 font-medium">Loading Scorecard...</p>
        </div>
      </div>
    );
  }

  const totalRevenue = data.reduce((sum, row) => sum + row.revenue, 0);
  const totalSignups = data.reduce((sum, row) => sum + row.signups, 0);
  const avgCancellation = data.reduce((sum, row) => sum + row.cancellationRate, 0) / data.length;
  const avgRevenuePerCrew = data.reduce((sum, row) => sum + row.revenuePerCrewDay, 0) / data.length;
  const peakStaff = Math.max(...data.map(row => row.activeStaff));
  const latestWeek = data[data.length - 1];

  const formatMoney = (n: number) => `$${n.toLocaleString(undefined, { maximumFractionDigits: 0 })}`;
  const formatWeek = (dateStr: string) => {
    const d = new Date(dateStr);
    return `${d.getMonth() + 1}/${d.getDate()}`;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-emerald-50/30">
      {/* Header with Back Button */}
      <header className="bg-white/80 backdrop-blur-md border-b border-gray-200/50 sticky top-0 z-20">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-green-500 to-emerald-600 flex items-center justify-center shadow-lg shadow-green-500/25">
              <span className="text-white text-lg font-bold">G</span>
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-900">Dashboard</h1>
              <p className="text-xs text-gray-500">Green Horizons • Weekly Scorecard</p>
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

      <main className="max-w-7xl mx-auto px-6 py-8">
        {/* KPI Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-5 gap-4 mb-8">
          <KpiCard 
            icon={<DollarSign className="w-5 h-5" />}
            label="Total Revenue" 
            value={formatMoney(totalRevenue)}
            sub={`Last week: ${formatMoney(latestWeek?.revenue || 0)}`}
            color="green"
            trend="up"
            trendValue="+12.5%"
          />
          <KpiCard 
            icon={<Users className="w-5 h-5" />}
            label="Total Signups" 
            value={totalSignups.toString()}
            sub={`Last week: ${latestWeek?.signups || 0}`}
            color="blue"
            trend="up"
            trendValue="+8.3%"
          />
          <KpiCard 
            icon={<TrendingDown className="w-5 h-5" />}
            label="Avg Cancellation" 
            value={`${(avgCancellation * 100).toFixed(1)}%`}
            sub={`Last week: ${((latestWeek?.cancellationRate || 0) * 100).toFixed(1)}%`}
            color="red"
            trend="down"
            trendValue="-2.1%"
          />
          <KpiCard 
            icon={<Activity className="w-5 h-5" />}
            label="Avg Revenue / Crew Day" 
            value={formatMoney(avgRevenuePerCrew)}
            sub={`Last week: ${formatMoney(latestWeek?.revenuePerCrewDay || 0)}`}
            color="purple"
            trend="up"
            trendValue="+5.7%"
          />
          <KpiCard 
            icon={<Award className="w-5 h-5" />}
            label="Peak Active Staff" 
            value={peakStaff.toString()}
            sub={`Last week: ${latestWeek?.activeStaff || 0}`}
            color="orange"
            trend="up"
            trendValue="+15.2%"
          />
        </div>

        {/* Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <ChartCard title="Revenue Trend" color="#16a34a" icon={<DollarSign className="w-4 h-4" />}>
            <AreaChart data={data}>
              <defs>
                <linearGradient id="revenueGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#16a34a" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="#16a34a" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="weekStart" tickFormatter={formatWeek} fontSize={11} stroke="#94a3b8" />
              <YAxis fontSize={11} stroke="#94a3b8" tickFormatter={(v) => `$${v/1000}k`} />
              <Tooltip formatter={(v: any) => formatMoney(v)} labelFormatter={(label) => `Week of ${label}`} contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }} />
              <Area type="monotone" dataKey="revenue" stroke="#16a34a" strokeWidth={2.5} fill="url(#revenueGradient)" />
            </AreaChart>
          </ChartCard>

          <ChartCard title="Signups Per Week" color="#2563eb" icon={<Users className="w-4 h-4" />}>
            <BarChart data={data}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="weekStart" tickFormatter={formatWeek} fontSize={11} stroke="#94a3b8" />
              <YAxis fontSize={11} stroke="#94a3b8" />
              <Tooltip labelFormatter={(label) => `Week of ${label}`} contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }} />
              <Bar dataKey="signups" fill="#2563eb" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ChartCard>

          <ChartCard title="Cancellation Rate" color="#dc2626" icon={<TrendingDown className="w-4 h-4" />}>
            <LineChart data={data}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="weekStart" tickFormatter={formatWeek} fontSize={11} stroke="#94a3b8" />
              <YAxis fontSize={11} stroke="#94a3b8" tickFormatter={(v) => `${(v * 100).toFixed(0)}%`} />
              <Tooltip formatter={(v: any) => `${(v * 100).toFixed(1)}%`} labelFormatter={(label) => `Week of ${label}`} contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }} />
              <Line type="monotone" dataKey="cancellationRate" stroke="#dc2626" strokeWidth={2.5} dot={{ r: 4, fill: '#dc2626' }} />
            </LineChart>
          </ChartCard>

          <ChartCard title="Revenue Per Crew Day" color="#9333ea" icon={<Activity className="w-4 h-4" />}>
            <AreaChart data={data}>
              <defs>
                <linearGradient id="crewGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#9333ea" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="#9333ea" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="weekStart" tickFormatter={formatWeek} fontSize={11} stroke="#94a3b8" />
              <YAxis fontSize={11} stroke="#94a3b8" />
              <Tooltip formatter={(v: any) => formatMoney(v)} labelFormatter={(label) => `Week of ${label}`} contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }} />
              <Area type="monotone" dataKey="revenuePerCrewDay" stroke="#9333ea" strokeWidth={2.5} fill="url(#crewGradient)" />
            </AreaChart>
          </ChartCard>

          <div className="lg:col-span-2">
            <ChartCard title="Active Field Staff Trend" color="#ea580c" icon={<Award className="w-4 h-4" />}>
              <ComposedChart data={data}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis dataKey="weekStart" tickFormatter={formatWeek} fontSize={11} stroke="#94a3b8" />
                <YAxis fontSize={11} stroke="#94a3b8" />
                <Tooltip labelFormatter={(label) => `Week of ${label}`} contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }} />
                <Bar dataKey="activeStaff" fill="#ea580c" radius={[6, 6, 0, 0]} opacity={0.3} />
                <Line type="monotone" dataKey="activeStaff" stroke="#ea580c" strokeWidth={3} dot={{ r: 5, fill: '#ea580c' }} />
              </ComposedChart>
            </ChartCard>
          </div>
        </div>

        {/* Table */}
        <div className="bg-white/70 backdrop-blur-sm rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-100 flex justify-between items-center">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-gray-100 flex items-center justify-center">
                <BarChart3 className="w-4 h-4 text-gray-600" />
              </div>
              <h2 className="text-lg font-semibold text-gray-900">Weekly Details</h2>
            </div>
            <span className="text-sm text-gray-500 bg-gray-50 px-3 py-1 rounded-full">{data.length} weeks</span>
          </div>
          <div className="max-h-[400px] overflow-y-auto">
            <table className="min-w-full divide-y divide-gray-100">
              <thead className="bg-gray-50 sticky top-0 z-10">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Week</th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Revenue</th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Signups</th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Cancellation</th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Revenue / Crew Day</th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Active Staff</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-50">
                {data.map((row, i) => (
                  <tr key={i} className="hover:bg-gray-50/50 transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{row.weekStart}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-semibold text-green-600">{formatMoney(row.revenue)}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm text-gray-900">{row.signups}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-right">
                      <span className={`text-sm font-medium px-2 py-0.5 rounded-full ${row.cancellationRate > 0.08 ? 'bg-red-100 text-red-700' : row.cancellationRate > 0.05 ? 'bg-orange-100 text-orange-700' : 'bg-green-100 text-green-700'}`}>
                        {(row.cancellationRate * 100).toFixed(1)}%
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm text-gray-900">{formatMoney(row.revenuePerCrewDay)}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-right">
                      <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium bg-blue-50 text-blue-700">
                        <Users className="w-3 h-3" />
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

// Components...
function KpiCard({ icon, label, value, sub, color, trend, trendValue }: any) {
  const colors: any = {
    green: { bg: 'from-green-50 to-green-100/50', icon: 'bg-green-500', text: 'text-green-600', ring: 'ring-green-500/20' },
    blue: { bg: 'from-blue-50 to-blue-100/50', icon: 'bg-blue-500', text: 'text-blue-600', ring: 'ring-blue-500/20' },
    red: { bg: 'from-red-50 to-red-100/50', icon: 'bg-red-500', text: 'text-red-600', ring: 'ring-red-500/20' },
    purple: { bg: 'from-purple-50 to-purple-100/50', icon: 'bg-purple-500', text: 'text-purple-600', ring: 'ring-purple-500/20' },
    orange: { bg: 'from-orange-50 to-orange-100/50', icon: 'bg-orange-500', text: 'text-orange-600', ring: 'ring-orange-500/20' },
  };

  return (
    <div className={`group relative overflow-hidden rounded-2xl bg-gradient-to-br ${colors[color].bg} p-5 border border-white/50 shadow-sm hover:shadow-md transition-all duration-300`}>
      <div className="flex items-start justify-between">
        <div>
          <p className="text-xs font-medium text-gray-500 uppercase tracking-wider">{label}</p>
          <p className="text-2xl font-bold text-gray-900 mt-1">{value}</p>
          <p className="text-xs text-gray-500 mt-1">{sub}</p>
        </div>
        <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${colors[color].icon} flex items-center justify-center shadow-lg ${colors[color].ring} ring-2`}>
          <span className="text-white">{icon}</span>
        </div>
      </div>
      {trend && (
        <div className={`mt-3 inline-flex items-center gap-1 text-xs font-medium ${trend === 'up' ? 'text-green-600' : 'text-red-600'}`}>
          {trend === 'up' ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
          {trendValue}
        </div>
      )}
    </div>
  );
}

function ChartCard({ title, children, color, icon, span = 1 }: any) {
  return (
    <div className={`bg-white/70 backdrop-blur-sm rounded-2xl shadow-sm border border-gray-100 p-5 ${span === 2 ? 'lg:col-span-2' : ''}`}>
      <div className="flex items-center gap-2 mb-4">
        {icon && <span className="text-gray-500">{icon}</span>}
        <h3 className="text-sm font-semibold text-gray-700">{title}</h3>
        <span className="w-2 h-2 rounded-full ml-auto" style={{ backgroundColor: color }}></span>
      </div>
      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          {children}
        </ResponsiveContainer>
      </div>
    </div>
  );
}