import { createContext, useContext, useEffect, useState } from "react";
import {
  Theme,
  ThemeColors,
  ThemeProviderProps,
  ThemeProviderState,
} from "../interface";

const initialState: ThemeProviderState = {
  theme: "system",
  setTheme: () => null,
};

const ThemeProviderContext = createContext<ThemeProviderState>(initialState);

export function ThemeProvider({
  children,
  defaultTheme = "system",
  storageKey = "vite-ui-theme",
  themeColors,
  ...props
}: ThemeProviderProps) {
  const [theme, setTheme] = useState<Theme>(defaultTheme);

  useEffect(() => {
    if (typeof window !== "undefined" && window.localStorage) {
      const storedTheme = localStorage.getItem(storageKey) as Theme;
      if (storedTheme) {
        setTheme(storedTheme);
      }
    }
  }, [storageKey]);

  useEffect(() => {
    const root = window.document.documentElement;

    root.classList.remove("light", "dark");

    if (theme === "system") {
      const systemTheme = window.matchMedia("(prefers-color-scheme: dark)")
        .matches
        ? "dark"
        : "light";

      root.classList.add(systemTheme);
      return;
    }

    root.classList.add(theme);
  }, [theme]);

  const value = {
    theme,
    setTheme: (theme: Theme) => {
      localStorage.setItem(storageKey, theme);
      setTheme(theme);
    },
  };

  const generateThemeVars = (
    currentTheme: Theme,
    theme?: ThemeColors
  ): React.CSSProperties | undefined => {
    if (theme) {
      const themeVars: Record<string, any> = {};
      let themeSelection = theme.root;

      if (currentTheme === "dark" && theme.dark) {
        themeSelection = theme.dark;
      } else if (currentTheme === "light" && theme.root) {
        themeSelection = theme.root;
      }

      // Convert themeSelection properties to CSS variables
      Object.entries(themeSelection).forEach(([key, value]) => {
        const cssVar = `--${key}`;
        themeVars[cssVar] = value;
      });

      return themeVars as React.CSSProperties;
    } else {
      return undefined;
    }
  };

  return (
    <ThemeProviderContext.Provider {...props} value={value}>
      <div style={generateThemeVars(theme, themeColors)}>{children}</div>
    </ThemeProviderContext.Provider>
  );
}

export const useTheme = () => {
  const context = useContext(ThemeProviderContext);

  if (context === undefined)
    throw new Error("useTheme must be used within a ThemeProvider");

  return context;
};
