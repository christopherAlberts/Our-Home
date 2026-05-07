import React from 'react';
import {
  Flame,
  Dog,
  Plus,
  CreditCard
} from 'lucide-react';

const QuickActions: React.FC = () => {
  const actions = [
    { label: 'Pay Utility', icon: CreditCard, color: 'bg-indigo-50 text-indigo-600' },
    { label: 'Refill Gas', icon: Flame, color: 'bg-orange-50 text-orange-600' },
    { label: 'Dog Meds', icon: Dog, color: 'bg-amber-50 text-amber-600' },
    { label: 'New Task', icon: Plus, color: 'bg-slate-50 text-slate-600' },
  ];

  return (
    <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
      {actions.map((action) => (
        <button
          key={action.label}
          className="flex flex-col items-center gap-3 p-4 bg-white rounded-2xl border border-slate-100 hover:border-indigo-200 hover:shadow-md transition-all group"
        >
          <div className={`p-3 rounded-xl ${action.color} group-hover:scale-110 transition-transform`}>
            <action.icon size={24} />
          </div>
          <span className="text-xs font-bold text-slate-700">{action.label}</span>
        </button>
      ))}
    </div>
  );
};

export default QuickActions;
