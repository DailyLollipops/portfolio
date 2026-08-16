import { createContext, useContext } from "react";
import type { ColorMode } from "./themes";

export interface ThemeContextValue {
  colorMode: ColorMode;
  toggleColorMode: () => void;
}

export const ThemeContext = createContext<ThemeContextValue>({
  colorMode: "dark",
  toggleColorMode: () => {},
});

export const useGitHubTheme = () => useContext(ThemeContext);