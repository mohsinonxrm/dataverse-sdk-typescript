/**
 * @fileoverview MSAL Browser Token Provider for Dataverse SDK
 * Implements AccessTokenProvider using @azure/msal-browser for SPA scenarios
 */

import type {
  IPublicClientApplication,
  AccountInfo,
  AuthenticationResult,
  SilentRequest,
  PopupRequest,
  RedirectRequest,
  EndSessionRequest,
} from "@azure/msal-browser";
import type { AccessTokenProvider, TokenOptions } from "@mohsinonxrm/dataverse-sdk-core";
import {
  DataverseAuthenticationError,
  DataverseInvalidRequestError,
} from "@mohsinonxrm/dataverse-sdk-core";
import {
  MsalBrowserAuthenticationError,
  isInteractionRequiredError,
  isPopupBlockedError,
  isSilentIframeTimeout,
} from "./errors.js";
import { tenantAuthority, type ConfiguredAuthority, type TenantAuthority } from "./authority.js";

/**
 * True when a silent call failed in a way an interactive call can fix: MSAL says interaction is
 * required, or the silent iframe timed out (third-party cookies blocked, throttling).
 */
function needsInteraction(error: unknown): boolean {
  return isInteractionRequiredError(error) || isSilentIframeTimeout(error);
}

/** Identifies a scope set regardless of order. */
function scopeKey(scopes: string[]): string {
  return [...scopes].sort().join(" ");
}

/**
 * Wraps a failure as `MsalBrowserAuthenticationError` (keeping MSAL's details and the error as
 * `cause`). SDK authentication errors thrown by this provider pass through unchanged.
 */
function toAuthenticationError(error: unknown): DataverseAuthenticationError {
  if (error instanceof DataverseAuthenticationError) {
    return error;
  }
  return MsalBrowserAuthenticationError.tokenAcquisitionFailed(error);
}

/**
 * Interaction type for acquiring tokens when silent acquisition fails
 */
export type InteractionType = "popup" | "redirect";

/**
 * Configuration options for MSAL Browser token provider
 */
export interface MsalBrowserTokenProviderOptions {
  /**
   * Scopes required for Dataverse access
   * Typically: ['https://<org>.crm.dynamics.com/.default'] or ['https://<org>.crm.dynamics.com/user_impersonation']
   */
  scopes: string[];

  /**
   * Which account to get tokens for. The account is resolved on **every** call, so switching
   * accounts in the app (`setActiveAccount`) takes effect on the next request.
   *
   * - A function: called on every request; its account wins. Return `null` to fall back to
   *   MSAL's active account, then the first cached account.
   * - An `AccountInfo`: used when MSAL has no active account. MSAL's active account wins, so
   *   `pca.setActiveAccount(other)` is not ignored.
   * - Omitted: MSAL's active account, then the first cached account.
   */
  account?: AccountInfo | (() => AccountInfo | null | undefined);

  /**
   * Interaction type to use when silent acquisition fails
   * @default 'popup'
   */
  interactionType?: InteractionType;

  /**
   * With `interactionType: 'popup'`: when the browser blocks the popup (`popup_window_error`,
   * `empty_window_error`), start a redirect instead. Without it, a blocked popup throws
   * `MsalBrowserAuthenticationError` with `code: 'popup_blocked'`.
   * @default false
   */
  fallbackToRedirect?: boolean;

  /**
   * Claims to request (JSON), for example a Conditional Access authentication context.
   *
   * MSAL skips its token cache for a silent request with `claims`, so they are sent only when the
   * request goes to Entra ID anyway: the interactive flow, the first token for each account, scope
   * set and tenant, and a forced refresh. Later silent calls get the token from MSAL's cache. A
   * claims challenge (`TokenOptions.claims`) is always sent.
   */
  claims?: string;

  /**
   * Correlation ID for telemetry
   */
  correlationId?: string;
}

/**
 * MSAL Browser token provider for Dataverse SDK
 *
 * @example
 * ```typescript
 * import { PublicClientApplication } from '@azure/msal-browser';
 * import { MsalBrowserTokenProvider } from '@mohsinonxrm/dataverse-sdk-auth-msal-browser';
 * import { DataverseClient } from '@mohsinonxrm/dataverse-sdk-core';
 *
 * const msalConfig = {
 *   auth: {
 *     clientId: 'your-client-id',
 *     authority: 'https://login.microsoftonline.com/your-tenant-id',
 *     redirectUri: window.location.origin,
 *   },
 * };
 *
 * const pca = new PublicClientApplication(msalConfig);
 * await pca.initialize();
 *
 * const tokenProvider = new MsalBrowserTokenProvider(pca, {
 *   scopes: ['https://org.crm.dynamics.com/.default'],
 *   interactionType: 'popup',
 * });
 *
 * const client = new DataverseClient({
 *   baseUrl: 'https://org.crm.dynamics.com',
 *   tokenProvider,
 * });
 * ```
 */
export class MsalBrowserTokenProvider implements AccessTokenProvider {
  private publicClientApplication: IPublicClientApplication;
  private options: MsalBrowserTokenProviderOptions;

  /** Interactive acquisitions in flight, by scopes + claims (single-flight). */
  private readonly interactions = new Map<string, Promise<string>>();
  /** Settles when the last started interaction settles; the next one chains on it. */
  private interactionQueue: Promise<void> = Promise.resolve();
  /** Number of interactive acquisitions that succeeded. */
  private completedInteractions = 0;
  /** Account, scope set and tenant combinations that already got a token with the configured claims. */
  private readonly claimsSent = new Set<string>();

  /**
   * Creates a new MSAL Browser token provider
   *
   * @param publicClientApplication - Initialized MSAL PublicClientApplication or IPublicClientApplication instance
   * @param options - Configuration options
   */
  constructor(
    publicClientApplication: IPublicClientApplication,
    options: MsalBrowserTokenProviderOptions
  ) {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
    if (!publicClientApplication) {
      throw DataverseInvalidRequestError.missingParameter("publicClientApplication");
    }

    // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
    if (!options) {
      throw DataverseInvalidRequestError.missingParameter("options");
    }

    // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
    if (!options.scopes || options.scopes.length === 0) {
      throw DataverseInvalidRequestError.emptyScopes();
    }

    this.publicClientApplication = publicClientApplication;
    this.options = {
      interactionType: "popup",
      ...options,
    };
  }

  /**
   * Gets an access token for Dataverse API calls
   *
   * @param scopes - Scopes to request (overrides configured scopes if provided)
   * @param options - Additional token options
   * @returns Access token string
   *
   * `options.tenantId` requests the token from that tenant
   * (`https://login.microsoftonline.com/<tenantId>`, on the host of the MSAL configuration's
   * authority, or its `azureCloudOptions` cloud), for example for a guest user in the Dataverse
   * organization's tenant.
   *
   * A silent call that needs interaction (`InteractionRequiredAuthError`, or the silent iframe's
   * `monitor_window_timeout` when third-party cookies are blocked) falls back to the configured
   * interaction type.
   *
   * @throws {MsalBrowserAuthenticationError} When token acquisition fails. It is a
   *   `DataverseAuthenticationError` that keeps MSAL's `errorCode`, `subError`, `correlationId`
   *   and the original error as `cause`.
   */
  async getToken(scopes?: string | string[], options?: TokenOptions): Promise<string> {
    // Use provided scopes or fall back to configured scopes
    const requestScopes = scopes
      ? Array.isArray(scopes)
        ? scopes
        : [scopes]
      : this.options.scopes;

    if (requestScopes.length === 0) {
      throw DataverseInvalidRequestError.emptyScopes();
    }

    const target = this.tenantTarget(options);

    // Resolved on every call: the app may have switched accounts since the last one.
    const account = this.resolveAccount();

    // No signed-in account: a silent call can only fail with no_account_error, and the user has
    // to sign in. Go straight to the interactive flow.
    if (!account) {
      return this.acquireTokenInteractive(requestScopes, target, options, false);
    }

    const completedBefore = this.completedInteractions;
    try {
      return await this.acquireTokenSilent(requestScopes, account, target, options);
    } catch (error) {
      // If interaction is required, use configured interaction type. Detected by name/errorCode,
      // not instanceof: the app's MSAL copy is not this package's copy.
      if (needsInteraction(error)) {
        // If another call finished an interaction while this silent call was running, the cache
        // may now hold a usable token: try silently once more before prompting again.
        return this.acquireTokenInteractive(
          requestScopes,
          target,
          options,
          this.completedInteractions !== completedBefore
        );
      }

      throw toAuthenticationError(error);
    }
  }

  private async acquireTokenSilent(
    scopes: string[],
    account: AccountInfo,
    target: TenantAuthority | undefined,
    options?: TokenOptions
  ): Promise<string> {
    const key = this.claimsKey(scopes, target, account);
    const silentRequest: SilentRequest = {
      scopes,
      account,
      ...target,
      claims: this.silentClaims(key, options),
      correlationId: options?.correlationId ?? this.options.correlationId,
      // After a 401 the SDK asks for a new token: bypass MSAL's cached access token (#167).
      ...(options?.forceRefresh ? { forceRefresh: true } : {}),
    };

    const response = await this.publicClientApplication.acquireTokenSilent(silentRequest);

    // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
    if (!response?.accessToken) {
      throw DataverseAuthenticationError.tokenAcquisitionFailed(
        "Received empty access token from MSAL"
      );
    }

    this.claimsSent.add(key);
    return response.accessToken;
  }

  /**
   * The claims for a silent request. A claims challenge (`TokenOptions.claims`) is always sent.
   * The configured claims are sent on the first silent request for the account, scope set and
   * tenant, and on a forced refresh, which go to Entra ID anyway: MSAL skips its cache for a
   * request with claims, so sending them every time would send every request to Entra ID.
   */
  private silentClaims(key: string, options?: TokenOptions): string | undefined {
    if (options?.claims) {
      return options.claims;
    }
    return options?.forceRefresh || !this.claimsSent.has(key) ? this.options.claims : undefined;
  }

  private claimsKey(
    scopes: string[],
    target: TenantAuthority | undefined,
    account: AccountInfo | null
  ): string {
    return JSON.stringify([
      scopeKey(scopes),
      target?.authority ?? null,
      account?.homeAccountId ?? null,
    ]);
  }

  /**
   * Acquires a token interactively (popup or redirect), single-flight.
   *
   * MSAL allows one interaction at a time (a second one fails with `interaction_in_progress`), so:
   * - concurrent calls for the same scopes and claims share one interaction;
   * - a call for other scopes waits for the running interaction, then tries silently first,
   *   because the interaction usually signed the user in or granted consent.
   *
   * @param retrySilentFirst - try a silent call before prompting
   */
  private acquireTokenInteractive(
    scopes: string[],
    target: TenantAuthority | undefined,
    options: TokenOptions | undefined,
    retrySilentFirst: boolean
  ): Promise<string> {
    const claims = options?.claims ?? this.options.claims;
    const key = JSON.stringify([[...scopes].sort(), claims ?? null, target?.authority ?? null]);

    const inFlight = this.interactions.get(key);
    if (inFlight) {
      return inFlight;
    }

    const waitsForAnother = this.interactions.size > 0;
    const run = this.interactionQueue.then(() =>
      this.runInteraction(scopes, target, options, retrySilentFirst || waitsForAnother)
    );
    // The next interaction starts after this one settles, whatever the outcome.
    this.interactionQueue = run.then(
      () => undefined,
      () => undefined
    );
    const shared = run.finally(() => {
      this.interactions.delete(key);
    });
    this.interactions.set(key, shared);
    return shared;
  }

  private async runInteraction(
    scopes: string[],
    target: TenantAuthority | undefined,
    options: TokenOptions | undefined,
    retrySilentFirst: boolean
  ): Promise<string> {
    const account = this.resolveAccount();

    if (retrySilentFirst && account) {
      try {
        return await this.acquireTokenSilent(scopes, account, target, options);
      } catch (error) {
        if (!needsInteraction(error)) {
          throw toAuthenticationError(error);
        }
      }
    }

    // Keep the user on the account they are signed in with: without account/loginHint, MSAL shows
    // the account picker and the user can pick a different account.
    const request: PopupRequest & RedirectRequest = {
      scopes,
      account: account ?? undefined,
      loginHint: account?.username,
      ...target,
      claims: options?.claims ?? this.options.claims,
      correlationId: options?.correlationId ?? this.options.correlationId,
    };

    if ((this.options.interactionType ?? "popup") === "redirect") {
      return this.acquireTokenRedirect(request);
    }

    let response: AuthenticationResult;
    try {
      response = await this.publicClientApplication.acquireTokenPopup(request);
    } catch (error) {
      if (isPopupBlockedError(error)) {
        if (this.options.fallbackToRedirect) {
          return this.acquireTokenRedirect(request);
        }
        throw MsalBrowserAuthenticationError.popupBlocked(error);
      }
      throw toAuthenticationError(error);
    }

    // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
    if (!response?.accessToken) {
      throw DataverseAuthenticationError.tokenAcquisitionFailed(
        "Received empty access token from popup authentication"
      );
    }

    // The user may have signed in, or picked another account: make it the active account so the
    // next silent call (here and in the rest of the app) uses it.
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition -- null in some MSAL versions
    if (response.account) {
      this.publicClientApplication.setActiveAccount(response.account);
    }
    // The interaction sent the configured claims: silent calls for these scopes can use the cache.
    this.claimsSent.add(this.claimsKey(scopes, target, response.account));
    this.completedInteractions++;

    return response.accessToken;
  }

  private async acquireTokenRedirect(request: RedirectRequest): Promise<never> {
    // Redirect flow: the page navigates away; the token arrives via handleRedirectPromise().
    try {
      await this.publicClientApplication.acquireTokenRedirect(request);
    } catch (error) {
      throw toAuthenticationError(error);
    }

    // This code won't be reached as the page will redirect
    throw DataverseAuthenticationError.tokenAcquisitionFailed(
      "Redirect flow initiated but page did not redirect"
    );
  }

  /**
   * Resolves the account for this call: the `account` function's result, then MSAL's active
   * account, then a configured `AccountInfo`, then the first cached account.
   */
  private resolveAccount(): AccountInfo | null {
    const configured = this.options.account;
    if (typeof configured === "function") {
      const chosen = configured();
      if (chosen) {
        return chosen;
      }
    }

    const active = this.publicClientApplication.getActiveAccount();
    if (active) {
      return active;
    }

    if (configured && typeof configured !== "function") {
      return configured;
    }

    return this.publicClientApplication.getAllAccounts()[0] ?? null;
  }

  /**
   * Maps `TokenOptions.tenantId` to an authority on the configured cloud (the `azureCloudOptions`
   * cloud, else the configured authority's host), so the token is issued by that tenant (guest
   * users, multi-tenant apps).
   */
  private tenantTarget(options?: TokenOptions): TenantAuthority | undefined {
    const tenantId = options?.tenantId;
    if (!tenantId) {
      return undefined;
    }
    return tenantAuthority(this.configuredAuthority(), tenantId);
  }

  private configuredAuthority(): ConfiguredAuthority | undefined {
    try {
      return this.publicClientApplication.getConfiguration().auth;
    } catch {
      // No configuration (a minimal IPublicClientApplication).
      return undefined;
    }
  }

  /**
   * Signs out the user
   *
   * @param account - Optional account to sign out (defaults to active account)
   * @returns Promise that resolves when sign out completes
   */
  async signOut(account?: AccountInfo): Promise<void> {
    const logoutAccount = account ?? this.publicClientApplication.getActiveAccount();

    const logoutRequest: EndSessionRequest = {
      account: logoutAccount ?? undefined,
    };

    // Use appropriate logout method based on interaction type
    if (this.options.interactionType === "redirect") {
      await this.publicClientApplication.logoutRedirect(logoutRequest);
    } else {
      await this.publicClientApplication.logoutPopup(logoutRequest);
    }
  }

  /**
   * Gets all cached accounts
   *
   * @returns Array of account info
   */
  getAccounts(): AccountInfo[] {
    return this.publicClientApplication.getAllAccounts();
  }

  /**
   * Sets the active account
   *
   * @param account - Account to set as active
   */
  setActiveAccount(account: AccountInfo): void {
    this.publicClientApplication.setActiveAccount(account);
  }

  /**
   * Gets the active account
   *
   * @returns Active account or null
   */
  getActiveAccount(): AccountInfo | null {
    return this.publicClientApplication.getActiveAccount();
  }
}
