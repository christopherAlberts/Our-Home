import React, { useState } from 'react';
import {
  PhoneCall,
  ShieldCheck,
  Info,
  ExternalLink,
  Search,
  Wifi,
  Plus,
  X,
  Edit2,
  Trash2,
  Lock,
  User,
  Smartphone,
  Eye,
  EyeOff
} from 'lucide-react';
import { useAppContext } from '../context/useAppContext';

const HomeManual: React.FC = () => {
  const {
    manualSections,
    addManualSection,
    addManualItem,
    updateManualItem,
    removeManualItem
  } = useAppContext();

  const [searchQuery, setSearchQuery] = useState('');
  const [isSectionModalOpen, setIsSectionModalOpen] = useState(false);
  const [isItemModalOpen, setIsItemModalOpen] = useState(false);
  const [activeSectionId, setActiveSectionId] = useState<string | null>(null);
  const [editingItem, setEditingItem] = useState<{sectionId: string, item: { id: string, label: string, value: string }} | null>(null);

  const [newSection, setNewSection] = useState({ title: '', iconName: 'Info' });
  const [newItem, setNewItem] = useState({ label: '', value: '' });
  const [showValues, setShowValues] = useState<Record<string, boolean>>({});

  const iconMap: Record<string, React.ElementType> = {
    Wifi, PhoneCall, ShieldCheck, Info, Lock, User, Smartphone
  };

  const filteredSections = manualSections.map(section => ({
    ...section,
    items: section.items.filter(item =>
      item.label.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.value.toLowerCase().includes(searchQuery.toLowerCase())
    )
  })).filter(section => section.items.length > 0 || section.title.toLowerCase().includes(searchQuery.toLowerCase()));

  const handleAddSection = (e: React.FormEvent) => {
    e.preventDefault();
    addManualSection(newSection.title, newSection.iconName);
    setNewSection({ title: '', iconName: 'Info' });
    setIsSectionModalOpen(false);
  };

  const handleAddItem = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingItem) {
      updateManualItem(editingItem.sectionId, editingItem.item.id, newItem.label, newItem.value);
    } else if (activeSectionId) {
      addManualItem(activeSectionId, newItem.label, newItem.value);
    }
    setNewItem({ label: '', value: '' });
    setIsItemModalOpen(false);
    setEditingItem(null);
  };

  const toggleValueVisibility = (itemId: string) => {
    setShowValues(prev => ({ ...prev, [itemId]: !prev[itemId] }));
  };

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-slate-900">Home Manual</h2>
          <p className="text-sm text-slate-500">Essential information and emergency contacts</p>
        </div>
        <div className="flex items-center gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search manual..."
              className="pl-10 pr-4 py-2 bg-white border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none w-full md:w-64"
            />
          </div>
          <button
            onClick={() => setIsSectionModalOpen(true)}
            className="flex items-center gap-2 bg-indigo-600 text-white px-4 py-2 rounded-xl text-sm font-medium hover:bg-indigo-700 transition-colors shadow-lg shadow-indigo-100 active:scale-95 transition-transform"
          >
            <Plus size={18} />
            Add Section
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredSections.map((section) => {
          const IconComponent = iconMap[section.iconName] || Info;
          return (
            <div key={section.id} className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden flex flex-col group/section">
              <div className="p-6 border-b border-slate-50 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-indigo-50 text-indigo-600 rounded-lg">
                    <IconComponent size={20} />
                  </div>
                  <h3 className="font-bold text-slate-900">{section.title}</h3>
                </div>
                <button
                  onClick={() => { setActiveSectionId(section.id); setIsItemModalOpen(true); }}
                  className="p-1.5 text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-all opacity-0 group-hover/section:opacity-100"
                >
                  <Plus size={18} />
                </button>
              </div>
              <div className="p-6 space-y-5 flex-1">
                {section.items.length === 0 && (
                  <div className="text-center py-4 text-slate-400 text-sm italic">No items yet</div>
                )}
                {section.items.map((item) => (
                  <div key={item.id} className="group/item">
                    <div className="flex justify-between items-start mb-1">
                      <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">{item.label}</div>
                      <div className="flex items-center gap-1 opacity-0 group-hover/item:opacity-100 transition-opacity">
                        <button
                          onClick={() => {
                            setEditingItem({ sectionId: section.id, item });
                            setNewItem({ label: item.label, value: item.value });
                            setIsItemModalOpen(true);
                          }}
                          className="p-1 text-slate-300 hover:text-indigo-500"
                        >
                          <Edit2 size={12} />
                        </button>
                        <button
                          onClick={() => removeManualItem(section.id, item.id)}
                          className="p-1 text-slate-300 hover:text-red-500"
                        >
                          <Trash2 size={12} />
                        </button>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-semibold text-slate-700">
                        {section.iconName === 'Lock' && !showValues[item.id] ? '••••••••' : item.value}
                      </span>
                      <div className="flex items-center gap-2">
                        {section.iconName === 'Lock' && (
                          <button
                            onClick={() => toggleValueVisibility(item.id)}
                            className="text-slate-300 hover:text-slate-500 transition-all"
                          >
                            {showValues[item.id] ? <EyeOff size={14} /> : <Eye size={14} />}
                          </button>
                        )}
                        <button
                          onClick={() => {
                            navigator.clipboard.writeText(item.value);
                            alert('Copied to clipboard!');
                          }}
                          className="text-slate-300 hover:text-indigo-500 transition-all active:scale-90"
                        >
                          <ExternalLink size={14} />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>

      {/* Add Section Modal */}
      {isSectionModalOpen && (
        <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-3xl w-full max-w-md overflow-hidden shadow-2xl">
            <div className="p-6 border-b border-slate-100 flex justify-between items-center bg-slate-50/50">
              <h3 className="font-bold text-slate-900 text-lg">Add New Section</h3>
              <button onClick={() => setIsSectionModalOpen(false)} className="text-slate-400 hover:text-slate-600">
                <X size={24} />
              </button>
            </div>
            <form onSubmit={handleAddSection} className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-1">Section Title</label>
                <input
                  type="text"
                  required
                  value={newSection.title}
                  onChange={(e) => setNewSection({ ...newSection, title: e.target.value })}
                  placeholder="e.g. Passwords, Contacts"
                  className="w-full px-4 py-2 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none"
                />
              </div>
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-1">Icon</label>
                <div className="grid grid-cols-4 gap-2">
                  {Object.keys(iconMap).map(iconName => {
                    const Icon = iconMap[iconName];
                    return (
                      <button
                        key={iconName}
                        type="button"
                        onClick={() => setNewSection({ ...newSection, iconName })}
                        className={`p-3 rounded-xl border flex items-center justify-center transition-all ${
                          newSection.iconName === iconName
                          ? 'bg-indigo-50 border-indigo-200 text-indigo-600'
                          : 'border-slate-100 text-slate-400 hover:bg-slate-50'
                        }`}
                      >
                        <Icon size={20} />
                      </button>
                    );
                  })}
                </div>
              </div>
              <button
                type="submit"
                className="w-full py-3 bg-indigo-600 text-white font-bold rounded-xl hover:bg-indigo-700 transition-colors shadow-lg shadow-indigo-100"
              >
                Create Section
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Add/Edit Item Modal */}
      {isItemModalOpen && (
        <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-3xl w-full max-w-md overflow-hidden shadow-2xl">
            <div className="p-6 border-b border-slate-100 flex justify-between items-center bg-slate-50/50">
              <h3 className="font-bold text-slate-900 text-lg">
                {editingItem ? 'Edit Item' : 'Add New Item'}
              </h3>
              <button
                onClick={() => { setIsItemModalOpen(false); setEditingItem(null); setNewItem({ label: '', value: '' }); }}
                className="text-slate-400 hover:text-slate-600"
              >
                <X size={24} />
              </button>
            </div>
            <form onSubmit={handleAddItem} className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-1">Label</label>
                <input
                  type="text"
                  required
                  value={newItem.label}
                  onChange={(e) => setNewItem({ ...newItem, label: e.target.value })}
                  placeholder="e.g. Netflix Password, Plumber Number"
                  className="w-full px-4 py-2 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none"
                />
              </div>
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-1">Value</label>
                <input
                  type="text"
                  required
                  value={newItem.value}
                  onChange={(e) => setNewItem({ ...newItem, value: e.target.value })}
                  placeholder="The actual information..."
                  className="w-full px-4 py-2 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none"
                />
              </div>
              <button
                type="submit"
                className="w-full py-3 bg-indigo-600 text-white font-bold rounded-xl hover:bg-indigo-700 transition-colors shadow-lg shadow-indigo-100"
              >
                {editingItem ? 'Update Item' : 'Add Item'}
              </button>
            </form>
          </div>
        </div>
      )}

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
