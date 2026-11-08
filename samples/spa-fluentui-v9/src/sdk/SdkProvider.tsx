import { createContext, useContext, useMemo } from "react";
import type { ReactNode } from "react";
import type { AuthSession } from "../auth/session";
import type { Connection } from "./createSdk";

interface SdkContextValue {
  session: AuthSession;
  connection: Connection;
  /** Switch every scenario to another environment (from the Discovery page). */
  setEnvironmentUrl: (url: string) => void;
}

const SdkContext = createContext<SdkContextValue | null>(null);

interface SdkProviderProps {
  session: AuthSession;
  /** The environment every scenario uses. */
  environmentUrl: string;
  /** Called to switch to another environment; the caller keeps it and passes it back. */
  onEnvironmentChange: (url: string) => void;
  children: ReactNode;
}

export function SdkProvider({
  session,
  environmentUrl,
  onEnvironmentChange,
  children,
}: SdkProviderProps) {
  const value = useMemo<SdkContextValue>(
    () => ({
      session,
      connection: {
        environmentUrl,
        tokenProvider: session.tokenProvider,
        scopes: session.scopesFor(environmentUrl),
        scopesFor: session.scopesFor,
        fetchProvider: session.fetchProvider,
      },
      setEnvironmentUrl: onEnvironmentChange,
    }),
    [session, environmentUrl, onEnvironmentChange]
  );
  return <SdkContext.Provider value={value}>{children}</SdkContext.Provider>;
}

export function useSdkContext(): SdkContextValue {
  const value = useContext(SdkContext);
  if (!value) throw new Error("useSdkContext must be used inside <SdkProvider>");
  return value;
}
