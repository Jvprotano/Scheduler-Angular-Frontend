export interface TimeInterval {
  start: string;
  end: string;
}

export interface DaySchedule {
  dayOfWeek: number;
  isOpen: boolean;
  intervals: TimeInterval[];
}

export interface BusinessHours {
  id?: string;
  companyId?: string;
  schedule: DaySchedule[];
}

export const DAYS_OF_WEEK = [
  { id: 0, name: 'Domingo' },
  { id: 1, name: 'Segunda-feira' },
  { id: 2, name: 'Terça-feira' },
  { id: 3, name: 'Quarta-feira' },
  { id: 4, name: 'Quinta-feira' },
  { id: 5, name: 'Sexta-feira' },
  { id: 6, name: 'Sábado' },
];
