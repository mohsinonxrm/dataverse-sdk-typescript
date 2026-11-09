import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import type { ReactNode } from "react";
import {
  FluentProvider,
  makeStyles,
  webDarkTheme,
  webLightTheme,
} from "@fluentui/react-components";
import { readLocal, writeLocal } from "../lib/storage";

export type ThemeMode = "light" | "dark";

const STORAGE_KEY = "spa-theme";

interface ThemeContextValue {
  mode: ThemeMode;
  toggle: () => void;
}

const ThemeContext = createContext<ThemeContextValue | null>(null);

function initialMode(): ThemeMode {
  const saved = readLocal(STORAGE_KEY);
  if (saved === "light" || saved === "dark") return saved;
  try {
    return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
  } catch {
    return "light";
  }
}

const useStyles = makeStyles({
  provider: {
    minHeight: "100dvh",
    display: "flex",
    flexDirection: "column",
  },
});

/** `FluentProvider` with Fluent 2's web light or dark theme, remembered in localStorage. */
export function ThemeProvider({ children }: { children: ReactNode }) {
  const styles = useStyles();
  const [mode, setMode] = useState<ThemeMode>(initialMode);

  const theme = mode === "dark" ? webDarkTheme : webLightTheme;

  useEffect(() => {
    writeLocal(STORAGE_KEY, mode);
    // The page behind the app (overscroll, scrollbars) follows the theme too.
    document.documentElement.style.colorScheme = mode;
    document.body.style.backgroundColor = theme.colorNeutralBackground2;
  }, [mode, theme]);

  const toggle = useCallback(() => setMode((m) => (m === "light" ? "dark" : "light")), []);
  const value = useMemo(() => ({ mode, toggle }), [mode, toggle]);

  return (
    <ThemeContext.Provider value={value}>
      {/* Portals (dialogs, toasts, popovers) get the theme from the provider too. */}
      <FluentProvider theme={theme} data-theme={mode}>
        <div className={styles.provider}>{children}</div>
      </FluentProvider>
    </ThemeContext.Provider>
  );
}

export function useThemeMode(): ThemeContextValue {
  const value = useContext(ThemeContext);
  if (!value) throw new Error("useThemeMode must be used inside <ThemeProvider>");
  return value;
}
