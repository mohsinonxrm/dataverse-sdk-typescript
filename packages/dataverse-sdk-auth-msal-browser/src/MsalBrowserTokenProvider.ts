/**
 * @fileoverview MSAL Browser Token Provider for Dataverse SDK
 * Implements AccessTokenProvider using @azure/msal-browser for SPA scenarios
 */

import type {
  IPublicClientApplication,
  AccountInfo,
  SilentRequest,
  PopupRequest,
  RedirectRequest,
  EndSessionRequest,
} from "@azure/msal-browser";
import { InteractionRequiredAuthError } from "@azure/msal-browser";
import type { AccessTokenProvider, TokenOptions } from "@mohsinonxrm/dataverse-sdk-core";
import {
  DataverseAuthenticationError,
  DataverseInvalidRequestError,
} from "@mohsinonxrm/dataverse-sdk-core";

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
   * Optional account to use for silent token acquisition
   * If not provided, will use the first account from MSAL cache
   */
  account?: AccountInfo;

  /**
   * Interaction type to use when silent acquisition fails
   * @default 'popup'
   */
  interactionType?: InteractionType;

  /**
   * Additional claims to request (e.g., for Conditional Access)
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
   * @throws {DataverseAuthenticationError} When token acquisition fails
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

    // Get account for silent request
    const account = this.options.account ?? this.getAccount();

    // Build silent request
    const silentRequest: SilentRequest = {
      scopes: requestScopes,
      account: account ?? undefined,
      claims: options?.claims ?? this.options.claims,
      correlationId: options?.correlationId ?? this.options.correlationId,
    };

    try {
      // Try silent acquisition first
      const response = await this.publicClientApplication.acquireTokenSilent(silentRequest);

      // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
      if (!response || !response.accessToken) {
        throw DataverseAuthenticationError.tokenAcquisitionFailed(
          "Received empty access token from MSAL"
        );
      }

      return response.accessToken;
    } catch (error) {
      // If interaction is required, use configured interaction type
      if (error instanceof InteractionRequiredAuthError) {
        return this.acquireTokenInteractive(requestScopes, options);
      }

      // Re-throw other errors as DataverseAuthenticationError
      throw DataverseAuthenticationError.tokenAcquisitionFailed(
        error instanceof Error ? error.message : String(error)
      );
    }
  }

  /**
   * Acquires token using interactive flow (popup or redirect)
   *
   * @param scopes - Scopes to request
   * @param options - Token options
   * @returns Access token string
   * @private
   */
  private async acquireTokenInteractive(scopes: string[], options?: TokenOptions): Promise<string> {
    const interactionType = this.options.interactionType ?? "popup";

    if (interactionType === "popup") {
      const popupRequest: PopupRequest = {
        scopes,
        claims: options?.claims ?? this.options.claims,
        correlationId: options?.correlationId ?? this.options.correlationId,
      };

      const response = await this.publicClientApplication.acquireTokenPopup(popupRequest);

      // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
      if (!response || !response.accessToken) {
        throw DataverseAuthenticationError.tokenAcquisitionFailed(
          "Received empty access token from popup authentication"
        );
      }

      return response.accessToken;
    } else {
      // Redirect flow - this won't return, will redirect the page
      const redirectRequest: RedirectRequest = {
        scopes,
        claims: options?.claims ?? this.options.claims,
        correlationId: options?.correlationId ?? this.options.correlationId,
      };

      await this.publicClientApplication.acquireTokenRedirect(redirectRequest);

      // This code won't be reached as the page will redirect
      throw DataverseAuthenticationError.tokenAcquisitionFailed(
        "Redirect flow initiated but page did not redirect"
      );
    }
  }

  /**
   * Gets the active account from MSAL cache
   *
   * @returns Account info or null if no accounts found
   * @private
   */
  private getAccount(): AccountInfo | null {
    const accounts = this.publicClientApplication.getAllAccounts();

    if (accounts.length === 0) {
      return null;
    }

    // Return the active account or the first account
    const activeAccount = this.publicClientApplication.getActiveAccount();
    return activeAccount ?? accounts[0];
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
