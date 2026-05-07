import React from 'react';
import {
  Flame,
  Dog,
  Calendar,
  RefreshCw,
  AlertCircle,
  History,
  CheckCircle2
} from 'lucide-react';
import { mockGasBottles, mockDogMeds } from '../services/data';
import { format, differenceInDays } from 'date-fns';

const Tracking: React.FC = () => {
  const gasBottles = mockGasBottles;
  const dogMeds = mockDogMeds;

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Gas Bottles Section */}
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
                <Flame className="text-orange-500" size={24} />
                Gas Bottles
              </h2>
              <p className="text-sm text-slate-500">Managing two bottles in rotation</p>
            </div>
            <button
              onClick={() => alert('View History clicked!')}
              className="text-indigo-600 text-sm font-semibold hover:underline active:scale-95 transition-transform"
            >
              View History
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {gasBottles.map((bottle) => {
              const daysSinceChange = differenceInDays(new Date(), new Date(bottle.changeDate));
              const percentageLeft = Math.max(0, 100 - (daysSinceChange / 90) * 100);

              return (
                <div key={bottle.id} className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm relative overflow-hidden group">
                  <div className="absolute top-0 right-0 p-4">
                    <span className={`text-[10px] font-bold px-2 py-1 rounded-full uppercase ${percentageLeft < 20 ? 'bg-red-100 text-red-700' : 'bg-slate-100 text-slate-600'}`}>
                      Bottle {bottle.bottleNumber}
                    </span>
                  </div>

                  <div className="flex flex-col items-center mb-6">
                    <div className="relative w-16 h-24 mb-4">
                      {/* Bottle Visual */}
                      <div className="absolute inset-0 bg-slate-100 rounded-lg border-2 border-slate-200"></div>
                      <div
                        className={`absolute bottom-0 inset-x-0 transition-all duration-1000 rounded-b-lg ${percentageLeft < 20 ? 'bg-red-400' : 'bg-indigo-400'}`}
                        style={{ height: `${percentageLeft}%` }}
                      ></div>
                      <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-6 h-3 bg-slate-400 rounded-t-sm"></div>
                    </div>
                    <div className="text-2xl font-bold text-slate-900">{Math.round(percentageLeft)}%</div>
                    <div className="text-xs text-slate-500 font-medium uppercase tracking-wider">Estimated Level</div>
                  </div>

                  <div className="space-y-3">
                    <div className="flex justify-between text-sm">
                      <span className="text-slate-500">Last Changed</span>
                      <span className="font-semibold text-slate-900">{format(new Date(bottle.changeDate), 'MMM d, yyyy')}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-slate-500">Next Change (Est)</span>
                      <span className="font-semibold text-indigo-600">{format(new Date(bottle.estimatedExpiryDate), 'MMM d, yyyy')}</span>
                    </div>
                  </div>

                  <button
                    onClick={() => alert(`Mark Bottle ${bottle.bottleNumber} as Replaced clicked!`)}
                    className="w-full mt-6 flex items-center justify-center gap-2 py-2 bg-slate-50 hover:bg-slate-100 text-slate-600 rounded-xl transition-all text-sm font-semibold border border-slate-200 active:scale-95"
                  >
                    <RefreshCw size={16} />
                    Mark as Replaced
                  </button>
                </div>
              );
            })}
          </div>
        </div>

        {/* Dog Medication Section */}
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
                <Dog className="text-amber-600" size={24} />
                Dog Medication
              </h2>
              <p className="text-sm text-slate-500">Flea and tick protection</p>
            </div>
            <button
              onClick={() => alert('Log History clicked!')}
              className="text-indigo-600 text-sm font-semibold hover:underline active:scale-95 transition-transform"
            >
              Log History
            </button>
          </div>

          <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm">
            <div className="flex items-center gap-4 mb-8">
              <div className="w-16 h-16 rounded-full bg-amber-50 flex items-center justify-center text-amber-600 border-4 border-white shadow-md">
                <Dog size={32} />
              </div>
              <div>
                <h3 className="font-bold text-slate-900 text-lg">Next Dose Due</h3>
                <div className="flex items-center gap-2 text-indigo-600">
                  <Calendar size={16} />
                  <span className="font-semibold">{format(new Date(dogMeds[0].nextDueDate), 'MMMM d, yyyy')}</span>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-white rounded-lg text-slate-600 border border-slate-100 shadow-sm">
                    <History size={20} />
                  </div>
                  <div>
                    <div className="text-sm font-bold text-slate-900">Last Dose</div>
                    <div className="text-xs text-slate-500">{format(new Date(dogMeds[0].dateAdministered), 'MMM d, yyyy')}</div>
                  </div>
                </div>
                <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-full uppercase">Administered</span>
              </div>

              <div className="bg-indigo-600 p-6 rounded-2xl text-white shadow-lg shadow-indigo-200 relative overflow-hidden group">
                <div className="relative z-10">
                  <h4 className="font-bold text-lg mb-1">Time for a new dose?</h4>
                  <p className="text-indigo-100 text-sm mb-4">Keeping our furry friend healthy is the top priority.</p>
                  <button
                    onClick={() => alert('Dog Meds: Administered clicked!')}
                    className="w-full bg-white text-indigo-600 font-bold py-2.5 rounded-xl text-sm flex items-center justify-center gap-2 shadow-sm active:scale-[0.98] transition-transform"
                  >
                    <CheckCircle2 size={18} />
                    I've Administered It
                  </button>
                </div>
                <Dog size={120} className="absolute -right-8 -bottom-8 text-indigo-500 opacity-20 transform -rotate-12 group-hover:rotate-0 transition-transform duration-500" />
              </div>
            </div>

            <div className="mt-8 flex items-start gap-3 p-4 bg-amber-50 rounded-2xl border border-amber-100">
              <AlertCircle className="text-amber-600 mt-0.5" size={20} />
              <div className="text-xs text-amber-800 leading-relaxed">
                <strong>Important Note:</strong> Combined flea and tick medication should be administered every 30 days for maximum effectiveness.
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Tracking;
