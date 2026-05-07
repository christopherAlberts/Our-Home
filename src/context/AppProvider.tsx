import React, { useState } from 'react';
import type { Payment, GasBottle, DogMedication, HomeTask, ManualSection } from '../types';
import { mockPayments, mockGasBottles, mockDogMeds, mockTasks } from '../services/data';
import { AppContext } from './AppContext';

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [payments, setPayments] = useState<Payment[]>(mockPayments);
  const [gasBottles, setGasBottles] = useState<GasBottle[]>(mockGasBottles);
  const [dogMeds, setDogMeds] = useState<DogMedication[]>(mockDogMeds);
  const [tasks, setTasks] = useState<HomeTask[]>(mockTasks);
  const [currency, setCurrency] = useState('R');
  const [trackingFilter, setTrackingFilter] = useState<'all' | 'gas' | 'meds'>('all');

  const [manualSections, setManualSections] = useState<ManualSection[]>([
    {
      id: '1',
      title: 'Connectivity',
      iconName: 'Wifi',
      items: [
        { id: '1-1', label: 'Wi-Fi Name', value: 'Home_HighSpeed_5G' },
        { id: '1-2', label: 'Wi-Fi Password', value: 'happy-home-2025' },
        { id: '1-3', label: 'Fiber Provider', value: 'LinkAfrica (086 123 4567)' },
      ]
    },
    {
      id: '2',
      title: 'Emergency Contacts',
      iconName: 'PhoneCall',
      items: [
        { id: '2-1', label: 'Police', value: '10111' },
        { id: '2-2', label: 'Ambulance', value: '10177' },
        { id: '2-3', label: 'Security Co.', value: 'Chubb Security' },
      ]
    },
    {
      id: '3',
      title: 'Maintenance Info',
      iconName: 'ShieldCheck',
      items: [
        { id: '3-1', label: 'Plumber', value: 'Dave (082 555 1234)' },
        { id: '3-2', label: 'Electrician', value: 'Sarah (071 999 8888)' },
        { id: '3-3', label: 'Water Meter', value: 'Front left garden' },
      ]
    }
  ]);

  const addPayment = (payment: Omit<Payment, 'id' | 'paid'>) => {
    const newPayment: Payment = {
      ...payment,
      id: Math.random().toString(36).substr(2, 9),
      paid: false
    };
    setPayments([...payments, newPayment]);
  };

  const removePayment = (id: string) => {
    setPayments(payments.filter(p => p.id !== id));
  };

  const togglePaymentPaid = (id: string) => {
    setPayments(payments.map(p => p.id === id ? { ...p, paid: !p.paid } : p));
  };

  const addTask = (task: Omit<HomeTask, 'id' | 'completed'>) => {
    const newTask: HomeTask = {
      ...task,
      id: Math.random().toString(36).substr(2, 9),
      completed: false
    };
    setTasks([...tasks, newTask]);
  };

  const addManualSection = (title: string, iconName: string) => {
    const newSection: ManualSection = {
      id: Math.random().toString(36).substr(2, 9),
      title,
      iconName,
      items: []
    };
    setManualSections([...manualSections, newSection]);
  };

  const addManualItem = (sectionId: string, label: string, value: string) => {
    setManualSections(manualSections.map(section => {
      if (section.id === sectionId) {
        return {
          ...section,
          items: [...section.items, { id: Math.random().toString(36).substr(2, 9), label, value }]
        };
      }
      return section;
    }));
  };

  const updateManualItem = (sectionId: string, itemId: string, label: string, value: string) => {
    setManualSections(manualSections.map(section => {
      if (section.id === sectionId) {
        return {
          ...section,
          items: section.items.map(item => item.id === itemId ? { ...item, label, value } : item)
        };
      }
      return section;
    }));
  };

  const removeManualItem = (sectionId: string, itemId: string) => {
    setManualSections(manualSections.map(section => {
      if (section.id === sectionId) {
        return {
          ...section,
          items: section.items.filter(item => item.id !== itemId)
        };
      }
      return section;
    }));
  };

  return (
    <AppContext.Provider value={{
      payments, setPayments,
      gasBottles, setGasBottles,
      dogMeds, setDogMeds,
      tasks, setTasks,
      manualSections, setManualSections,
      currency, setCurrency,
      trackingFilter, setTrackingFilter,
      addPayment, removePayment, togglePaymentPaid,
      addTask,
      addManualSection, addManualItem, updateManualItem, removeManualItem
    }}>
      {children}
    </AppContext.Provider>
  );
};
