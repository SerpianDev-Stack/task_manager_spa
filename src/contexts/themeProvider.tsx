import { useState } from "react";
import { ThemeContext } from "./themeContext";

interface ThemeProviderProps {
  children: React.ReactNode;
}

export type ThemeName = "light" | "dark";

export const ThemeProvider = ({ children }: ThemeProviderProps) => {
  const [theme, setTheme] = useState<ThemeName>("dark");

  const toggleTheme = () => {
    setTheme((prev) => (prev === "dark" ? "light" : "dark"));
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};
