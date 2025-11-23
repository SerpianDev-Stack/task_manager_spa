import IconSun from "/images/icon-sun.svg";
import MoonIcon from "/images/icon-moon.svg";
import type { ThemeName } from "./themeProvider";

export interface ThemeItem {
  name: ThemeName;
  layout: {
    backgroundColor: string;
    textColor: string;
  };
  todo: {
    backgroundColor: string;
    borderColor: string;
    textColor: string;
    inputColor: string;
  };
  Icon: string;
}

export const ThemeConfig: Record<ThemeName, ThemeItem> = {
  light: {
    name: "light",
    layout: {
      backgroundColor: "hsl(236, 33%, 92%)",
      textColor: "hsl(235, 24%, 19%)",
    },
    todo: {
      backgroundColor: "hsl(235, 24%, 79%)",
      borderColor: "hsl(235, 24%, 19%)",
      textColor: "hsl(235, 24%, 19%)",
      inputColor: "hsl(239, 11%, 60%)",
    },

    Icon: MoonIcon,
  },
  dark: {
    name: "dark",
    layout: {
      backgroundColor: "hsl(235, 21%, 11%)",
      textColor: "hsl(234, 39%, 85%)",
    },
    todo: {
      backgroundColor: "hsl(235, 24%, 19%)",
      borderColor: "hsl(234, 39%, 85%)",
      textColor: "hsl(234, 39%, 85%)",
      inputColor: "hsl(235, 21%, 11%)",
    },
    Icon: IconSun,
  },
};
