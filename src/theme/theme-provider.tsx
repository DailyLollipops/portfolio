import type { ReactNode } from "react";
import { useEffect, useMemo, useState } from "react";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { createGhTheme, type ColorMode } from "./themes";
import { ThemeContext } from "./theme-context";

const STORAGE_KEY = "portfolio-color-mode";

const getInitialMode = (): ColorMode => {
  try {
    const stored = window.localStorage.getItem(STORAGE_KEY);
    if (stored === "dark" || stored === "light") return stored;
  } catch {
    /* ignore */
  }
  return window.matchMedia("(prefers-color-scheme: light)").matches
    ? "light"
    : "dark";
};

export const GitHubThemeProvider = ({ children }: { children: ReactNode }) => {
  const [colorMode, setColorMode] = useState<ColorMode>(getInitialMode);

  useEffect(() => {
    try {
      window.localStorage.setItem(STORAGE_KEY, colorMode);
    } catch {
      /* ignore */
    }
  }, [colorMode]);

  const theme = useMemo(() => createGhTheme(colorMode), [colorMode]);

  const value = useMemo(
    () => ({
      colorMode,
      toggleColorMode: () =>
        setColorMode((m) => (m === "dark" ? "light" : "dark")),
    }),
    [colorMode]
  );

  return (
    <ThemeContext.Provider value={value}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </ThemeProvider>
    </ThemeContext.Provider>
  );
};