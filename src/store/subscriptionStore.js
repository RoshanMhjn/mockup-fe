import { create } from "zustand";
import api from "../services/api";

export const useSubscriptionStore = create((set) => ({
  subscription: null,
  limits: null,
  usage: null,
  loading: false,

  fetchSubscription: async () => {
    try {
      set({ loading: true });

      const [sub, limits, usage] = await Promise.all([
        api.get("/api/subscriptions/me/"),
        api.get("/api/subscriptions/limits/"),
        api.get("/api/subscriptions/usage/"),
      ]);

      set({
        subscription: sub.data,
        limits: limits.data,
        usage: usage.data,
      });
    } catch {
      set({
        subscription: null,
        limits: null,
        usage: null,
      });
    } finally {
      set({ loading: false });
    }
  },

  upgradePlan: async (planCode) => {
    await api.post("/api/subscriptions/upgrade/", {
      plan_code: planCode,
    });

    await useSubscriptionStore.getState().fetchSubscription();
  },
}));
