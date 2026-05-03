"use client";

import { createContext, useContext, useEffect, useState } from "react";

type Theme = "light" | "dark" | "auto";

const ThemeContext = createContext({
  theme: "light" as Theme,
  setTheme: (theme: Theme) => {},
});

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<Theme>("light");

  // load from localStorage
  useEffect(() => {
    const saved = localStorage.getItem("theme") as Theme;
    if (saved === "light" || saved === "dark") {
      setTheme(saved);
    }
  }, []);

  // apply theme
  useEffect(() => {
  let appliedTheme = theme;

  if (theme === "auto") {
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    appliedTheme = prefersDark ? "dark" : "light";
  }

  document.documentElement.className = appliedTheme;
  localStorage.setItem("theme", theme);
}, [theme]);

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export const useTheme = () => useContext(ThemeContext);