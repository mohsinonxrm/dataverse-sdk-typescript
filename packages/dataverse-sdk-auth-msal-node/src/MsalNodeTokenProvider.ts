/**
 * @fileoverview MSAL Node Token Provider for Dataverse SDK
 * Implements AccessTokenProvider using @azure/msal-node for Node.js scenarios
 * Supports: Device Code, Client Credentials, Authorization Code with PKCE
 */

import {
  ConfidentialClientApplication,
  PublicClientApplication,
  DeviceCodeRequest,
  ClientCredentialRequest,
  AuthorizationCodeRequest,
  AuthorizationUrlRequest,
  UsernamePasswordRequest,
  SilentFlowRequest,
  AccountInfo,
  AuthenticationResult,
} from "@azure/msal-node";
import type { AccessTokenProvider, TokenOptions } from "@mohsinonxrm/dataverse-sdk-core";
import {
  DataverseAuthenticationError,
  DataverseInvalidRequestError,
} from "@mohsinonxrm/dataverse-sdk-core";

/**
 * Authentication flow types supported by MSAL Node
 */
export type AuthFlow =
  "deviceCode" | "clientCredentials" | "authorizationCode" | "usernamePassword" | "silent";

/**
 * Base configuration options for MSAL Node token provider
 */
export interface MsalNodeTokenProviderOptionsBase {
  /**
   * Scopes required for Dataverse access
   * Typically: ['https://<org>.crm.dynamics.com/.default']
   */
  scopes: string[];

  /**
   * Additional claims to request
   */
  claims?: string;

  /**
   * Correlation ID for telemetry
   */
  correlationId?: string;
}

/**
 * Device code flow options (for CLI scenarios)
 */
export interface DeviceCodeFlowOptions extends MsalNodeTokenProviderOptionsBase {
  flow: "deviceCode";

  /**
   * Callback to display device code instructions to user
   * @param deviceCodeResponse - Contains user code and verification URL
   */
  deviceCodeCallback: (deviceCodeResponse: {
    userCode: string;
    deviceCode: string;
    verificationUri: string;
    expiresIn: number;
    interval: number;
    message: string;
  }) => void;
}

/**
 * Client credentials flow options (for daemon scenarios)
 */
export interface ClientCredentialsFlowOptions extends MsalNodeTokenProviderOptionsBase {
  flow: "clientCredentials";

  /**
   * Optional tenant ID to use for the request
   * Overrides the tenant in the authority
   */
  tenantId?: string;
}

/**
 * Authorization code flow options (for web server scenarios)
 */
export interface AuthorizationCodeFlowOptions extends MsalNodeTokenProviderOptionsBase {
  flow: "authorizationCode";

  /**
   * Redirect URI registered in Azure AD
   */
  redirectUri: string;

  /**
   * Authorization code received from the /authorize endpoint
   */
  code?: string;

  /**
   * Code verifier for PKCE
   */
  codeVerifier?: string;
}

/**
 * Username/password flow options (for testing scenarios only - not recommended for production)
 */
export interface UsernamePasswordFlowOptions extends MsalNodeTokenProviderOptionsBase {
  flow: "usernamePassword";

  /**
   * Username (UPN format: user@domain.com)
   */
  username: string;

  /**
   * Password
   */
  password: string;
}

/**
 * Silent flow options (uses cached tokens)
 */
export interface SilentFlowOptions extends MsalNodeTokenProviderOptionsBase {
  flow: "silent";

  /**
   * Account to use for silent token acquisition
   */
  account: AccountInfo;
}

/**
 * Union type of all flow options
 */
export type MsalNodeTokenProviderOptions =
  | DeviceCodeFlowOptions
  | ClientCredentialsFlowOptions
  | AuthorizationCodeFlowOptions
  | UsernamePasswordFlowOptions
  | SilentFlowOptions;

/**
 * MSAL Node token provider for Dataverse SDK
 * Supports multiple authentication flows for different Node.js scenarios
 *
 * @example Device Code Flow (CLI)
 * ```typescript
 * import { PublicClientApplication } from '@azure/msal-node';
 * import { MsalNodeTokenProvider } from '@mohsinonxrm/dataverse-sdk-auth-msal-node';
 * import { DataverseClient } from '@mohsinonxrm/dataverse-sdk-core';
 *
 * const pca = new PublicClientApplication({
 *   auth: {
 *     clientId: 'your-client-id',
 *     authority: 'https://login.microsoftonline.com/your-tenant-id',
 *   },
 * });
 *
 * const tokenProvider = new MsalNodeTokenProvider(pca, {
 *   flow: 'deviceCode',
 *   scopes: ['https://org.crm.dynamics.com/.default'],
 *   deviceCodeCallback: (response) => {
 *     console.log(response.message);
 *   },
 * });
 *
 * const client = new DataverseClient({
 *   baseUrl: 'https://org.crm.dynamics.com',
 *   tokenProvider,
 * });
 * ```
 *
 * @example Client Credentials Flow (Daemon)
 * ```typescript
 * import { ConfidentialClientApplication } from '@azure/msal-node';
 * import { MsalNodeTokenProvider } from '@mohsinonxrm/dataverse-sdk-auth-msal-node';
 *
 * const cca = new ConfidentialClientApplication({
 *   auth: {
 *     clientId: 'your-client-id',
 *     authority: 'https://login.microsoftonline.com/your-tenant-id',
 *     clientSecret: 'your-client-secret',
 *   },
 * });
 *
 * const tokenProvider = new MsalNodeTokenProvider(cca, {
 *   flow: 'clientCredentials',
 *   scopes: ['https://org.crm.dynamics.com/.default'],
 * });
 * ```
 */
export class MsalNodeTokenProvider implements AccessTokenProvider {
  private clientApplication: PublicClientApplication | ConfidentialClientApplication;
  private options: MsalNodeTokenProviderOptions;
  private cachedAccount?: AccountInfo;

  /**
   * Creates a new MSAL Node token provider
   *
   * @param clientApplication - MSAL PublicClientApplication or ConfidentialClientApplication
   * @param options - Flow-specific configuration options
   */
  constructor(
    clientApplication: PublicClientApplication | ConfidentialClientApplication,
    options: MsalNodeTokenProviderOptions
  ) {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
    if (!clientApplication) {
      throw DataverseInvalidRequestError.missingParameter("clientApplication");
    }

    // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
    if (!options) {
      throw DataverseInvalidRequestError.missingParameter("options");
    }

    // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
    if (!options.scopes || options.scopes.length === 0) {
      throw DataverseInvalidRequestError.emptyScopes();
    }

    // Validate flow-specific requirements
    this.validateFlowOptions(clientApplication, options);

    this.clientApplication = clientApplication;
    this.options = options;
  }

  /**
   * Validates flow-specific options
   * @private
   */
  private validateFlowOptions(
    clientApplication: PublicClientApplication | ConfidentialClientApplication,
    options: MsalNodeTokenProviderOptions
  ): void {
    switch (options.flow) {
      case "deviceCode":
        if (!(clientApplication instanceof PublicClientApplication)) {
          throw DataverseInvalidRequestError.invalidParameter(
            "clientApplication",
            "Device code flow requires PublicClientApplication"
          );
        }
        // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
        if (!options.deviceCodeCallback) {
          throw DataverseInvalidRequestError.missingParameter("deviceCodeCallback");
        }
        break;

      case "clientCredentials":
        if (!(clientApplication instanceof ConfidentialClientApplication)) {
          throw DataverseInvalidRequestError.invalidParameter(
            "clientApplication",
            "Client credentials flow requires ConfidentialClientApplication"
          );
        }
        break;

      case "authorizationCode":
        if (!options.redirectUri) {
          throw DataverseInvalidRequestError.missingParameter("redirectUri");
        }
        break;

      case "usernamePassword":
        if (!(clientApplication instanceof PublicClientApplication)) {
          throw DataverseInvalidRequestError.invalidParameter(
            "clientApplication",
            "Username/password flow requires PublicClientApplication"
          );
        }
        if (!options.username || !options.password) {
          throw DataverseInvalidRequestError.missingParameter("username and password");
        }
        break;

      case "silent":
        // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
        if (!options.account) {
          throw DataverseInvalidRequestError.missingParameter("account");
        }
        break;
    }
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

    try {
      let result: AuthenticationResult | null;

      switch (this.options.flow) {
        case "deviceCode":
          result = await this.acquireTokenByDeviceCode(requestScopes, options);
          break;

        case "clientCredentials":
          result = await this.acquireTokenByClientCredentials(requestScopes, options);
          break;

        case "authorizationCode":
          result = await this.acquireTokenByAuthorizationCode(requestScopes, options);
          break;

        case "usernamePassword":
          result = await this.acquireTokenByUsernamePassword(requestScopes, options);
          break;

        case "silent":
          result = await this.acquireTokenSilent(requestScopes, options);
          break;

        default:
          throw DataverseInvalidRequestError.invalidParameter(
            "flow",
            // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/restrict-template-expressions, @typescript-eslint/no-unsafe-member-access
            `Unsupported flow: ${(this.options as any).flow}`
          );
      }

      if (!result?.accessToken) {
        throw DataverseAuthenticationError.tokenAcquisitionFailed(
          "Received empty access token from MSAL"
        );
      }

      // Cache account for future silent requests
      if (result.account) {
        this.cachedAccount = result.account;
      }

      return result.accessToken;
    } catch (error) {
      if (
        error instanceof DataverseAuthenticationError ||
        error instanceof DataverseInvalidRequestError
      ) {
        throw error;
      }

      throw DataverseAuthenticationError.tokenAcquisitionFailed(
        error instanceof Error ? error.message : String(error)
      );
    }
  }

  /**
   * Acquires token using device code flow
   * @private
   */
  private async acquireTokenByDeviceCode(
    scopes: string[],
    options?: TokenOptions
  ): Promise<AuthenticationResult | null> {
    const pca = this.clientApplication as PublicClientApplication;
    const flowOptions = this.options as DeviceCodeFlowOptions;

    const deviceCodeRequest: DeviceCodeRequest = {
      scopes,
      deviceCodeCallback: flowOptions.deviceCodeCallback,
      claims: options?.claims ?? this.options.claims,
      correlationId: options?.correlationId ?? this.options.correlationId,
    };

    return await pca.acquireTokenByDeviceCode(deviceCodeRequest);
  }

  /**
   * Acquires token using client credentials flow
   * @private
   */
  private async acquireTokenByClientCredentials(
    scopes: string[],
    options?: TokenOptions
  ): Promise<AuthenticationResult | null> {
    const cca = this.clientApplication as ConfidentialClientApplication;
    const flowOptions = this.options as ClientCredentialsFlowOptions;

    const clientCredentialRequest: ClientCredentialRequest = {
      scopes,
      azureRegion: undefined, // Can be added to options if needed
      claims: options?.claims ?? this.options.claims,
      correlationId: options?.correlationId ?? this.options.correlationId,
    };

    // Override authority if specific tenant requested
    if (flowOptions.tenantId || options?.tenantId) {
      clientCredentialRequest.authority = `https://login.microsoftonline.com/${options?.tenantId ?? flowOptions.tenantId ?? ""}`;
    }

    return await cca.acquireTokenByClientCredential(clientCredentialRequest);
  }

  /**
   * Acquires token using authorization code flow
   * @private
   */
  private async acquireTokenByAuthorizationCode(
    scopes: string[],
    options?: TokenOptions
  ): Promise<AuthenticationResult | null> {
    const flowOptions = this.options as AuthorizationCodeFlowOptions;

    if (!flowOptions.code) {
      throw DataverseInvalidRequestError.missingParameter("code (authorization code not provided)");
    }

    const authCodeRequest: AuthorizationCodeRequest = {
      scopes,
      redirectUri: flowOptions.redirectUri,
      code: flowOptions.code,
      codeVerifier: flowOptions.codeVerifier,
      claims: options?.claims ?? this.options.claims,
      correlationId: options?.correlationId ?? this.options.correlationId,
    };

    return await this.clientApplication.acquireTokenByCode(authCodeRequest);
  }

  /**
   * Acquires token using username/password flow
   * @private
   */
  private async acquireTokenByUsernamePassword(
    scopes: string[],
    options?: TokenOptions
  ): Promise<AuthenticationResult | null> {
    const pca = this.clientApplication as PublicClientApplication;
    const flowOptions = this.options as UsernamePasswordFlowOptions;

    const usernamePasswordRequest: UsernamePasswordRequest = {
      scopes,
      username: flowOptions.username,
      password: flowOptions.password,
      claims: options?.claims ?? this.options.claims,
      correlationId: options?.correlationId ?? this.options.correlationId,
    };

    return await pca.acquireTokenByUsernamePassword(usernamePasswordRequest);
  }

  /**
   * Acquires token silently from cache
   * @private
   */
  private async acquireTokenSilent(
    scopes: string[],
    options?: TokenOptions
  ): Promise<AuthenticationResult | null> {
    const flowOptions = this.options as SilentFlowOptions;
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
    const account = flowOptions.account ?? this.cachedAccount;

    // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
    if (!account) {
      throw DataverseInvalidRequestError.missingParameter(
        "account (no cached account available for silent flow)"
      );
    }

    const silentRequest: SilentFlowRequest = {
      scopes,
      account,
      forceRefresh: false,
      claims: options?.claims ?? this.options.claims,
      correlationId: options?.correlationId ?? this.options.correlationId,
    };

    return await this.clientApplication.acquireTokenSilent(silentRequest);
  }

  /**
   * Gets the authorization URL for authorization code flow
   * Useful for generating login URLs in web server scenarios
   *
   * @param redirectUri - Redirect URI
   * @param scopes - Optional scopes (uses configured scopes if not provided)
   * @param state - Optional state parameter for CSRF protection
   * @param codeChallenge - Optional code challenge for PKCE
   * @returns Authorization URL
   */
  async getAuthCodeUrl(
    redirectUri: string,
    scopes?: string[],
    state?: string,
    codeChallenge?: string
  ): Promise<string> {
    const requestScopes = scopes ?? this.options.scopes;

    const authUrlRequest: AuthorizationUrlRequest = {
      scopes: requestScopes,
      redirectUri,
      state,
      codeChallenge,
      codeChallengeMethod: codeChallenge ? "S256" : undefined,
    };

    return await this.clientApplication.getAuthCodeUrl(authUrlRequest);
  }

  /**
   * Gets the cached account (if available)
   *
   * @returns Cached account or undefined
   */
  getCachedAccount(): AccountInfo | undefined {
    return this.cachedAccount;
  }

  /**
   * Gets all cached accounts from MSAL token cache
   *
   * @returns Array of accounts
   */
  async getAccounts(): Promise<AccountInfo[]> {
    const tokenCache = this.clientApplication.getTokenCache();
    return await tokenCache.getAllAccounts();
  }

  /**
   * Clears the token cache
   */
  async clearCache(): Promise<void> {
    const accounts = await this.getAccounts();
    const tokenCache = this.clientApplication.getTokenCache();

    for (const account of accounts) {
      await tokenCache.removeAccount(account);
    }

    this.cachedAccount = undefined;
  }
}
