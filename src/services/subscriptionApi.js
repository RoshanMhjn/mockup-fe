import api from "./api";

export const getPlans = () => api.get("/api/subscriptions/plans/");

export const createCheckoutSession = (plan) =>
  api.post("/api/subscriptions/checkout/", { plan });

export const openCustomerPortal = () => api.post("/api/subscriptions/portal/");
