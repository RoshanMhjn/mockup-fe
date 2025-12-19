import { useEffect, useState } from "react";
import { useSearchParams, Link } from "react-router-dom";
import { CheckCircle } from "lucide-react";
import api from "../../services/api";
import { useAuthStore } from "../../store/authStore";
import { useSubscriptionStore } from "../../store/subscriptionStore";

export default function CheckoutSuccess() {
  const [params] = useSearchParams();
  const sessionId = params.get("session_id");

  const [status, setStatus] = useState("loading");

  useEffect(() => {
    useAuthStore.getState().fetchUser();
    useSubscriptionStore.getState().fetchSubscription();
  }, []);

  useEffect(() => {
    if (!sessionId) return;

    api
      .get(`/api/subscriptions/verify-session/?session_id=${sessionId}`)
      .then(() => setStatus("success"))
      .catch(() => setStatus("error"));
  }, [sessionId]);

  if (status === "loading") {
    return (
      <div className="flex min-h-screen items-center justify-center">
        Verifying your subscription…
      </div>
    );
  }

  if (status === "error") {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center">
        <p className="text-red-500">Something went wrong.</p>
        <Link to="/pricing" className="text-indigo-600">
          Back to pricing
        </Link>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen items-center justify-center px-4">
      <div className="max-w-md rounded-xl bg-white p-8 text-center shadow dark:bg-gray-900">
        <CheckCircle className="mx-auto h-14 w-14 text-green-500" />
        <h1 className="mt-4 text-2xl font-semibold dark:text-white">
          Payment successful
        </h1>
        <p className="mt-2 text-gray-600 dark:text-gray-400">
          Your subscription has been activated.
        </p>

        <Link
          to="/dashboard"
          className="mt-6 inline-block rounded-md bg-indigo-600 px-6 py-2 text-white"
        >
          Go to dashboard
        </Link>
      </div>
    </div>
  );
}
