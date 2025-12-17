import { create } from "zustand";
import { persist } from "zustand/middleware";

// Initialize theme immediately on load
if (typeof window !== "undefined") {
  const savedTheme = localStorage.getItem("theme-storage");
  if (savedTheme) {
    try {
      const { state } = JSON.parse(savedTheme);
      if (state?.theme === "dark") {
        document.documentElement.classList.add("dark");
      }
    } catch (e) {
      console.log(e);
      // Ignore parsing errors
    }
  }
}

const useThemeStore = create(
  persist(
    (set, get) => ({
      theme: "light",

      setTheme: (theme) => {
        set({ theme });
        updateDocumentTheme(theme);
      },

      toggleTheme: () => {
        const currentTheme = get().theme;
        const newTheme = currentTheme === "light" ? "dark" : "light";
        set({ theme: newTheme });
        updateDocumentTheme(newTheme);
      },

      initializeTheme: () => {
        const theme = get().theme;
        updateDocumentTheme(theme);
      },
    }),
    {
      name: "theme-storage",
    }
  )
);

function updateDocumentTheme(theme) {
  if (typeof window === "undefined") return;

  if (theme === "dark") {
    document.documentElement.classList.add("dark");
  } else {
    document.documentElement.classList.remove("dark");
  }
}

export { useThemeStore };
