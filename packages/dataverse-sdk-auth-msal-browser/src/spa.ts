/**
 * @fileoverview Helpers for the boilerplate every SPA writes around MSAL and Dataverse.
 * Framework-free: nothing here imports React or any UI library.
 */

import type { AuthenticationResult, IPublicClientApplication } from "@azure/msal-browser";
import { DataverseInvalidRequestError } from "@mohsinonxrm/dataverse-sdk-core";
import { AUTHORITY_HOSTS, assertValidTenant, type EntraCloud } from "./authority.js";
import {
  MsalBrowserTokenProvider,
  type MsalBrowserTokenProviderOptions,
} from "./MsalBrowserTokenProvider.js";

/**
 * Starts MSAL for an SPA page load: `initialize()`, then `handleRedirectPromise()` (which
 * completes a sign-in or token redirect), then sets the active account.
 *
 * The active account becomes the account of the redirect result. Without a result, if no account
 * is active and exactly one account is cached, that account becomes active. With several cached
 * accounts none is picked, so the app can ask the user.
 *
 * Errors from MSAL (for example a failed redirect) are not caught.
 *
 * @returns The redirect result, or `null` when the page load was not a redirect back from sign-in
 *
 * @example
 * ```typescript
 * const pca = new PublicClientApplication(msalConfig);
 * await initializeMsal(pca);
 * ```
 */
export async function initializeMsal(
  pca: IPublicClientApplication
): Promise<AuthenticationResult | null> {
  await pca.initialize();
  const result = await pca.handleRedirectPromise();

  if (result?.account) {
    pca.setActiveAccount(result.account);
  } else if (!pca.getActiveAccount()) {
    const accounts = pca.getAllAccounts();
    if (accounts.length === 1 && accounts[0]) {
      pca.setActiveAccount(accounts[0]);
    }
  }

  return result;
}

/** Scope kinds for a Dataverse environment. */
export type DataverseScopeKind = "user_impersonation" | ".default";

/**
 * The scopes for a Dataverse environment URL: `["https://<host>/user_impersonation"]`, or
 * `["https://<host>/.default"]`. Any path, query or trailing slash in `url` is ignored.
 *
 * @throws {DataverseInvalidRequestError} When `url` is not an absolute `https:` URL
 *
 * @example
 * ```typescript
 * scopesForEnvironment("https://contoso.crm.dynamics.com/");
 * // ["https://contoso.crm.dynamics.com/user_impersonation"]
 * ```
 */
export function scopesForEnvironment(
  url: string,
  kind: DataverseScopeKind = "user_impersonation"
): string[] {
  let parsed: URL;
  try {
    parsed = new URL(url);
  } catch {
    throw DataverseInvalidRequestError.invalidBaseUrl(url);
  }
  if (parsed.protocol !== "https:" || parsed.username || parsed.password) {
    throw DataverseInvalidRequestError.invalidBaseUrl(url);
  }
  return [`${parsed.origin}/${kind}`];
}

/**
 * The Entra ID authority URL for a cloud and tenant, for the MSAL configuration's
 * `auth.authority`.
 *
 * | cloud      | host                              |
 * | ---------- | --------------------------------- |
 * | `public`   | `login.microsoftonline.com`       |
 * | `usgov`    | `login.microsoftonline.us`        |
 * | `usgovdod` | `login.microsoftonline.us`        |
 * | `china`    | `login.partner.microsoftonline.cn`|
 *
 * @param tenant - Tenant id (GUID), tenant domain, or `organizations` (default), `common`,
 *   `consumers`
 * @throws {DataverseInvalidRequestError} For an unknown cloud or an invalid tenant
 *
 * @example
 * ```typescript
 * authorityFor("public", "contoso.onmicrosoft.com");
 * // "https://login.microsoftonline.com/contoso.onmicrosoft.com"
 * ```
 */
export function authorityFor(cloud: EntraCloud, tenant = "organizations"): string {
  // Typed as possibly undefined: callers from plain JavaScript can pass any string.
  const host = AUTHORITY_HOSTS[cloud] as string | undefined;
  if (!host) {
    const error = new DataverseInvalidRequestError(
      `Unknown cloud "${cloud}": expected one of ${Object.keys(AUTHORITY_HOSTS).join(", ")}`
    );
    error.name = "InvalidCloud";
    throw error;
  }
  assertValidTenant(tenant);
  return `${host}/${tenant}`;
}

/**
 * Options for {@link createMsalBrowserProvider}: the provider options, with the scopes either
 * given or derived from the environment URL.
 */
export interface CreateMsalBrowserProviderOptions extends Omit<
  MsalBrowserTokenProviderOptions,
  "scopes"
> {
  /** Scopes to request. When omitted, they are derived from `environmentUrl`. */
  scopes?: string[];
  /** Dataverse environment URL, e.g. `https://contoso.crm.dynamics.com`, used for the scopes. */
  environmentUrl?: string;
  /** Scope kind derived from `environmentUrl`. @default 'user_impersonation' */
  scopeKind?: DataverseScopeKind;
}

/**
 * Creates a {@link MsalBrowserTokenProvider}, deriving the scopes from `environmentUrl` when
 * `scopes` is not given.
 *
 * @throws {DataverseInvalidRequestError} When neither `scopes` nor `environmentUrl` is given, or
 *   `environmentUrl` is invalid
 *
 * @example
 * ```typescript
 * const tokenProvider = createMsalBrowserProvider(pca, {
 *   environmentUrl: "https://contoso.crm.dynamics.com",
 * });
 * const client = new DataverseClient({ baseUrl: "https://contoso.crm.dynamics.com", tokenProvider });
 * ```
 */
export function createMsalBrowserProvider(
  pca: IPublicClientApplication,
  options: CreateMsalBrowserProviderOptions
): MsalBrowserTokenProvider {
  const { scopes, environmentUrl, scopeKind, ...rest } = options;
  const resolvedScopes =
    scopes && scopes.length > 0
      ? scopes
      : environmentUrl
        ? scopesForEnvironment(environmentUrl, scopeKind)
        : [];
  return new MsalBrowserTokenProvider(pca, { ...rest, scopes: resolvedScopes });
}
