import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import type { ReactNode } from "react";
import { isMsalConfigured } from "../config";
import { readSession, writeSession } from "../lib/storage";
import type { AuthSession, AuthState } from "./session";

const DEMO_FLAG = "spa-demo-mode";

interface AuthContextValue {
  state: AuthState;
  /** Microsoft sign-in (redirect). Only when `.env` has the settings it needs. */
  signIn: () => Promise<void>;
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
      if (!isMsalConfigured) return null;
      const { restoreMsalSession } = await import("./msalSession");
      return restoreMsalSession();
    };
    restore().then(
      (session) => {
        if (!cancelled)
          setState(session ? { status: "signedIn", session } : { status: "signedOut" });
      },
      (error: unknown) => {
        if (!cancelled) setState({ status: "signedOut", error });
      }
    );
    return () => {
      cancelled = true;
    };
  }, []);

  const signIn = useCallback(async () => {
    try {
      const { signInWithRedirect } = await import("./msalSession");
      await signInWithRedirect();
    } catch (error) {
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
