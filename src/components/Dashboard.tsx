import React from 'react';
import {
  Bell,
  Calendar,
  CheckCircle2,
  Flame,
  Dog,
  ArrowRight,
  TrendingUp,
  Clock,
  Info,
  X
} from 'lucide-react';
import QuickActions from './QuickActions';
import { useAppContext } from '../context/useAppContext';
import { useState } from 'react';

const Dashboard: React.FC<{ setActiveView: (view: string) => void }> = ({ setActiveView }) => {
  const { payments, currency, setTrackingFilter } = useAppContext();
  const [showSmartTips, setShowSmartTips] = useState(false);

  const currentMonth = new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
  const totalSpent = payments
    .filter(p => p.paid && new Date(p.date).toLocaleDateString('en-US', { month: 'long', year: 'numeric' }) === currentMonth)
    .reduce((sum, p) => sum + p.amount, 0);

  return (
    <div className="space-y-8">
      {/* Welcome Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-3xl font-bold text-slate-900 tracking-tight">Good Morning, John & Jane!</h2>
          <p className="text-slate-500">Here's what's happening with your home today.</p>
        </div>
        <div className="flex items-center gap-2 text-sm font-bold text-indigo-600 bg-indigo-50 px-4 py-2 rounded-full">
          <Calendar size={18} />
          {new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}
        </div>
      </div>

      <QuickActions setActiveView={setActiveView} />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Feed */}
        <div className="lg:col-span-2 space-y-8">
          {/* Critical Alerts */}
          <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
            <div className="p-6 border-b border-slate-50 bg-slate-50/30 flex justify-between items-center">
              <h3 className="font-bold text-slate-900 flex items-center gap-2">
                <Bell className="text-indigo-600" size={20} />
                Attention Needed
              </h3>
              <span className="text-xs font-bold text-slate-400 uppercase">2 Items</span>
            </div>
            <div className="divide-y divide-slate-50">
              <div className="p-6 flex items-start gap-4 hover:bg-slate-50/50 transition-colors cursor-pointer group">
                <div className="p-3 bg-orange-50 text-orange-600 rounded-2xl group-hover:scale-110 transition-transform">
                  <Flame size={24} />
                </div>
                <div className="flex-1">
                  <div className="flex justify-between mb-1">
                    <h4 className="font-bold text-slate-900">Gas Bottle Low</h4>
                    <span className="text-xs text-slate-400 font-medium">Due in 5 days</span>
                  </div>
                  <p className="text-sm text-slate-500 mb-3">Bottle 1 is at approximately 15%. Consider ordering a refill soon.</p>
                  <div className="flex items-center gap-4">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setTrackingFilter('gas');
                        setActiveView('tracking');
                      }}
                      className="text-xs font-bold text-indigo-600 hover:underline active:scale-95 transition-transform"
                    >
                      Order Refill
                    </button>
                    <button
                      onClick={(e) => { e.stopPropagation(); alert('Alert dismissed!'); }}
                      className="text-xs font-bold text-slate-400 hover:underline active:scale-95 transition-transform"
                    >
                      Dismiss
                    </button>
                  </div>
                </div>
              </div>
              <div className="p-6 flex items-start gap-4 hover:bg-slate-50/50 transition-colors cursor-pointer group">
                <div className="p-3 bg-amber-50 text-amber-600 rounded-2xl group-hover:scale-110 transition-transform">
                  <Dog size={24} />
                </div>
                <div className="flex-1">
                  <div className="flex justify-between mb-1">
                    <h4 className="font-bold text-slate-900">Dog Meds Due</h4>
                    <span className="text-xs text-slate-400 font-medium">Tomorrow</span>
                  </div>
                  <p className="text-sm text-slate-500 mb-3">Flea & Tick medication for Buddy is due on May 20th.</p>
                  <div className="flex items-center gap-4">
                    <button className="text-xs font-bold text-indigo-600 hover:underline" onClick={() => setActiveView('tracking')}>Go to Tracking</button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Activity/Tasks */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm">
              <h3 className="font-bold text-slate-900 mb-4 flex items-center gap-2">
                <CheckCircle2 className="text-emerald-500" size={20} />
                Monthly Progress
              </h3>
              <div className="space-y-4">
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-slate-500">Payments Paid</span>
                  <span className="font-bold text-slate-900">4 / 6</span>
                </div>
                <div className="w-full bg-slate-100 rounded-full h-2 overflow-hidden">
                  <div className="bg-indigo-600 h-full rounded-full" style={{ width: '66%' }}></div>
                </div>
                <button
                  onClick={() => setActiveView('monthly')}
                  className="w-full mt-2 flex items-center justify-center gap-2 py-2 text-xs font-bold text-slate-600 border border-slate-100 rounded-xl hover:bg-slate-50 active:scale-95 transition-transform"
                >
                  View All Payments <ArrowRight size={14} />
                </button>
              </div>
            </div>

            <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm">
              <h3 className="font-bold text-slate-900 mb-4 flex items-center gap-2">
                <TrendingUp className="text-indigo-500" size={20} />
                Spending Stats
              </h3>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-xs text-slate-500">Total Spent This Month</span>
                  <span className="text-lg font-bold text-slate-900">{currency}{totalSpent.toLocaleString()}</span>
                </div>
                <div className="flex items-center gap-2 text-xs text-emerald-600 font-bold bg-emerald-50 px-2 py-1 rounded-lg w-fit">
                  <TrendingUp size={12} /> 4.2% less than April
                </div>
                <button
                  onClick={() => setActiveView('analytics')}
                  className="w-full mt-2 flex items-center justify-center gap-2 py-2 text-xs font-bold text-slate-600 border border-slate-100 rounded-xl hover:bg-slate-50 active:scale-95 transition-transform"
                >
                  View Analytics <ArrowRight size={14} />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Sidebar/Upcoming */}
        <div className="space-y-8">
          <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm">
            <h3 className="font-bold text-slate-900 mb-6">Upcoming Events</h3>
            <div className="space-y-6">
              {[
                { title: 'Electricity Due', date: 'May 22', type: 'payment', color: 'indigo' },
                { title: 'Service Generator', date: 'June 1', type: 'task', color: 'amber' },
                { title: 'Manfred Payment', date: 'June 1', type: 'payment', color: 'indigo' },
              ].map((event, i) => (
                <div key={i} className="flex gap-4">
                  <div className={`w-1 h-10 rounded-full ${event.color === 'indigo' ? 'bg-indigo-500' : 'bg-amber-500'}`}></div>
                  <div>
                    <h4 className="text-sm font-bold text-slate-900">{event.title}</h4>
                    <div className="flex items-center gap-2 text-xs text-slate-400 mt-0.5">
                      <Clock size={12} />
                      {event.date}
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <button
              onClick={() => setActiveView('calendar')}
              className="w-full mt-8 py-3 bg-slate-900 text-white font-bold rounded-2xl hover:bg-slate-800 transition-colors active:scale-[0.98] transition-transform"
            >
              Open Calendar
            </button>
          </div>

          <div className="bg-indigo-600 p-6 rounded-3xl text-white shadow-xl shadow-indigo-100 relative overflow-hidden group">
            <h3 className="font-bold text-lg mb-2 relative z-10">Smart Tips</h3>
            <p className="text-indigo-100 text-xs mb-4 relative z-10 leading-relaxed">
              Based on historical data, your electricity usage peaks between 6PM and 9PM. Try shifting the pool pump to morning hours.
            </p>
            <button
              onClick={() => setShowSmartTips(true)}
              className="text-white text-xs font-bold flex items-center gap-1 relative z-10 hover:underline active:scale-95 transition-transform"
            >
              Learn more <ArrowRight size={12} />
            </button>
            <TrendingUp size={120} className="absolute -right-8 -bottom-8 text-indigo-500 opacity-20 transform -rotate-12 group-hover:rotate-0 transition-transform duration-500" />
          </div>
        </div>
      </div>

      {/* Smart Tips Modal */}
      {showSmartTips && (
        <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-3xl w-full max-w-lg overflow-hidden shadow-2xl">
            <div className="p-6 border-b border-slate-100 flex justify-between items-center bg-indigo-50/50">
              <h3 className="font-bold text-slate-900 text-lg flex items-center gap-2">
                <Info className="text-indigo-600" size={24} />
                Smart Home Tips
              </h3>
              <button onClick={() => setShowSmartTips(false)} className="text-slate-400 hover:text-slate-600">
                <X size={24} />
              </button>
            </div>
            <div className="p-8 space-y-6">
              <div className="space-y-4">
                <div className="flex gap-4">
                  <div className="p-3 bg-amber-50 text-amber-600 rounded-2xl h-fit">
                    <TrendingUp size={24} />
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900 mb-1">Energy Optimization</h4>
                    <p className="text-sm text-slate-500 leading-relaxed">
                      Your electricity usage peaks between 6PM and 9PM. Shifting heavy appliance use (pool pump, dishwasher) to morning hours could save you up to 15% on your monthly bill.
                    </p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="p-3 bg-indigo-50 text-indigo-600 rounded-2xl h-fit">
                    <Flame size={24} />
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900 mb-1">Gas Efficiency</h4>
                    <p className="text-sm text-slate-500 leading-relaxed">
                      Bottle 1 is lasting 10% longer than usual. This correlates with the warmer weather and less heater usage. Keep it up!
                    </p>
                  </div>
                </div>
              </div>
              <button
                onClick={() => setShowSmartTips(false)}
                className="w-full py-3 bg-slate-900 text-white font-bold rounded-xl hover:bg-slate-800 transition-colors"
              >
                Got it, thanks!
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
