import React from 'react';
import { Smartphone, Globe, Shield, Palette } from 'lucide-react';
import { useAppContext } from '../context/useAppContext';

const Settings: React.FC = () => {
  const { currency, setCurrency } = useAppContext();

  const handleCurrencyChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setCurrency(e.target.value);
  };

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-3xl font-bold text-slate-900 tracking-tight">Settings</h2>
        <p className="text-slate-500">Manage your preferences and account settings</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          {/* Preferences Section */}
          <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
            <div className="p-6 border-b border-slate-50 bg-slate-50/30 flex items-center gap-3">
              <div className="p-2 bg-white rounded-xl text-indigo-600 border border-slate-100 shadow-sm">
                <Palette size={20} />
              </div>
              <h3 className="font-bold text-slate-900">Preferences</h3>
            </div>
            <div className="p-6 space-y-6">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                  <div className="font-bold text-slate-900">Base Currency</div>
                  <div className="text-sm text-slate-500">Choose your preferred currency for all financial tracking.</div>
                </div>
                <select
                  value={currency}
                  onChange={handleCurrencyChange}
                  className="bg-slate-50 border border-slate-200 rounded-xl px-4 py-2 text-sm font-bold text-slate-700 focus:ring-2 focus:ring-indigo-500 outline-none w-full md:w-48"
                >
                  <option value="R">Rand (R)</option>
                  <option value="$">US Dollar ($)</option>
                  <option value="€">Euro (€)</option>
                  <option value="£">Pound (£)</option>
                </select>
              </div>

              <div className="h-px bg-slate-50"></div>

              <div className="flex items-center justify-between">
                <div>
                  <div className="font-bold text-slate-900">Language</div>
                  <div className="text-sm text-slate-500">English (South Africa)</div>
                </div>
                <button className="text-sm font-bold text-indigo-600 hover:underline">Change</button>
              </div>

              <div className="h-px bg-slate-50"></div>

              <div className="flex items-center justify-between">
                <div>
                  <div className="font-bold text-slate-900">Dark Mode</div>
                  <div className="text-sm text-slate-500">Toggle light/dark appearance.</div>
                </div>
                <div className="w-12 h-6 bg-slate-200 rounded-full relative cursor-pointer">
                  <div className="absolute left-1 top-1 w-4 h-4 bg-white rounded-full transition-all"></div>
                </div>
              </div>
            </div>
          </div>

          {/* Account Security */}
          <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
            <div className="p-6 border-b border-slate-50 bg-slate-50/30 flex items-center gap-3">
              <div className="p-2 bg-white rounded-xl text-indigo-600 border border-slate-100 shadow-sm">
                <Shield size={20} />
              </div>
              <h3 className="font-bold text-slate-900">Security</h3>
            </div>
            <div className="p-6 space-y-4">
              {['Change Password', 'Two-Factor Authentication', 'Login History'].map((item) => (
                <button
                  key={item}
                  className="w-full text-left px-4 py-3 text-sm font-semibold text-slate-700 hover:bg-slate-50 rounded-xl transition-colors flex items-center justify-between group"
                >
                  {item}
                  <div className="w-1.5 h-1.5 rounded-full bg-slate-200 group-hover:bg-indigo-400 transition-colors"></div>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Info Sidebar */}
        <div className="space-y-6">
          <div className="bg-indigo-600 p-8 rounded-3xl text-white shadow-xl shadow-indigo-100 relative overflow-hidden">
            <div className="relative z-10">
              <h3 className="font-bold text-xl mb-2">Need Help?</h3>
              <p className="text-indigo-100 text-sm mb-6 leading-relaxed">
                Check our documentation or contact support for help with your home management system.
              </p>
              <button className="w-full bg-white text-indigo-600 font-bold py-3 rounded-xl shadow-lg hover:shadow-xl transition-all active:scale-95">
                Contact Support
              </button>
            </div>
            <Globe size={150} className="absolute -right-12 -bottom-12 text-indigo-500 opacity-20" />
          </div>

          <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm">
            <div className="flex items-center gap-3 mb-4">
              <Smartphone className="text-slate-400" size={20} />
              <span className="font-bold text-slate-900">App Information</span>
            </div>
            <div className="space-y-3 text-sm">
              <div className="flex justify-between">
                <span className="text-slate-500">Version</span>
                <span className="font-semibold">1.2.0-stable</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Build</span>
                <span className="font-semibold">2025.05.19</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;
