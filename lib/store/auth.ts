import { create } from "zustand";
import { createClient } from "@/lib/supabase/client";

const supabase = createClient();

type AuthStore = {
  isAuthenticated: boolean;
  isLoaded: boolean; // ✅ New: tracks if auth state is checked
  setIsAuthenticated: (value: boolean) => void;
  setLoaded: (value: boolean) => void;
  checkAuth: () => Promise<void>;
};

export const useAuthStore = create<AuthStore>((set) => ({
  isAuthenticated: false,
  isLoaded: false,
  setIsAuthenticated: (value) => set({ isAuthenticated: value }),
  setLoaded: (value) => set({ isLoaded: value }),
  checkAuth: async () => {
    try {
      const { data } = await supabase.auth.getUser();
      set({ isAuthenticated: !!data.user, isLoaded: true });
    } catch {
      set({ isAuthenticated: false, isLoaded: true });
    }
  },
}));

// 🔔 Real-time sync (client-side only)
if (typeof window !== "undefined") {
  supabase.auth.onAuthStateChange((_event, session) => {
    useAuthStore.getState().setIsAuthenticated(!!session);
    useAuthStore.getState().setLoaded(true);
  });
}
