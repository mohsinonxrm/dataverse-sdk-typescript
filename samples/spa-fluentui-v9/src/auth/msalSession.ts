/**
 * Microsoft sign-in with MSAL. Loaded on demand, so demo mode never downloads MSAL.
 */
import { PublicClientApplication, type AccountInfo } from "@azure/msal-browser";
import {
  authorityFor,
  createMsalBrowserProvider,
  initializeMsal,
  scopesForEnvironment,
} from "@mohsinonxrm/dataverse-sdk-auth-msal-browser";
import { settings } from "../config";
import type { AuthSession } from "./session";

let pca: PublicClientApplication | undefined;
let ready: Promise<void> | undefined;

function msal(): Promise<PublicClientApplication> {
  pca ??= new PublicClientApplication({
    auth: {
      clientId: settings.clientId,
      authority: authorityFor("public", settings.tenantId),
      redirectUri: settings.redirectUri,
    },
    cache: { cacheLocation: "sessionStorage" },
  });
  const instance = pca;
  // initializeMsal() initializes MSAL, completes a pending redirect sign-in and sets the active account.
  ready ??= initializeMsal(instance).then(() => undefined);
  return ready.then(() => instance);
}

function toSession(instance: PublicClientApplication, account: AccountInfo): AuthSession {
  return {
    mode: "msal",
    user: { name: account.name ?? account.username, username: account.username },
    environmentUrl: settings.environmentUrl,
    // Without `account`, the provider uses MSAL's active account.
    tokenProvider: createMsalBrowserProvider(instance, { environmentUrl: settings.environmentUrl }),
    scopesFor: (environmentUrl) => scopesForEnvironment(environmentUrl),
    signOut: () => instance.logoutRedirect({ account }),
  };
}

/** The signed-in session after a redirect or a reload, or `null` when nobody is signed in. */
export async function restoreMsalSession(): Promise<AuthSession | null> {
  const instance = await msal();
  const account = instance.getActiveAccount() ?? instance.getAllAccounts()[0];
  if (!account) return null;
  instance.setActiveAccount(account);
  return toSession(instance, account);
}

/** Start the redirect sign-in. The page navigates away; `restoreMsalSession()` finishes it. */
export async function signInWithRedirect(): Promise<void> {
  const instance = await msal();
  await instance.loginRedirect({ scopes: scopesForEnvironment(settings.environmentUrl) });
}
