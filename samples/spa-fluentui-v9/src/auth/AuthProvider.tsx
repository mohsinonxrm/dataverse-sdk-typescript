import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import type { ReactNode } from "react";
import {
  canSignIn,
  normalizeUrl,
  readConnectionSettings,
  validateEnvironmentUrl,
  writeConnectionSettings,
  type ConnectionSettings,
} from "../config";
import { readSession, writeSession } from "../lib/storage";
import { rememberEnvironment } from "./lastEnvironment";
import type { AuthSession, AuthState } from "./session";

const DEMO_FLAG = "spa-demo-mode";
/** Set when a Microsoft sign-in starts, so MSAL is loaded after the redirect (and not otherwise). */
const MSAL_FLAG = "spa-msal-sign-in";
/** The environment in use in this tab, so a reload stays in it. */
const ENVIRONMENT_KEY = "spa-environment";

interface AuthContextValue {
  state: AuthState;
  /**
   * Microsoft sign-in (redirect) with the app registration in `settings`, to its environment, or
   * without one to pick one of the user's environments next.
   */
  signIn: (settings: ConnectionSettings) => Promise<void>;
  /** Sign in to the in-browser demo environment. */
  startDemo: () => Promise<void>;
  signOut: () => Promise<void>;
  /** Use this environment from now on (the picker, or the Environments page). */
  chooseEnvironment: (url: string) => void;
  /** Show the environment picker again, without signing out. */
  switchEnvironment: () => void;
  /** Leave the picker for the environment in use. */
  cancelSwitch: () => void;
}

const AuthContext = createContext<AuthContextValue | null>(null);

async function loadDemoSession(): Promise<AuthSession> {
  const { createDemoSession } = await import("../demo/demoSession");
  return createDemoSession();
}

/** The tab's environment after a reload, else the one the session was signed in to, if any. */
function startingEnvironment(session: AuthSession): string | undefined {
  const saved = readSession(ENVIRONMENT_KEY);
  if (saved && validateEnvironmentUrl(saved) === undefined) return normalizeUrl(saved);
  return session.environmentUrl;
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<AuthState>({ status: "loading" });

  useEffect(() => {
    let cancelled = false;
    const restore = async (): Promise<AuthSession | null> => {
      if (readSession(DEMO_FLAG) === "1") return loadDemoSession();
      const settings = readConnectionSettings();
      if (readSession(MSAL_FLAG) !== "1" || !canSignIn(settings)) return null;
      const { restoreMsalSession } = await import("./msalSession");
      const session = await restoreMsalSession(settings);
      if (!session) writeSession(MSAL_FLAG, null);
      return session;
    };
    restore().then(
      (session) => {
        if (!cancelled)
          setState(
            session
              ? { status: "signedIn", session, environmentUrl: startingEnvironment(session) }
              : { status: "signedOut" }
          );
      },
      (error: unknown) => {
        writeSession(MSAL_FLAG, null);
        if (!cancelled) setState({ status: "signedOut", error });
      }
    );
    return () => {
      cancelled = true;
    };
  }, []);

  // Keep the environment in use for a reload of this tab, and as this account's last choice.
  const session = state.status === "signedIn" ? state.session : undefined;
  const environmentUrl = state.status === "signedIn" ? state.environmentUrl : undefined;
  useEffect(() => {
    if (!session || !environmentUrl) return;
    writeSession(ENVIRONMENT_KEY, environmentUrl);
    rememberEnvironment(session.accountId, environmentUrl);
  }, [session, environmentUrl]);

  const signIn = useCallback(async (settings: ConnectionSettings) => {
    try {
      writeConnectionSettings(settings);
      writeSession(MSAL_FLAG, "1");
      writeSession(ENVIRONMENT_KEY, settings.environmentUrl || null);
      const { signInWithRedirect } = await import("./msalSession");
      await signInWithRedirect(settings);
    } catch (error) {
      writeSession(MSAL_FLAG, null);
      setState({ status: "signedOut", error });
    }
  }, []);

  const startDemo = useCallback(async () => {
    setState({ status: "loading" });
    try {
      const demo = await loadDemoSession();
      writeSession(DEMO_FLAG, "1");
      writeSession(ENVIRONMENT_KEY, null);
      setState({ status: "signedIn", session: demo, environmentUrl: demo.environmentUrl });
    } catch (error) {
      setState({ status: "signedOut", error });
    }
  }, []);

  const signOut = useCallback(async () => {
    const current = state.status === "signedIn" ? state.session : undefined;
    writeSession(DEMO_FLAG, null);
    writeSession(MSAL_FLAG, null);
    writeSession(ENVIRONMENT_KEY, null);
    setState({ status: "signedOut" });
    await current?.signOut();
  }, [state]);

  const chooseEnvironment = useCallback((url: string) => {
    setState((s) =>
      s.status === "signedIn" ? { ...s, environmentUrl: normalizeUrl(url), switching: false } : s
    );
  }, []);

  const switchEnvironment = useCallback(() => {
    setState((s) => (s.status === "signedIn" ? { ...s, switching: true } : s));
  }, []);

  const cancelSwitch = useCallback(() => {
    setState((s) => (s.status === "signedIn" ? { ...s, switching: false } : s));
  }, []);

  const value = useMemo(
    () => ({
      state,
      signIn,
      startDemo,
      signOut,
      chooseEnvironment,
      switchEnvironment,
      cancelSwitch,
    }),
    [state, signIn, startDemo, signOut, chooseEnvironment, switchEnvironment, cancelSwitch]
  );
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth(): AuthContextValue {
  const value = useContext(AuthContext);
  if (!value) throw new Error("useAuth must be used inside <AuthProvider>");
  return value;
}
