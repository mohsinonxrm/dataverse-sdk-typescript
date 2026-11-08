/**
 * Microsoft sign-in with MSAL, for the app registration (and the environment, if any) the visitor
 * entered on the sign-in page. Loaded on demand, so demo mode never downloads MSAL.
 */
import { PublicClientApplication, type AccountInfo } from "@azure/msal-browser";
import {
  authorityFor,
  createMsalBrowserProvider,
  initializeMsal,
  scopesForEnvironment,
} from "@mohsinonxrm/dataverse-sdk-auth-msal-browser";
import { redirectUri, type ConnectionSettings } from "../config";
import { DISCOVERY_SCOPES } from "./environments";
import type { AuthSession } from "./session";

let current: { key: string; ready: Promise<PublicClientApplication> } | undefined;

/** The MSAL instance for the settings' app registration and tenant, initialized once. */
function msal(settings: ConnectionSettings): Promise<PublicClientApplication> {
  const clientId = settings.clientId.trim();
  const tenantId = settings.tenantId.trim() || "organizations";
  const key = `${clientId}|${tenantId}`;
  if (current?.key !== key) {
    const instance = new PublicClientApplication({
      auth: {
        clientId,
        authority: authorityFor("public", tenantId),
        redirectUri: redirectUri(),
      },
      cache: { cacheLocation: "sessionStorage" },
    });
    // initializeMsal() initializes MSAL, completes a pending redirect sign-in and sets the active account.
    current = { key, ready: initializeMsal(instance).then(() => instance) };
  }
  return current.ready;
}

/**
 * The scopes to sign in with: the environment's `user_impersonation`, or without an environment
 * the Global Discovery Service's, to list the user's environments next. Both are the delegated
 * Dynamics CRM `user_impersonation` permission.
 */
export function signInScopes(environmentUrl: string): string[] {
  return environmentUrl ? scopesForEnvironment(environmentUrl) : DISCOVERY_SCOPES;
}

function toSession(
  instance: PublicClientApplication,
  account: AccountInfo,
  environmentUrl: string
): AuthSession {
  return {
    mode: "msal",
    user: { name: account.name ?? account.username, username: account.username },
    accountId: account.homeAccountId,
    environmentUrl: environmentUrl || undefined,
    // Without `account`, the provider uses MSAL's active account. Each client passes the scopes
    // of the host it calls; these are only the default.
    tokenProvider: createMsalBrowserProvider(instance, { scopes: signInScopes(environmentUrl) }),
    scopesFor: (url) => scopesForEnvironment(url),
    signOut: () => instance.logoutRedirect({ account }),
  };
}

/** The signed-in session after a redirect or a reload, or `null` when nobody is signed in. */
export async function restoreMsalSession(
  settings: ConnectionSettings
): Promise<AuthSession | null> {
  const instance = await msal(settings);
  const account = instance.getActiveAccount() ?? instance.getAllAccounts()[0];
  if (!account) return null;
  instance.setActiveAccount(account);
  return toSession(instance, account, settings.environmentUrl);
}

/** Start the redirect sign-in. The page navigates away; `restoreMsalSession()` finishes it. */
export async function signInWithRedirect(settings: ConnectionSettings): Promise<void> {
  const instance = await msal(settings);
  await instance.loginRedirect({ scopes: signInScopes(settings.environmentUrl) });
}
