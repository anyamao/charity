import { create } from "zustand";

type UIStore = {
  // Profile toggle
  showProfile: boolean;
  setShowProfile: (value: boolean) => void;
  toggleShowProfile: () => void;
};

export const useUIStore = create<UIStore>((set) => ({
  showProfile: false,
  setShowProfile: (value) => set({ showProfile: value }),
  toggleShowProfile: () =>
    set((state) => ({ showProfile: !state.showProfile })),
}));
