import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, Moon, Sun } from "lucide-react";
import { useThemeStore } from "../../store/themeStore";

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
          ? "bg-white/80 dark:bg-gray-900/80 backdrop-blur border-b"
          : "bg-transparent"
      }`}
    >
      <div className="mx-auto max-w-7xl px-4">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link
            className="text-xl font-bold text-gray-900 dark:text-white"
            to="/"
          >
            Kagazzy
          </Link>

          {/* Desktop Tabs */}
          <nav className="hidden md:flex gap-2 rounded-full bg-gray-100 dark:bg-gray-800 p-1">
            {tabs.map((tab) => {
              const active = location.pathname === tab.path;
              return (
                <Link
                  key={tab.path}
                  to={tab.path}
                  className={`px-4 py-1.5 text-sm rounded-full transition
                    ${
                      active
                        ? "bg-white dark:bg-gray-700 shadow text-indigo-600 dark:text-indigo-400"
                        : "text-gray-600 dark:text-gray-300 hover:text-indigo-600"
                    }`}
                >
                  {tab.label}
                </Link>
              );
            })}
          </nav>

          {/* Right Actions */}
          <div className="hidden md:flex items-center gap-3">
            {/* Theme toggle */}
            <button
              onClick={toggleTheme}
              className="rounded-md p-2 hover:bg-gray-100 dark:hover:bg-gray-800"
            >
              {theme === "dark" ? (
                <Sun size={20} className="text-white" />
              ) : (
                <Moon size={20} />
              )}
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
            {open ? <X /> : <Menu />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {open && (
        <div className="md:hidden border-t bg-white dark:bg-gray-900">
          <div className="flex flex-col gap-4 p-4">
            {tabs.map((tab) => (
              <Link key={tab.path} to={tab.path} onClick={() => setOpen(false)}>
                {tab.label}
              </Link>
            ))}

            <div className="flex items-center justify-between pt-2 border-t">
              <button onClick={toggleTheme} className="flex items-center gap-2">
                {theme === "dark" ? <Sun size={18} /> : <Moon size={18} />}
                Theme
              </button>
              <div className="flex gap-3">
                <Link to="/login">Login</Link>
                <Link to="/register" className="font-semibold">
                  Sign up
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
