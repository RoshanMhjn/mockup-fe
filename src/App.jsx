import React from "react";
import Header from "./components/layout/Header";
import Hero from "./components/Hero";
import { Route, Routes } from "react-router-dom";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import { ConfigProvider, theme as antdTheme } from "antd";
import { useThemeStore } from "./store/themeStore";
import PricingSection from "./components/pricing/PricingSection";

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
  return (
    <div>
      <Header />
      <Routes>
        <Route path="/" element={<Hero />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/pricing" element={<PricingSection />} />
      </Routes>
    </div>
  );
};

export default App;
