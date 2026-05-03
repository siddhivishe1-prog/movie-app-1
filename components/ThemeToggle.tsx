"use client";

import { useTheme } from "@/app/context/ThemeContext";

export default function ThemeToggle() {
  const { theme, setTheme } = useTheme();

  return (
    <div style={{ display: "flex", gap: "10px" }}>
      <button onClick={() => setTheme("light")}>☀️ Light</button>
      <button onClick={() => setTheme("dark")}>🌙 Dark</button>
      <button onClick={() => setTheme("auto")}>⚙️ Auto</button>
    </div>
  );
}