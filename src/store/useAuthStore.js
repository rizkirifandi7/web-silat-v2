import { create } from "zustand";
import { getProfile } from "@/lib/api/auth";
import Cookies from "js-cookie";

const COOKIE_OPTIONS = {
  expires: 7, // 7 days
  path: "/",
  sameSite: "lax",
};

const useAuthStore = create((set) => ({
  user: null,
  isAuthenticated: false,
  isLoading: true, // start as true so AuthProvider shows loading on mount
  error: null,

  setAuth: (user) => {
    // Set user_role cookie for Next.js middleware
    Cookies.set("user_role", user.role, COOKIE_OPTIONS);

    set({
      user,
      isAuthenticated: true,
      isLoading: false,
      error: null,
    });
  },

  logout: async () => {
    try {
      // Use the proxy path to reach the backend
      await fetch("/api/proxy/auth/logout", {
        method: "POST",
        credentials: "include",
      });
    } catch {
      // Ignore errors — we still want to clear local state
    }

    // Clear cookies
    Cookies.remove("user_role", { path: "/" });

    set({ user: null, isAuthenticated: false, isLoading: false, error: null });
  },

  checkAuth: async () => {
    set({ isLoading: true });
    try {
      const response = await getProfile();
      const user = response.data.data || response.data;

      // Sync user_role cookie
      Cookies.set("user_role", user.role, COOKIE_OPTIONS);

      set({
        user,
        isAuthenticated: true,
        isLoading: false,
      });
    } catch (error) {
      // Token invalid or expired — clear everything
      Cookies.remove("user_role", { path: "/" });

      set({
        user: null,
        isAuthenticated: false,
        isLoading: false,
      });
    }
  },
}));

export default useAuthStore;
