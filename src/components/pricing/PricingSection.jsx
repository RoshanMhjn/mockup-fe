import { Check, X } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../../store/authStore";
import { useSubscriptionStore } from "../../store/subscriptionStore";
import {
  createCheckoutSession,
  openCustomerPortal,
} from "../../services/subscriptionApi";

const plans = [
  {
    code: "free",
    name: "Free",
    price: "$0",
    period: "forever",
    description: "For trying out Kagazzy",
    features: [
      { label: "20 mockups / month", included: true },
      { label: "HD export", included: false },
      { label: "Remove watermark", included: false },
      { label: "Premium templates", included: false },
    ],
  },
  {
    code: "pro",
    name: "Pro",
    price: "$19.99",
    period: "/month",
    description: "Best for solo creators",
    highlighted: true,
    features: [
      { label: "100 mockups / month", included: true },
      { label: "HD export", included: true },
      { label: "Remove watermark", included: true },
      { label: "Premium templates", included: false },
    ],
  },
  {
    code: "team",
    name: "Team",
    price: "$99.99",
    period: "/month",
    description: "For teams and agencies",
    features: [
      { label: "5000 mockups / month", included: true },
      { label: "HD export", included: true },
      { label: "Remove watermark", included: true },
      { label: "Premium templates", included: true },
    ],
  },
];

export default function PricingSection() {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuthStore();
  const { subscription } = useSubscriptionStore();

  const currentPlan = subscription?.plan;

  const handleCTA = async (planCode) => {
    if (!isAuthenticated) {
      navigate("/register");
      return;
    }

    if (currentPlan === planCode) {
      const res = await openCustomerPortal();
      window.location.assign(res.data.url);
      return;
    }

    const res = await createCheckoutSession(planCode);
    window.location.assign(res.data.checkout_url);
  };

  const getButtonLabel = (planCode) => {
    if (!isAuthenticated) return "Get started";
    if (currentPlan === planCode) return "Manage plan";
    if (planCode === "free") return "Current plan";
    return "Upgrade";
  };

  const isDisabled = (planCode) =>
    isAuthenticated && currentPlan === planCode && planCode === "free";

  return (
    <section className="py-24">
      <div className="mx-auto max-w-7xl px-4">
        {/* Header */}
        <div className="mb-14 text-center">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
            Simple, transparent pricing
          </h2>
          <p className="mt-3 text-gray-600 dark:text-gray-400">
            Choose the plan that fits your workflow
          </p>
        </div>

        {/* Plans */}
        <div className="grid gap-8 md:grid-cols-3">
          {plans.map((plan) => (
            <div
              key={plan.code}
              className={`relative rounded-2xl border p-6 shadow-sm ${
                plan.highlighted
                  ? "border-indigo-600 shadow-lg"
                  : "border-gray-200 dark:border-gray-800"
              } bg-white dark:bg-gray-900`}
            >
              {plan.highlighted && (
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-indigo-600 px-3 py-1 text-xs text-white">
                  Most popular
                </span>
              )}

              <h3 className="text-xl font-semibold dark:text-white">
                {plan.name}
              </h3>

              <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
                {plan.description}
              </p>

              <div className="mt-6 flex items-end gap-1">
                <span className="text-4xl font-bold dark:text-white">
                  {plan.price}
                </span>
                <span className="text-sm text-gray-500">{plan.period}</span>
              </div>

              <ul className="mt-6 space-y-3">
                {plan.features.map((feature) => (
                  <li key={feature.label} className="flex items-center gap-3">
                    {feature.included ? (
                      <Check className="text-indigo-600" />
                    ) : (
                      <X className="text-gray-400" />
                    )}
                    <span className="text-sm text-gray-600 dark:text-gray-300">
                      {feature.label}
                    </span>
                  </li>
                ))}
              </ul>

              <button
                disabled={isDisabled(plan.code)}
                onClick={() => handleCTA(plan.code)}
                className={`mt-8 w-full rounded-md py-2.5 text-sm font-medium transition ${
                  plan.highlighted
                    ? "bg-indigo-600 text-white hover:bg-indigo-700"
                    : "border border-gray-300 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-800"
                } disabled:cursor-not-allowed disabled:opacity-60`}
              >
                {getButtonLabel(plan.code)}
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
