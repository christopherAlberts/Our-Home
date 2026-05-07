import React from 'react';
import { User, Bell, Smartphone, Moon } from 'lucide-react';

const Settings: React.FC = () => {
  const sections = [
    {
      title: 'Account',
      icon: User,
      items: ['Profile Information', 'Password & Security', 'Manage Family Members']
    },
    {
      title: 'Notifications',
      icon: Bell,
      items: ['Push Notifications', 'Email Digests', 'Alert Thresholds']
    },
    {
      title: 'Preferences',
      icon: Moon,
      items: ['Dark Mode', 'Language (English)', 'Currency (USD)']
    },
    {
      title: 'System',
      icon: Smartphone,
      items: ['App Version (1.2.0)', 'Sync Status', 'Data Export']
    }
  ];

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-slate-900">Settings</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {sections.map((section) => (
          <div key={section.title} className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
            <div className="p-4 border-b border-slate-50 bg-slate-50/50 flex items-center gap-3">
              <div className="p-2 bg-white rounded-lg text-slate-600 border border-slate-100 shadow-sm">
                <section.icon size={18} />
              </div>
              <h3 className="font-bold text-slate-900">{section.title}</h3>
            </div>
            <div className="divide-y divide-slate-50">
              {section.items.map((item) => (
                <button
                  key={item}
                  className="w-full text-left px-6 py-4 text-sm text-slate-600 hover:bg-slate-50 transition-colors flex items-center justify-between group"
                >
                  {item}
                  <div className="w-1.5 h-1.5 rounded-full bg-slate-200 group-hover:bg-indigo-400 transition-colors"></div>
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className="pt-4 flex justify-end">
        <button className="px-6 py-2.5 bg-slate-900 text-white font-bold rounded-xl hover:bg-slate-800 transition-colors">
          Save Changes
        </button>
      </div>
    </div>
  );
};

export default Settings;
