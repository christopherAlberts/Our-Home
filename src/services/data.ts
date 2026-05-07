import type { Payment, GasBottle, DogMedication, HomeTask } from '../types';
import { startOfMonth, format } from 'date-fns';

const currentMonth = startOfMonth(new Date());

export const mockPayments: Payment[] = [
  { id: '1', category: 'House', amount: 2500, date: format(currentMonth, 'yyyy-MM-dd'), paid: true },
  { id: '2', category: 'Insurance', amount: 300, date: format(currentMonth, 'yyyy-MM-dd'), paid: true },
  { id: '3', category: 'Electricity', amount: 150, date: format(currentMonth, 'yyyy-MM-dd'), paid: false },
  { id: '4', category: 'Water', amount: 80, date: format(currentMonth, 'yyyy-MM-dd'), paid: false },
  { id: '5', category: 'Manfred', amount: 1000, date: format(currentMonth, 'yyyy-MM-dd'), paid: true },
  { id: '6', category: 'Elrita', amount: 1000, date: format(currentMonth, 'yyyy-MM-dd'), paid: true },
];

export const mockGasBottles: GasBottle[] = [
  { id: 'g1', bottleNumber: 1, changeDate: '2025-03-15', estimatedExpiryDate: '2025-06-15' },
  { id: 'g2', bottleNumber: 2, changeDate: '2025-05-01', estimatedExpiryDate: '2025-08-01' },
];

export const mockDogMeds: DogMedication[] = [
  { id: 'd1', type: 'Combined', dateAdministered: '2025-04-20', nextDueDate: '2025-05-20' },
];

export const mockTasks: HomeTask[] = [
  { id: 't1', title: 'Clean gutters', dueDate: '2025-05-15', completed: false, category: 'Maintenance' },
  { id: 't2', title: 'Service Generator', dueDate: '2025-06-01', completed: false, category: 'Maintenance' },
];
