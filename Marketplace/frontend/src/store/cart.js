import { create } from 'zustand';

export const useCart = create((set) => ({
  totalItems: 0,
  set: (n) => set({ totalItems: n }),
}));
