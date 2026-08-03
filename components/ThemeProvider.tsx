"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import {
  applyThemeClass,
  readStoredPreference,
  resolveTheme,
  storePreference,
  type ThemeMode,
  type ThemePreference,
} from "@/lib/theme";

type ThemeContextValue = {
  preference: ThemePreference;
  resolved: ThemeMode;
  toggleTheme: () => void;
};

const ThemeContext = createContext<ThemeContextValue | null>(null);

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [preference, setPreference] = useState<ThemePreference>("auto");
  const [resolved, setResolved] = useState<ThemeMode>("light");

  const syncTheme = useCallback((nextPreference: ThemePreference) => {
    const mode = resolveTheme(nextPreference);
    setPreference(nextPreference);
    setResolved(mode);
    applyThemeClass(mode);
  }, []);

  useEffect(() => {
    syncTheme(readStoredPreference());

    const id = window.setInterval(() => {
      const stored = readStoredPreference();
      if (stored === "auto") syncTheme("auto");
    }, 60_000);

    return () => window.clearInterval(id);
  }, [syncTheme]);

  const toggleTheme = useCallback(() => {
    const next: ThemeMode = resolved === "dark" ? "light" : "dark";
    storePreference(next);
    syncTheme(next);
  }, [resolved, syncTheme]);

  const value = useMemo(
    () => ({ preference, resolved, toggleTheme }),
    [preference, resolved, toggleTheme],
  );

  return (
    <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within ThemeProvider");
  }
  return context;
}
