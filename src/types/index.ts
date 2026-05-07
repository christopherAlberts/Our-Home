export type PaymentCategory = 'House' | 'Insurance' | 'Electricity' | 'Water' | 'Manfred' | 'Elrita';

export interface Payment {
  id: string;
  category: PaymentCategory;
  amount: number;
  date: string; // ISO format
  paid: boolean;
  notes?: string;
}

export interface GasBottle {
  id: string;
  bottleNumber: 1 | 2;
  changeDate: string;
  estimatedExpiryDate: string;
}

export interface DogMedication {
  id: string;
  type: 'Flea' | 'Tick' | 'Combined';
  dateAdministered: string;
  nextDueDate: string;
}

export interface HomeTask {
  id: string;
  title: string;
  dueDate: string;
  completed: boolean;
  category: 'Maintenance' | 'Reminder' | 'Other';
}

export interface DashboardStats {
  monthlyBudget: number;
  spentThisMonth: number;
  gasBottleLevel: number; // percentage
  nextDogMedDate: string;
}
