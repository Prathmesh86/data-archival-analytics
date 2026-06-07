import { create } from 'zustand';

type FilterState = {
  startDate: string;
  endDate: string;
  setStartDate: (value: string) => void;
  setEndDate: (value: string) => void;
};

export const useFilterStore = create<FilterState>((set) => ({
  startDate: '',
  endDate: '',
  setStartDate: (value) => set({ startDate: value }),
  setEndDate: (value) => set({ endDate: value }),
}));
