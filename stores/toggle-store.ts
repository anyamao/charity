import { create } from "zustand";

interface ToggleState {
  MenuOn: boolean;
  toggleMenu: () => void;
}

export const useToggleStore = create<ToggleState>((set) => ({
  MenuOn: false,
  toggleMenu: () => set((state) => ({ MenuOn: !state.MenuOn })),
}));
