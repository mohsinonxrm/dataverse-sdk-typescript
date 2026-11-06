import type { AccessTokenProvider, FetchProvider } from "@mohsinonxrm/dataverse-sdk-core";

export interface SignedInUser {
  name: string;
  username: string;
}

/**
 * A signed-in session: who is signed in, and what the SDK clients need to call Dataverse as them.
 * Created by `msalSession.ts` (Microsoft sign-in) or `demo/demoSession.ts` (in-browser fake).
 */
export interface AuthSession {
  mode: "msal" | "demo";
  user: SignedInUser;
  /** The environment the app starts with, e.g. `https://contoso.crm.dynamics.com`. */
  environmentUrl: string;
  tokenProvider: AccessTokenProvider;
  /** Token scopes for an environment, passed to `DataverseClient` as `scopes`. */
  scopesFor: (environmentUrl: string) => string[] | undefined;
  /** The `fetch` the SDK clients use. Omitted for the browser's own `fetch`. */
  fetchProvider?: FetchProvider;
  signOut: () => Promise<void>;
}

export type AuthState =
  | { status: "loading" }
  | { status: "signedOut"; error?: unknown }
  | { status: "signedIn"; session: AuthSession };
