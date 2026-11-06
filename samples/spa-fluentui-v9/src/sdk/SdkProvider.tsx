import { createContext, useContext, useMemo, useState } from "react";
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

export function SdkProvider({ session, children }: { session: AuthSession; children: ReactNode }) {
  const [environmentUrl, setEnvironmentUrl] = useState(session.environmentUrl);
  const value = useMemo<SdkContextValue>(
    () => ({
      session,
      connection: {
        environmentUrl,
        tokenProvider: session.tokenProvider,
        scopes: session.scopesFor(environmentUrl),
        fetchProvider: session.fetchProvider,
      },
      setEnvironmentUrl,
    }),
    [session, environmentUrl]
  );
  return <SdkContext.Provider value={value}>{children}</SdkContext.Provider>;
}

export function useSdkContext(): SdkContextValue {
  const value = useContext(SdkContext);
  if (!value) throw new Error("useSdkContext must be used inside <SdkProvider>");
  return value;
}
