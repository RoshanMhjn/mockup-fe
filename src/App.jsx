import React, { useEffect } from "react";
import Header from "./components/layout/Header";
import Hero from "./components/Hero";
import { Route, Routes } from "react-router-dom";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import { ConfigProvider, theme as antdTheme } from "antd";
import { useThemeStore } from "./store/themeStore";
import PricingSection from "./components/pricing/PricingSection";
import { useAuthStore } from "./store/authStore";
import { useSubscriptionStore } from "./store/subscriptionStore";
import Footer from "./components/layout/Footer";
import CheckoutSuccess from "./pages/billing/CheckoutSuccess";

export function AppWrapper({ children }) {
  const { theme } = useThemeStore();

  return (
    <ConfigProvider
      theme={{
        algorithm:
          theme === "dark"
            ? antdTheme.darkAlgorithm
            : antdTheme.defaultAlgorithm,
        token: {
          colorPrimary: "#4f46e5",
          borderRadius: 8,
        },
      }}
    >
      {children}
    </ConfigProvider>
  );
}

const App = () => {
  const fetchUser = useAuthStore((s) => s.fetchUser);
  const fetchSubscription = useSubscriptionStore((s) => s.fetchSubscription);

  useEffect(() => {
    fetchUser().then(() => {
      fetchSubscription();
    });
  }, []);

  return (
    <div>
      <Header />
      <div className="flex-1">
        <Routes>
          <Route path="/" element={<Hero />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/pricing" element={<PricingSection />} />
          <Route path="/billing/success" element={<CheckoutSuccess />} />
        </Routes>
      </div>
      <Footer />
    </div>
  );
};

export default App;
