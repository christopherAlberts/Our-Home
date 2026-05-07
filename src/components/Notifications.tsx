import React from 'react';
import { Bell, Info } from 'lucide-react';

const Notifications: React.FC = () => {
  const notifications = [
    { id: 1, title: 'Gas Bottle Low', message: 'Bottle 1 is at approximately 15%.', time: '2 hours ago', type: 'warning' },
    { id: 2, title: 'Payment Due', message: 'Electricity bill is due in 3 days.', time: '5 hours ago', type: 'info' },
    { id: 3, title: 'Task Completed', message: 'Clean gutters was marked as completed.', time: 'Yesterday', type: 'success' },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-slate-900">Notifications</h2>
        <button className="text-sm font-medium text-indigo-600 hover:underline">Mark all as read</button>
      </div>

      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="divide-y divide-slate-100">
          {notifications.map((notification) => (
            <div key={notification.id} className="p-6 flex items-start gap-4 hover:bg-slate-50 transition-colors">
              <div className={`p-2 rounded-lg shrink-0 ${
                notification.type === 'warning' ? 'bg-orange-50 text-orange-600' :
                notification.type === 'success' ? 'bg-emerald-50 text-emerald-600' :
                'bg-indigo-50 text-indigo-600'
              }`}>
                <Bell size={20} />
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between mb-1">
                  <h3 className="font-bold text-slate-900">{notification.title}</h3>
                  <span className="text-xs text-slate-400">{notification.time}</span>
                </div>
                <p className="text-sm text-slate-500">{notification.message}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-blue-50 border border-blue-100 p-4 rounded-xl flex items-start gap-3">
        <Info className="text-blue-600 shrink-0" size={20} />
        <p className="text-xs text-blue-800 leading-relaxed">
          Notifications are automatically cleared after 30 days. You can adjust your notification preferences in the settings panel.
        </p>
      </div>
    </div>
  );
};

export default Notifications;
