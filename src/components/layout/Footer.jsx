import { Link } from "react-router-dom";
import { useAuthStore } from "../../store/authStore";
import { useSubscriptionStore } from "../../store/subscriptionStore";

export default function Footer() {
  const year = new Date().getFullYear();
  const { isAuthenticated } = useAuthStore();
  const subscription = useSubscriptionStore((s) => s.subscription);

  return (
    <footer className="border-t border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900">
      <div className="mx-auto max-w-7xl px-4 py-12">
        <div className="flex flex-col gap-8 md:flex-row md:items-center md:justify-between">
          {/* Brand */}
          <div className="space-y-2">
            <Link
              to="/"
              className="text-lg font-semibold tracking-tight text-gray-900 dark:text-white"
            >
              Kagazzy
            </Link>
            <p className="max-w-xs text-sm text-gray-600 dark:text-gray-400">
              Create professional mockups faster with powerful templates and
              exports.
            </p>
          </div>

          {/* Navigation */}
          <div className="flex flex-wrap gap-6 text-md dark:text-white">
            <Link to="/">Home</Link>
            <Link to="/pricing">Pricing</Link>

            {!isAuthenticated && (
              <>
                <Link to="/login">Login</Link>
                <Link to="/register">Sign up</Link>
              </>
            )}

            {isAuthenticated && subscription && (
              <span className="text-gray-500 dark:text-gray-400">
                Plan: {subscription.plan_name}
              </span>
            )}
          </div>

          {/* Meta */}
          <div className="text-sm text-gray-500 dark:text-gray-400">
            © {year} Kagazzy. All rights reserved.
          </div>
        </div>
      </div>
    </footer>
  );
}
