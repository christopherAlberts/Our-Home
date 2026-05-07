import { createContext } from 'react';
import type { Payment, GasBottle, DogMedication, HomeTask, ManualSection } from '../types';

export interface AppContextType {
  payments: Payment[];
  setPayments: React.Dispatch<React.SetStateAction<Payment[]>>;
  gasBottles: GasBottle[];
  setGasBottles: React.Dispatch<React.SetStateAction<GasBottle[]>>;
  dogMeds: DogMedication[];
  setDogMeds: React.Dispatch<React.SetStateAction<DogMedication[]>>;
  tasks: HomeTask[];
  setTasks: React.Dispatch<React.SetStateAction<HomeTask[]>>;
  manualSections: ManualSection[];
  setManualSections: React.Dispatch<React.SetStateAction<ManualSection[]>>;
  currency: string;
  setCurrency: React.Dispatch<React.SetStateAction<string>>;
  trackingFilter: 'all' | 'gas' | 'meds';
  setTrackingFilter: React.Dispatch<React.SetStateAction<'all' | 'gas' | 'meds'>>;
  addPayment: (payment: Omit<Payment, 'id' | 'paid'>) => void;
  removePayment: (id: string) => void;
  togglePaymentPaid: (id: string) => void;
  addTask: (task: Omit<HomeTask, 'id' | 'completed'>) => void;
  addManualSection: (title: string, iconName: string) => void;
  addManualItem: (sectionId: string, label: string, value: string) => void;
  updateManualItem: (sectionId: string, itemId: string, label: string, value: string) => void;
  removeManualItem: (sectionId: string, itemId: string) => void;
}

export const AppContext = createContext<AppContextType | undefined>(undefined);
