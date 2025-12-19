import { Check, X } from "lucide-react";
import { Link } from "react-router-dom";

const plans = [
  {
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
    cta: "Get started",
    highlighted: false,
  },
  {
    name: "Pro",
    price: "$19.99",
    period: "/month",
    description: "Best for solo creators",
    features: [
      { label: "100 mockups / month", included: true },
      { label: "HD export", included: true },
      { label: "Remove watermark", included: true },
      { label: "Premium templates", included: false },
    ],
    cta: "Upgrade to Pro",
    highlighted: true,
  },
  {
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
    cta: "Contact sales",
    highlighted: false,
  },
];

export default function PricingSection() {
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
              key={plan.name}
              className={`relative rounded-2xl border p-6 shadow-sm transition ${
                plan.highlighted
                  ? "border-indigo-600 bg-white shadow-lg dark:bg-gray-900"
                  : "border-gray-200 bg-white dark:border-gray-800 dark:bg-gray-900"
              }`}
            >
              {plan.highlighted && (
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-indigo-600 px-3 py-1 text-xs font-medium text-white">
                  Most popular
                </span>
              )}

              {/* Plan name */}
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                {plan.name}
              </h3>

              <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
                {plan.description}
              </p>

              {/* Price */}
              <div className="mt-6 flex items-end gap-1">
                <span className="text-4xl font-bold text-gray-900 dark:text-white">
                  {plan.price}
                </span>
                <span className="text-sm text-gray-500 dark:text-gray-400">
                  {plan.period}
                </span>
              </div>

              {/* Features */}
              <ul className="mt-6 space-y-3">
                {plan.features.map((feature) => (
                  <li key={feature.label} className="flex items-center gap-3">
                    {feature.included ? (
                      <Check className="h-5 w-5 text-indigo-600" />
                    ) : (
                      <X className="h-5 w-5 text-gray-400" />
                    )}
                    <span
                      className={`text-sm ${
                        feature.included
                          ? "text-gray-700 dark:text-gray-300"
                          : "text-gray-400"
                      }`}
                    >
                      {feature.label}
                    </span>
                  </li>
                ))}
              </ul>

              {/* CTA */}
              <Link
                to="/register"
                className={`mt-8 block w-full rounded-md px-4 py-2.5 text-center text-sm font-medium transition ${
                  plan.highlighted
                    ? "bg-indigo-600 text-white hover:bg-indigo-700"
                    : "border border-gray-300 text-gray-700 hover:bg-gray-100 dark:border-gray-700 dark:text-gray-300 dark:hover:bg-gray-800"
                }`}
              >
                {plan.cta}
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
