import React, { useState } from 'react';
import {
  ChevronLeft,
  ChevronRight,
  Plus,
  Clock,
  CheckCircle2,
  AlertCircle
} from 'lucide-react';
import {
  format,
  startOfMonth,
  endOfMonth,
  eachDayOfInterval,
  isSameDay,
  isToday,
  addMonths,
  subMonths,
  parseISO
} from 'date-fns';
import { useAppContext } from '../context/useAppContext';
import { X } from 'lucide-react';

const CalendarView: React.FC = () => {
  const { payments, tasks, dogMeds, addTask, addPayment } = useAppContext();
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newEvent, setNewEvent] = useState({
    title: '',
    date: format(new Date(), 'yyyy-MM-dd'),
    type: 'task',
    amount: ''
  });

  const days = eachDayOfInterval({
    start: startOfMonth(currentMonth),
    end: endOfMonth(currentMonth),
  });

  const getEventsForDay = (day: Date) => {
    const dayPayments = payments.filter(p => isSameDay(parseISO(p.date), day));
    const dayTasks = tasks.filter(t => isSameDay(parseISO(t.dueDate), day));
    const dayMeds = dogMeds.filter(m => isSameDay(parseISO(m.nextDueDate), day));

    return [
      ...dayPayments.map(p => ({ type: 'payment', title: p.category, color: 'indigo', status: p.paid })),
      ...dayTasks.map(t => ({ type: 'task', title: t.title, color: 'amber', status: t.completed })),
      ...dayMeds.map(() => ({ type: 'med', title: 'Dog Meds', color: 'emerald', status: false })),
    ];
  };

  const handleAddEvent = (e: React.FormEvent) => {
    e.preventDefault();
    if (newEvent.type === 'task') {
      addTask({
        title: newEvent.title,
        dueDate: newEvent.date,
        category: 'Maintenance'
      });
    } else {
      addPayment({
        category: newEvent.title,
        amount: parseFloat(newEvent.amount) || 0,
        date: newEvent.date
      });
    }
    setIsModalOpen(false);
    setNewEvent({ title: '', date: format(new Date(), 'yyyy-MM-dd'), type: 'task', amount: '' });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-slate-900">{format(currentMonth, 'MMMM yyyy')}</h2>
          <p className="text-sm text-slate-500">Your scheduled tasks and payments</p>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex items-center bg-white border border-slate-200 rounded-xl overflow-hidden">
            <button
              onClick={() => setCurrentMonth(subMonths(currentMonth, 1))}
              className="p-2 hover:bg-slate-50 border-r border-slate-200"
            >
              <ChevronLeft size={20} />
            </button>
            <button
              onClick={() => setCurrentMonth(new Date())}
              className="px-4 py-2 text-sm font-medium hover:bg-slate-50 border-r border-slate-200"
            >
              Today
            </button>
            <button
              onClick={() => setCurrentMonth(addMonths(currentMonth, 1))}
              className="p-2 hover:bg-slate-50"
            >
              <ChevronRight size={20} />
            </button>
          </div>
          <button
            onClick={() => setIsModalOpen(true)}
            className="flex items-center gap-2 bg-indigo-600 text-white px-4 py-2 rounded-xl text-sm font-medium hover:bg-indigo-700 transition-colors active:scale-95 transition-transform"
          >
            <Plus size={18} />
            Add Event
          </button>
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        {/* Calendar Header */}
        <div className="grid grid-cols-7 border-b border-slate-200 bg-slate-50/50">
          {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
            <div key={day} className="py-3 text-center text-xs font-bold text-slate-400 uppercase tracking-wider">
              {day}
            </div>
          ))}
        </div>

        {/* Calendar Grid */}
        <div className="grid grid-cols-7 border-slate-200">
          {/* Add empty slots for previous month if needed - simplified here */}
          {days.map((day, i) => {
            const events = getEventsForDay(day);
            return (
              <div
                key={day.toString()}
                className={`min-h-[120px] p-2 border-b border-r border-slate-100 transition-colors hover:bg-slate-50/50 ${
                  i % 7 === 6 ? 'border-r-0' : ''
                }`}
              >
                <div className="flex justify-between items-center mb-1">
                  <span className={`text-sm font-bold w-7 h-7 flex items-center justify-center rounded-full ${
                    isToday(day) ? 'bg-indigo-600 text-white' : 'text-slate-700'
                  }`}>
                    {format(day, 'd')}
                  </span>
                </div>
                <div className="space-y-1">
                  {events.map((event, idx) => (
                    <div
                      key={idx}
                      className={`text-[10px] p-1.5 rounded-lg border flex items-center gap-1.5 truncate ${
                        event.color === 'indigo' ? 'bg-indigo-50 border-indigo-100 text-indigo-700' :
                        event.color === 'amber' ? 'bg-amber-50 border-amber-100 text-amber-700' :
                        'bg-emerald-50 border-emerald-100 text-emerald-700'
                      }`}
                    >
                      {event.status ? <CheckCircle2 size={10} /> : <Clock size={10} />}
                      <span className="font-semibold">{event.title}</span>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Add Event Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-3xl w-full max-w-md overflow-hidden shadow-2xl">
            <div className="p-6 border-b border-slate-100 flex justify-between items-center bg-slate-50/50">
              <h3 className="font-bold text-slate-900 text-lg">Add New Event</h3>
              <button onClick={() => setIsModalOpen(false)} className="text-slate-400 hover:text-slate-600">
                <X size={24} />
              </button>
            </div>
            <form onSubmit={handleAddEvent} className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-1">Type</label>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => setNewEvent({ ...newEvent, type: 'task' })}
                    className={`py-2 rounded-xl text-sm font-bold border transition-all ${
                      newEvent.type === 'task'
                      ? 'bg-indigo-50 border-indigo-200 text-indigo-600'
                      : 'border-slate-100 text-slate-500 hover:bg-slate-50'
                    }`}
                  >
                    Task
                  </button>
                  <button
                    type="button"
                    onClick={() => setNewEvent({ ...newEvent, type: 'payment' })}
                    className={`py-2 rounded-xl text-sm font-bold border transition-all ${
                      newEvent.type === 'payment'
                      ? 'bg-indigo-50 border-indigo-200 text-indigo-600'
                      : 'border-slate-100 text-slate-500 hover:bg-slate-50'
                    }`}
                  >
                    Payment
                  </button>
                </div>
              </div>
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-1">Title</label>
                <input
                  type="text"
                  required
                  value={newEvent.title}
                  onChange={(e) => setNewEvent({ ...newEvent, title: e.target.value })}
                  placeholder={newEvent.type === 'task' ? "e.g. Service Generator" : "e.g. Internet Bill"}
                  className="w-full px-4 py-2 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none"
                />
              </div>
              {newEvent.type === 'payment' && (
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-1">Amount</label>
                  <input
                    type="number"
                    required
                    value={newEvent.amount}
                    onChange={(e) => setNewEvent({ ...newEvent, amount: e.target.value })}
                    placeholder="0.00"
                    className="w-full px-4 py-2 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none"
                  />
                </div>
              )}
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-1">Date</label>
                <input
                  type="date"
                  required
                  value={newEvent.date}
                  onChange={(e) => setNewEvent({ ...newEvent, date: e.target.value })}
                  className="w-full px-4 py-2 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none"
                />
              </div>
              <button
                type="submit"
                className="w-full py-3 bg-indigo-600 text-white font-bold rounded-xl hover:bg-indigo-700 transition-colors shadow-lg shadow-indigo-100"
              >
                Add to Calendar
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Upcoming List (Alternative View) */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6">
        <h3 className="font-bold text-slate-900 mb-4">Upcoming Next 7 Days</h3>
        <div className="space-y-4">
          <div className="flex items-center gap-4 p-4 rounded-xl border border-slate-100 hover:border-indigo-100 transition-colors">
            <div className="w-12 h-12 rounded-xl bg-amber-50 flex flex-col items-center justify-center text-amber-600">
              <span className="text-xs font-bold uppercase">May</span>
              <span className="text-lg font-bold leading-none">15</span>
            </div>
            <div className="flex-1">
              <h4 className="font-bold text-slate-900 text-sm">Clean Gutters</h4>
              <p className="text-xs text-slate-500">Maintenance • Home Exterior</p>
            </div>
            <div className="flex items-center gap-2">
              <span className="px-2 py-1 bg-amber-100 text-amber-700 rounded text-[10px] font-bold">URGENT</span>
              <button
                onClick={() => alert('Alert details clicked!')}
                className="p-2 text-slate-400 hover:text-slate-600 active:scale-90 transition-transform"
              >
                <AlertCircle size={18} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CalendarView;
