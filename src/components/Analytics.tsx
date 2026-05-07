import React from 'react';
import {
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  AreaChart,
  Area,
  Cell,
  PieChart,
  Pie,
  XAxis,
  YAxis
} from 'recharts';
import {
  TrendingUp,
  Info,
  Flame
} from 'lucide-react';
import { useAppContext } from '../context/useAppContext';

const paymentData = [
  { name: 'Jan', amount: 4800 },
  { name: 'Feb', amount: 5200 },
  { name: 'Mar', amount: 4900 },
  { name: 'Apr', amount: 5100 },
  { name: 'May', amount: 5030 },
  { name: 'Jun', amount: 5500 },
];

const categoryData = [
  { name: 'House', value: 2500, color: '#4f46e5' },
  { name: 'Workers', value: 2000, color: '#7c3aed' },
  { name: 'Utilities', value: 300, color: '#2563eb' },
  { name: 'Insurance', value: 300, color: '#0891b2' },
];

const Analytics: React.FC = () => {
  const { currency } = useAppContext();

  return (
    <div className="space-y-8">
      {/* Prediction Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-gradient-to-br from-indigo-600 to-indigo-700 p-8 rounded-3xl text-white shadow-xl shadow-indigo-200 relative overflow-hidden">
          <div className="relative z-10">
            <div className="flex items-center gap-2 text-indigo-100 mb-4">
              <Flame size={20} />
              <span className="text-sm font-semibold uppercase tracking-wider">Gas Prediction</span>
            </div>
            <h3 className="text-3xl font-bold mb-2">Refill in 12 days</h3>
            <p className="text-indigo-100 text-sm max-w-xs">Based on your average usage of 1.1% per day, Bottle 1 will be empty around June 15th.</p>
            <div className="mt-8 flex gap-4">
              <div className="bg-white/10 backdrop-blur-md px-4 py-2 rounded-xl">
                <div className="text-xs text-indigo-200">Confidence</div>
                <div className="font-bold">High (92%)</div>
              </div>
              <div className="bg-white/10 backdrop-blur-md px-4 py-2 rounded-xl">
                <div className="text-xs text-indigo-200">Daily Avg</div>
                <div className="font-bold">0.8kg</div>
              </div>
            </div>
          </div>
          <Flame size={180} className="absolute -right-12 -bottom-12 text-indigo-500 opacity-20" />
        </div>

        <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-xl font-bold text-slate-900">Spending Forecast</h3>
              <p className="text-sm text-slate-500">Next 3 months projected costs</p>
            </div>
            <div className="p-3 bg-emerald-50 text-emerald-600 rounded-2xl">
              <TrendingUp size={24} />
            </div>
          </div>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 bg-slate-50 rounded-2xl">
              <div className="flex items-center gap-3">
                <div className="w-2 h-8 bg-indigo-500 rounded-full"></div>
                <span className="font-semibold text-slate-700">June 2025</span>
              </div>
              <span className="font-bold text-slate-900">{currency}5,240</span>
            </div>
            <div className="flex items-center justify-between p-4 bg-slate-50 rounded-2xl">
              <div className="flex items-center gap-3">
                <div className="w-2 h-8 bg-indigo-300 rounded-full"></div>
                <span className="font-semibold text-slate-700">July 2025</span>
              </div>
              <span className="font-bold text-slate-900">{currency}5,180</span>
            </div>
            <div className="text-xs text-slate-400 flex items-center gap-2 px-2">
              <Info size={14} />
              Includes expected seasonal electricity increase
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
        {/* Main Spending Chart */}
        <div className="xl:col-span-2 bg-white p-6 rounded-3xl border border-slate-200 shadow-sm">
          <div className="flex items-center justify-between mb-8">
            <h3 className="font-bold text-slate-900 text-lg flex items-center gap-2">
              Monthly Expenditure
              <span className="text-xs font-medium text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full">+2.4% from last month</span>
            </h3>
            <select className="bg-slate-50 border-none text-xs font-bold text-slate-500 rounded-lg focus:ring-0">
              <option>Last 6 Months</option>
              <option>Last Year</option>
            </select>
          </div>
          <div className="h-80 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={paymentData}>
                <defs>
                  <linearGradient id="colorAmount" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#6366f1" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#6366f1" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis
                  dataKey="name"
                  axisLine={false}
                  tickLine={false}
                  tick={{fill: '#94a3b8', fontSize: 12}}
                  dy={10}
                />
                <YAxis
                  axisLine={false}
                  tickLine={false}
                  tick={{fill: '#94a3b8', fontSize: 12}}
                />
                <Tooltip
                  contentStyle={{borderRadius: '16px', border: 'none', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)'}}
                />
                <Area
                  type="monotone"
                  dataKey="amount"
                  stroke="#6366f1"
                  strokeWidth={3}
                  fillOpacity={1}
                  fill="url(#colorAmount)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Category Breakdown */}
        <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm">
          <h3 className="font-bold text-slate-900 text-lg mb-8">Cost Breakdown</h3>
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={categoryData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={8}
                  dataKey="value"
                >
                  {categoryData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="space-y-3 mt-4">
            {categoryData.map((item) => (
              <div key={item.name} className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full" style={{backgroundColor: item.color}}></div>
                  <span className="text-sm font-medium text-slate-600">{item.name}</span>
                </div>
                <span className="text-sm font-bold text-slate-900">{currency}{item.value}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Analytics;
