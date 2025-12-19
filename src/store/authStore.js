import { create } from "zustand";
import api from "../services/api";

export const useAuthStore = create((set) => ({
  user: null,
  isAuthenticated: false,
  loading: false,
  error: null,

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
    const res = await api.post("/api/auth/login/", {
      email,
      password,
    });

    const token = res.data.key;
    localStorage.setItem("authToken", token);

    api.defaults.headers.common.Authorization = `Token ${token}`;

    await useAuthStore.getState().fetchUser();
  },

  register: async (data) => {
    set({ error: null });
    const res = await api.post("/api/auth/register/", data);

    if (res.data.key) {
      localStorage.setItem("authToken", res.data.key);
      api.defaults.headers.common.Authorization = `Token ${res.data.key}`;
    }
    await useAuthStore.getState().fetchUser();
  },

  logout: async () => {
    await api.post("/api/auth/logout/");
    localStorage.removeItem("authToken");

    delete api.defaults.headers.common.Authorization;
    set({ user: null, isAuthenticated: false });
  },
}));
