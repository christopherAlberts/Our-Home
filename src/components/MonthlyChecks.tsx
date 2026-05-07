import React, { useState } from 'react';
import {
  CheckCircle2,
  Circle,
  DollarSign,
  TrendingUp,
  Calendar as CalendarIcon,
  Plus,
  X,
  Trash2
} from 'lucide-react';
import { useAppContext } from '../context/useAppContext';
import type { PaymentCategory } from '../types';
import { format } from 'date-fns';

const MonthlyChecks: React.FC = () => {
  const { payments, togglePaymentPaid, addPayment, removePayment, currency } = useAppContext();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newExpense, setNewExpense] = useState({ category: '', amount: '' });

  const currentMonth = format(new Date(), 'MMMM yyyy');

  const handleAddExpense = (e: React.FormEvent) => {
    e.preventDefault();
    if (newExpense.category && newExpense.amount) {
      addPayment({
        category: newExpense.category,
        amount: parseFloat(newExpense.amount),
        date: format(new Date(), 'yyyy-MM-dd')
      });
      setNewExpense({ category: '', amount: '' });
      setIsModalOpen(false);
    }
  };

  const categories: PaymentCategory[] = Array.from(new Set([
    'House', 'Insurance', 'Electricity', 'Water', 'Manfred', 'Elrita',
    ...payments.map(p => p.category)
  ]));

  const totalAmount = payments
    .filter(p => format(new Date(p.date), 'MMMM yyyy') === currentMonth)
    .reduce((sum, p) => sum + p.amount, 0);

  const paidAmount = payments
    .filter(p => format(new Date(p.date), 'MMMM yyyy') === currentMonth && p.paid)
    .reduce((sum, p) => sum + p.amount, 0);

  return (
    <div className="space-y-8">
      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <div className="p-2 bg-indigo-50 rounded-lg text-indigo-600">
              <DollarSign size={24} />
            </div>
            <span className="text-xs font-semibold text-slate-400 uppercase">Total Due</span>
          </div>
          <div className="text-2xl font-bold text-slate-900">{currency}{totalAmount.toLocaleString()}</div>
          <div className="text-sm text-slate-500 mt-1">For {currentMonth}</div>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <div className="p-2 bg-emerald-50 rounded-lg text-emerald-600">
              <CheckCircle2 size={24} />
            </div>
            <span className="text-xs font-semibold text-slate-400 uppercase">Paid</span>
          </div>
          <div className="text-2xl font-bold text-slate-900">{currency}{paidAmount.toLocaleString()}</div>
          <div className="text-sm text-emerald-600 mt-1 font-medium">
            {Math.round((paidAmount / totalAmount) * 100)}% Completed
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <div className="p-2 bg-amber-50 rounded-lg text-amber-600">
              <TrendingUp size={24} />
            </div>
            <span className="text-xs font-semibold text-slate-400 uppercase">Remaining</span>
          </div>
          <div className="text-2xl font-bold text-slate-900">{currency}{(totalAmount - paidAmount).toLocaleString()}</div>
          <div className="text-sm text-slate-500 mt-1">Pending payments</div>
        </div>
      </div>

      {/* Checklist */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="p-6 border-b border-slate-100 flex justify-between items-center">
          <div>
            <h2 className="text-xl font-bold text-slate-900">Payment Checklist</h2>
            <p className="text-sm text-slate-500">Track and manage your monthly house expenses</p>
          </div>
          <button
            onClick={() => setIsModalOpen(true)}
            className="flex items-center gap-2 bg-indigo-600 text-white px-4 py-2 rounded-xl text-sm font-medium hover:bg-indigo-700 transition-colors shadow-lg shadow-indigo-200 active:scale-95 transition-transform"
          >
            <Plus size={18} />
            Add Expense
          </button>
        </div>

        <div className="divide-y divide-slate-50">
          {categories.map((category) => {
            const payment = payments.find(p =>
              p.category === category &&
              format(new Date(p.date), 'MMMM yyyy') === currentMonth
            );

            return (
              <div key={category} className="p-6 flex items-center justify-between hover:bg-slate-50/50 transition-colors group">
                <div className="flex items-center gap-4">
                  <button
                    onClick={() => payment && togglePaymentPaid(payment.id)}
                    className={`transition-colors ${payment?.paid ? 'text-indigo-600' : 'text-slate-300 hover:text-slate-400'}`}
                  >
                    {payment?.paid ? <CheckCircle2 size={28} /> : <Circle size={28} />}
                  </button>
                  <div>
                    <div className="font-semibold text-slate-900">{category}</div>
                    <div className="text-sm text-slate-500 flex items-center gap-2">
                      <CalendarIcon size={14} />
                      Due by the 1st
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-6">
                  <div className="text-right">
                    <div className="font-bold text-slate-900">{currency}{payment?.amount || 0}</div>
                    <div className={`text-xs font-semibold px-2 py-0.5 rounded-full ${payment?.paid ? 'bg-emerald-100 text-emerald-700' : 'bg-amber-100 text-amber-700'}`}>
                      {payment?.paid ? 'PAID' : 'PENDING'}
                    </div>
                  </div>
                  {payment && (
                    <button
                      onClick={() => removePayment(payment.id)}
                      className="p-2 text-slate-300 hover:text-red-600 opacity-0 group-hover:opacity-100 transition-all active:scale-90"
                    >
                      <Trash2 size={20} />
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Add Expense Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-3xl w-full max-w-md overflow-hidden shadow-2xl">
            <div className="p-6 border-b border-slate-100 flex justify-between items-center bg-slate-50/50">
              <h3 className="font-bold text-slate-900 text-lg">Add New Expense</h3>
              <button onClick={() => setIsModalOpen(false)} className="text-slate-400 hover:text-slate-600">
                <X size={24} />
              </button>
            </div>
            <form onSubmit={handleAddExpense} className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-1">Category</label>
                <input
                  type="text"
                  required
                  value={newExpense.category}
                  onChange={(e) => setNewExpense({ ...newExpense, category: e.target.value })}
                  placeholder="e.g. Internet, Groceries"
                  className="w-full px-4 py-2 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none"
                />
              </div>
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-1">Amount ({currency})</label>
                <input
                  type="number"
                  required
                  value={newExpense.amount}
                  onChange={(e) => setNewExpense({ ...newExpense, amount: e.target.value })}
                  placeholder="0.00"
                  className="w-full px-4 py-2 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none"
                />
              </div>
              <button
                type="submit"
                className="w-full py-3 bg-indigo-600 text-white font-bold rounded-xl hover:bg-indigo-700 transition-colors shadow-lg shadow-indigo-100"
              >
                Add Expense
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default MonthlyChecks;
