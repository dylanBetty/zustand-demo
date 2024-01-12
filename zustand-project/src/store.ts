import { create } from "zustand";

export type Store = {
  number: number;
  increaseNumber: () => void;
};

export const useStore = create<Store>((set) => ({
  number: 0,
  increaseNumber: () => set((state) => ({ number: state.number + 1 })),
}));
