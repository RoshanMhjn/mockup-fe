import { motion } from "framer-motion";
import { Link } from "react-router-dom";

export default function Hero() {
  return (
    <section className="relative overflow-hidden md:mt-20">
      <div className="mx-auto max-w-7xl px-4 py-20">
        <div className="grid items-center gap-12 md:grid-cols-2">
          {/* LEFT: Text */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-6"
          >
            <span className="inline-block rounded-full bg-indigo-100 px-3 py-1 text-sm font-medium text-indigo-600 dark:bg-indigo-900/40 dark:text-indigo-400">
              Welcome to Kagazzy
            </span>

            <h1 className="text-4xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-5xl">
              Create stunning mockups
              <span className="block text-indigo-600 dark:text-indigo-400">
                in seconds
              </span>
            </h1>

            <p className="max-w-xl text-lg text-gray-600 dark:text-gray-300">
              Generate high-quality mockups for your designs, products, and
              branding — instantly, beautifully, and without design skills.
            </p>

            <div className="flex flex-wrap gap-4">
              <Link
                to="/mockups"
                className="rounded-md bg-indigo-600 px-6 py-3 text-sm font-medium text-white shadow hover:bg-indigo-700"
              >
                Get started
              </Link>

              <Link
                to="/pricing"
                className="rounded-md border border-gray-300 px-6 py-3 text-sm font-medium text-gray-700 hover:bg-gray-100 dark:border-gray-700 dark:text-gray-300 dark:hover:bg-gray-800"
              >
                View pricing
              </Link>
            </div>
          </motion.div>

          {/* RIGHT: Illustration */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="relative"
          >
            <div className="absolute -inset-6 rounded-3xl bg-indigo-100/40 blur-3xl dark:bg-indigo-900/20" />

            <img
              src="https://lukaszadam.com/images/free-illustrations/cassette.svg"
              alt="Mockup generation illustration"
              className="relative mx-auto w-full max-w-md"
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
