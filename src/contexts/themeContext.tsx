import { createContext } from "react";
import type { ThemeName } from "./themeProvider";

export interface ThemeContextType {
  theme: ThemeName;
  toggleTheme: () => void;
}

export const ThemeContext = createContext<ThemeContextType>({
  theme: "light",
  toggleTheme: () => {},
});
