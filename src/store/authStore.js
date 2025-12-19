import { create } from "zustand";

import api from "../services/api";

export const useAuthStore = create((set) => ({
  user: null,
  isAuthenticated: false,
  loading: false,

  fetchUser: async () => {
    try {
      set({ loading: true });
      const res = await api.get("/api/auth/user/");

      if (!res.data || !res.data.id) {
        set({ user: null, isAuthenticated: false });
        return;
      }

      set({
        user: res.data,
        isAuthenticated: true,
      });
    } catch {
      set({
        user: null,
        isAuthenticated: false,
      });
    } finally {
      set({ loading: false });
    }
  },

  login: async (email, password) => {
    set({ error: null });
    await api.post("/api/auth/login/", {
      email,
      password,
    });
    await useAuthStore.getState().fetchUser();
  },

  register: async (data) => {
    set({ error: null });
    await api.post("/api/auth/register/", data);
    await useAuthStore.getState().fetchUser();
  },

  logout: async () => {
    await api.post("/api/auth/logout/");
    set({ user: null, isAuthenticated: false });
  },
}));
