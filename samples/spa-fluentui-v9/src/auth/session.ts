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
  /** Identifies the signed-in account in this browser (MSAL's `homeAccountId`). */
  accountId: string;
  /**
   * The environment the app starts with, e.g. `https://contoso.crm.dynamics.com`. Omitted when the
   * visitor signed in without one: they pick one of their environments next.
   */
  environmentUrl?: string;
  /** Token provider for any environment of the user, and for the Global Discovery Service. */
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
  | {
      status: "signedIn";
      session: AuthSession;
      /** The environment the app uses; undefined until the visitor picks one. */
      environmentUrl?: string;
      /** The visitor asked to switch: the picker is shown, and can go back to `environmentUrl`. */
      switching?: boolean;
    };
