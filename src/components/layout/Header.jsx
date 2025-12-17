import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, Moon, Sun } from "lucide-react";
import { useThemeStore } from "../../store/themeStore";
import { motion } from "framer-motion";

const tabs = [
  { label: "Home", path: "/" },
  { label: "Mockups", path: "/mockups" },
  { label: "Pricing", path: "/pricing" },
];

export default function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { theme, toggleTheme } = useThemeStore();
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-50 transition-all ${
        scrolled
          ? "bg-white/80 dark:bg-gray-900/80 backdrop-blur border-b border-gray-200 dark:border-gray-800"
          : "bg-transparent"
      }`}
    >
      <div className="mx-auto max-w-7xl px-4">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link
            className="text-xl font-semibold tracking-tight text-gray-900 dark:text-white"
            to="/"
          >
            Kagazzy
          </Link>

          {/* Desktop Tabs */}
          <nav className="hidden md:flex relative gap-1 rounded-full bg-gray-100 dark:bg-gray-800 p-1">
            {tabs.map((tab) => {
              const active = location.pathname === tab.path;

              return (
                <Link
                  key={tab.path}
                  to={tab.path}
                  className="relative px-4 py-1.5 text-sm font-medium"
                >
                  {active && (
                    <motion.div
                      layoutId="nav-pill"
                      className="absolute inset-0 rounded-full bg-white dark:bg-gray-700 shadow-sm"
                      transition={{
                        type: "spring",
                        stiffness: 500,
                        damping: 35,
                      }}
                    />
                  )}

                  <span
                    className={`relative z-10 transition-colors ${
                      active
                        ? "text-indigo-600 dark:text-indigo-400"
                        : "text-gray-600 dark:text-gray-300 hover:text-indigo-600"
                    }`}
                  >
                    {tab.label}
                  </span>
                </Link>
              );
            })}
          </nav>

          {/* Right Actions */}
          <div className="hidden md:flex items-center gap-3">
            {/* Theme toggle */}
            <button
              onClick={toggleTheme}
              aria-label="Toggle theme"
              className="relative h-7 w-14 rounded-full bg-gray-200 dark:bg-gray-700 transition-colors"
            >
              <motion.div
                className="absolute top-0.5 left-0.5 h-6 w-6 rounded-full bg-white shadow-md flex items-center justify-center"
                animate={{ x: theme === "dark" ? 28 : 0 }}
                transition={{ type: "spring", stiffness: 500, damping: 30 }}
              >
                {theme === "dark" ? (
                  <Sun size={12} className="text-gray-900" />
                ) : (
                  <Moon size={12} className="text-gray-900" />
                )}
              </motion.div>
            </button>

            <Link to="/login" className="text-sm dark:text-gray-300">
              Login
            </Link>
            <Link
              to="/register"
              className="rounded-md bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-700"
            >
              Sign up
            </Link>
          </div>

          {/* Mobile toggle */}
          <button onClick={() => setOpen(!open)} className="md:hidden">
            {open ? (
              <X className="dark:text-white" />
            ) : (
              <Menu className="dark:text-white" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {open && (
        <motion.div
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          className="md:hidden border-t border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900"
        >
          <div className="flex flex-col gap-4 p-4">
            {tabs.map((tab) => (
              <Link
                key={tab.path}
                to={tab.path}
                onClick={() => setOpen(false)}
                className="rounded-md px-3 py-2 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800"
              >
                {tab.label}
              </Link>
            ))}

            <div className="flex items-center justify-between pt-3 border-t border-gray-200 dark:border-gray-800">
              <button
                onClick={toggleTheme}
                aria-label="Toggle theme"
                className="relative h-7 w-14 rounded-full bg-gray-200 dark:bg-gray-700 transition-colors"
              >
                <motion.div
                  className="absolute top-0.5 left-0.5 h-6 w-6 rounded-full bg-white shadow-md flex items-center justify-center"
                  animate={{ x: theme === "dark" ? 28 : 0 }}
                  transition={{ type: "spring", stiffness: 500, damping: 30 }}
                >
                  {theme === "dark" ? (
                    <Sun size={12} className="text-gray-900" />
                  ) : (
                    <Moon size={12} className="text-gray-900" />
                  )}
                </motion.div>
              </button>
              <div className="flex gap-3 dark:text-white">
                <Link to="/login">Login</Link>
                <Link to="/register">Sign up</Link>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </header>
  );
}
