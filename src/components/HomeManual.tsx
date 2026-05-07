import React from 'react';
import {
  PhoneCall,
  ShieldCheck,
  Info,
  ExternalLink,
  Search,
  Wifi
} from 'lucide-react';

const HomeManual: React.FC = () => {
  const sections = [
    {
      title: 'Connectivity',
      icon: Wifi,
      items: [
        { label: 'Wi-Fi Name', value: 'Home_HighSpeed_5G' },
        { label: 'Wi-Fi Password', value: 'happy-home-2025' },
        { label: 'Fiber Provider', value: 'LinkAfrica (086 123 4567)' },
      ]
    },
    {
      title: 'Emergency Contacts',
      icon: PhoneCall,
      items: [
        { label: 'Police', value: '10111' },
        { label: 'Ambulance', value: '10177' },
        { label: 'Security Co.', value: 'Chubb Security' },
      ]
    },
    {
      title: 'Maintenance Info',
      icon: ShieldCheck,
      items: [
        { label: 'Plumber', value: 'Dave (082 555 1234)' },
        { label: 'Electrician', value: 'Sarah (071 999 8888)' },
        { label: 'Water Meter', value: 'Front left garden' },
      ]
    }
  ];

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-slate-900">Home Manual</h2>
          <p className="text-sm text-slate-500">Essential information and emergency contacts</p>
        </div>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
          <input
            type="text"
            placeholder="Search manual..."
            className="pl-10 pr-4 py-2 bg-white border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none w-full md:w-64"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {sections.map((section) => (
          <div key={section.title} className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden flex flex-col">
            <div className="p-6 border-b border-slate-50 flex items-center gap-3">
              <div className="p-2 bg-indigo-50 text-indigo-600 rounded-lg">
                <section.icon size={20} />
              </div>
              <h3 className="font-bold text-slate-900">{section.title}</h3>
            </div>
            <div className="p-6 space-y-4 flex-1">
              {section.items.map((item) => (
                <div key={item.label} className="group">
                  <div className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">{item.label}</div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-semibold text-slate-700">{item.value}</span>
                    <button
                      onClick={() => alert(`External Link for ${item.label} clicked!`)}
                      className="text-slate-300 group-hover:text-indigo-500 transition-all active:scale-90"
                    >
                      <ExternalLink size={14} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className="bg-indigo-50 border border-indigo-100 rounded-3xl p-8 flex flex-col md:flex-row items-center gap-6">
        <div className="p-4 bg-white rounded-2xl shadow-sm text-indigo-600">
          <Info size={32} />
        </div>
        <div className="flex-1 text-center md:text-left">
          <h4 className="text-lg font-bold text-indigo-900 mb-1">Need more details?</h4>
          <p className="text-indigo-700 text-sm">All physical manuals for appliances are kept in the kitchen drawer under the coffee machine.</p>
        </div>
        <button
          onClick={() => alert('Browse Docs clicked!')}
          className="px-6 py-3 bg-white text-indigo-600 font-bold rounded-xl shadow-sm hover:shadow-md transition-all active:scale-95"
        >
          Browse Docs
        </button>
      </div>
    </div>
  );
};

export default HomeManual;
