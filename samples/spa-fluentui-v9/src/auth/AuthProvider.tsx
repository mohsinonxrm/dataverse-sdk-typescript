import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import type { ReactNode } from "react";
import {
  canSignIn,
  readConnectionSettings,
  writeConnectionSettings,
  type ConnectionSettings,
} from "../config";
import { readSession, writeSession } from "../lib/storage";
import type { AuthSession, AuthState } from "./session";

const DEMO_FLAG = "spa-demo-mode";
/** Set when a Microsoft sign-in starts, so MSAL is loaded after the redirect (and not otherwise). */
const MSAL_FLAG = "spa-msal-sign-in";

interface AuthContextValue {
  state: AuthState;
  /** Microsoft sign-in (redirect) to the environment and app registration in `settings`. */
  signIn: (settings: ConnectionSettings) => Promise<void>;
  /** Sign in to the in-browser demo environment. */
  startDemo: () => Promise<void>;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextValue | null>(null);

async function loadDemoSession(): Promise<AuthSession> {
  const { createDemoSession } = await import("../demo/demoSession");
  return createDemoSession();
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
          setState(session ? { status: "signedIn", session } : { status: "signedOut" });
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

  const signIn = useCallback(async (settings: ConnectionSettings) => {
    try {
      writeConnectionSettings(settings);
      writeSession(MSAL_FLAG, "1");
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
      const session = await loadDemoSession();
      writeSession(DEMO_FLAG, "1");
      setState({ status: "signedIn", session });
    } catch (error) {
      setState({ status: "signedOut", error });
    }
  }, []);

  const signOut = useCallback(async () => {
    const session = state.status === "signedIn" ? state.session : undefined;
    writeSession(DEMO_FLAG, null);
    writeSession(MSAL_FLAG, null);
    setState({ status: "signedOut" });
    await session?.signOut();
  }, [state]);

  const value = useMemo(
    () => ({ state, signIn, startDemo, signOut }),
    [state, signIn, startDemo, signOut]
  );
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth(): AuthContextValue {
  const value = useContext(AuthContext);
  if (!value) throw new Error("useAuth must be used inside <AuthProvider>");
  return value;
}
