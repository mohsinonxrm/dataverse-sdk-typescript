/**
 * @fileoverview MSAL Node Token Provider for Dataverse SDK
 * Implements AccessTokenProvider using @azure/msal-node for Node.js scenarios
 * Supports: Device Code, Client Credentials, Authorization Code with PKCE
 *
 * `@azure/msal-node` is a peer dependency and only its types are imported: the app's own MSAL copy
 * does the work, so nothing here relies on `instanceof` an MSAL class.
 */

import type {
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
import {
  hasUsernamePasswordFlow,
  isConfidentialClientApplication,
  isInteractionRequiredError,
  isPublicClientApplication,
  tokenAcquisitionFailed,
} from "./msalErrors.js";
import { assertValidTenant, tenantAuthority, type TenantAuthority } from "./authority.js";

const AUTH_CODE_SPENT =
  "the account needs a new sign-in and the authorization code was already redeemed. " +
  "Send the user through /authorize again and create a provider with the new code";

/** Identifies a scope set regardless of order, so concurrent callers can share a sign-in. */
function scopeKey(scopes: string[]): string {
  return [...scopes].sort().join(" ");
}

/**
 * A client credentials request with MSAL Node 7's `claimsFromClient`: client claims that MSAL
 * caches by value (unlike `claims`, which skips the cache). Older majors ignore the field.
 */
interface ClientCredentialRequestWithClientClaims extends ClientCredentialRequest {
  claimsFromClient?: string;
}

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
   * Claims to request (JSON), for example a Conditional Access authentication context.
   *
   * MSAL skips its token cache for any request with `claims`, so they are sent only when the
   * request goes to Entra ID anyway: the sign-in (device code, authorization code,
   * username/password), the first token for each scope set and tenant, and a forced refresh.
   * Later calls get the token from MSAL's cache. A claims challenge from a 401
   * (`TokenOptions.claims`) is always sent. With MSAL Node 7, client credentials also send them as
   * `claimsFromClient`, which MSAL caches by value.
   */
  claims?: string;

  /**
   * Correlation ID for telemetry
   */
  correlationId?: string;
}

/**
 * Device code flow options (for CLI scenarios).
 *
 * The user signs in once: the first `getToken()` runs the device code flow, and later calls use
 * `acquireTokenSilent` with the signed-in account (MSAL's cache, then its refresh token). The
 * device code prompt appears again only when MSAL says the account needs a new sign-in.
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
   * Tenant to get tokens from (a tenant id or domain), instead of the tenant in the
   * application's authority. The authority keeps the configured authority's host (or the
   * `azureCloudOptions` cloud), so a US Government or China app stays in its cloud.
   * `TokenOptions.tenantId` overrides it per call.
   */
  tenantId?: string;
}

/**
 * Authorization code flow options (for web server scenarios).
 *
 * The code is single use: the first `getToken()` redeems it, and later calls use
 * `acquireTokenSilent` with the account it signed in. When the silent call needs a new sign-in,
 * `getToken()` throws `DataverseAuthenticationError`; send the user through `/authorize` again and
 * create a provider with the new code.
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
 * Username/password flow options (for testing scenarios only - not recommended for production).
 *
 * The first `getToken()` signs in with the password; later calls use `acquireTokenSilent` with the
 * signed-in account, and send the password again only when MSAL says a new sign-in is needed.
 *
 * MSAL Node has deprecated `acquireTokenByUsernamePassword` (ROPC). The constructor throws
 * `DataverseInvalidRequestError` when the application doesn't have it.
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
  /** The sign-in in progress (device code, auth code, ROPC), shared by concurrent callers. */
  private signIn?: { key: string; promise: Promise<AuthenticationResult | null> };
  /** True once the authorization code has been sent to MSAL (codes are single use). */
  private codeRedeemed = false;
  /** Scope sets (with authority and account) that already got a token with the configured claims. */
  private readonly claimsSent = new Set<string>();

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
        if (!isPublicClientApplication(clientApplication)) {
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
        if (!isConfidentialClientApplication(clientApplication)) {
          throw DataverseInvalidRequestError.invalidParameter(
            "clientApplication",
            "Client credentials flow requires ConfidentialClientApplication"
          );
        }
        if (options.tenantId !== undefined) {
          assertValidTenant(options.tenantId);
        }
        break;

      case "authorizationCode":
        if (!options.redirectUri) {
          throw DataverseInvalidRequestError.missingParameter("redirectUri");
        }
        break;

      case "usernamePassword":
        if (!isPublicClientApplication(clientApplication)) {
          throw DataverseInvalidRequestError.invalidParameter(
            "clientApplication",
            "Username/password flow requires PublicClientApplication"
          );
        }
        if (!hasUsernamePasswordFlow(clientApplication)) {
          throw DataverseInvalidRequestError.invalidParameter(
            "clientApplication",
            "Username/password flow needs acquireTokenByUsernamePassword, which this " +
              "@azure/msal-node version doesn't have (MSAL deprecated the username/password " +
              "flow). Use the deviceCode or authorizationCode flow instead"
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
   * `options.tenantId` requests the token from that tenant, on the host of the application's
   * configured authority (or its `azureCloudOptions` cloud), for every flow: device code and
   * username/password sign in to it, the authorization code is redeemed where it was issued and the
   * tenant's token then comes from the signed-in account, and silent calls use it as authority.
   *
   * @throws {MsalNodeAuthenticationError} When token acquisition fails. It is a
   *   `DataverseAuthenticationError` with MSAL's `errorCode`, `subError`, `correlationId`,
   *   `errorNo` and the MSAL error as `cause`.
   * @throws {DataverseInvalidRequestError} `name: "InvalidTenantId"` for a malformed `tenantId`.
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
      const target = this.tenantTarget(options);
      let result: AuthenticationResult | null;

      switch (this.options.flow) {
        case "deviceCode":
        case "authorizationCode":
        case "usernamePassword":
          result = await this.acquireTokenForUser(requestScopes, target, options);
          break;

        case "clientCredentials":
          result = await this.acquireTokenByClientCredentials(requestScopes, target, options);
          break;

        case "silent":
          result = await this.acquireTokenSilent(requestScopes, target, options);
          break;

        default: {
          // Only a JavaScript caller (or a cast) gets here: TypeScript has narrowed the options
          // to `never`, so read the flow it passed as unknown.
          const { flow } = this.options as { flow: unknown };
          throw DataverseInvalidRequestError.invalidParameter(
            "flow",
            `Unsupported flow: ${String(flow)}`
          );
        }
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

      throw tokenAcquisitionFailed(error);
    }
  }

  /**
   * The tenant authority for this call: `TokenOptions.tenantId`, then (client credentials) the
   * configured `tenantId`, on the host of the application's configured authority. `undefined`
   * keeps the application's authority. Throws `InvalidTenantId` for a malformed tenant.
   * @private
   */
  private tenantTarget(options?: TokenOptions): TenantAuthority | undefined {
    const configured =
      this.options.flow === "clientCredentials" ? this.options.tenantId : undefined;
    const tenantId = options?.tenantId ?? configured;
    return tenantId ? tenantAuthority(this.clientApplication, tenantId) : undefined;
  }

  /**
   * Device code, authorization code and username/password: sign the user in once, then get every
   * later token with `acquireTokenSilent` for the signed-in account (MSAL's cache, then its refresh
   * token). The sign-in flow runs again only when the silent call says the account needs it, and
   * concurrent callers share one sign-in, so the user sees one device code prompt (#85).
   * @private
   */
  private async acquireTokenForUser(
    scopes: string[],
    target: TenantAuthority | undefined,
    options?: TokenOptions
  ): Promise<AuthenticationResult | null> {
    const key = JSON.stringify([scopeKey(scopes), target?.authority ?? null]);

    for (;;) {
      const pending = this.signIn;
      if (pending) {
        if (pending.key === key) {
          return await pending.promise;
        }
        // Another scope set is signing in: wait for it, then use the account it signs in.
        await pending.promise.catch(() => undefined);
      }

      const account = this.cachedAccount;
      if (account) {
        try {
          return await this.silent(account, scopes, target, options);
        } catch (error) {
          if (!isInteractionRequiredError(error)) {
            throw error;
          }
          if (this.options.flow === "authorizationCode") {
            throw tokenAcquisitionFailed(error, AUTH_CODE_SPENT);
          }
        }
        if (this.signIn) {
          // A concurrent call started the new sign-in while this one was failing: share it.
          continue;
        }
      } else if (this.options.flow === "authorizationCode" && this.codeRedeemed) {
        throw tokenAcquisitionFailed(undefined, AUTH_CODE_SPENT);
      }

      return await this.startSignIn(key, scopes, target, options);
    }
  }

  /**
   * Runs the configured sign-in flow once and keeps the account for the silent calls after it.
   * @private
   */
  private startSignIn(
    key: string,
    scopes: string[],
    target: TenantAuthority | undefined,
    options?: TokenOptions
  ): Promise<AuthenticationResult | null> {
    const promise = this.signInOnce(scopes, target, options)
      .then((result) => {
        if (result?.account) {
          this.cachedAccount = result.account;
        }
        return result;
      })
      .finally(() => {
        if (this.signIn?.promise === promise) {
          this.signIn = undefined;
        }
      });
    this.signIn = { key, promise };
    return promise;
  }

  private async signInOnce(
    scopes: string[],
    target: TenantAuthority | undefined,
    options?: TokenOptions
  ): Promise<AuthenticationResult | null> {
    if (this.options.flow === "authorizationCode") {
      // The code is redeemed where it was issued (the application's authority). A token from
      // another tenant then comes from the signed-in account's refresh token.
      const redeemed = await this.acquireTokenByAuthorizationCode(scopes, options);
      this.rememberClaimsSent(scopes, undefined, redeemed?.account);
      return target && redeemed?.account
        ? await this.silent(redeemed.account, scopes, target, options)
        : redeemed;
    }

    const result =
      this.options.flow === "deviceCode"
        ? await this.acquireTokenByDeviceCode(scopes, target, options)
        : await this.acquireTokenByUsernamePassword(scopes, target, options);
    // The sign-in sent the configured claims: silent calls for these scopes can use the cache.
    this.rememberClaimsSent(scopes, target, result?.account);
    return result;
  }

  /**
   * Acquires token using device code flow
   * @private
   */
  private async acquireTokenByDeviceCode(
    scopes: string[],
    target: TenantAuthority | undefined,
    options?: TokenOptions
  ): Promise<AuthenticationResult | null> {
    const pca = this.clientApplication as PublicClientApplication;
    const flowOptions = this.options as DeviceCodeFlowOptions;

    const deviceCodeRequest: DeviceCodeRequest = {
      scopes,
      deviceCodeCallback: flowOptions.deviceCodeCallback,
      claims: options?.claims ?? this.options.claims,
      correlationId: options?.correlationId ?? this.options.correlationId,
      ...target,
    };

    return await pca.acquireTokenByDeviceCode(deviceCodeRequest);
  }

  /**
   * Acquires token using client credentials flow
   * @private
   */
  private async acquireTokenByClientCredentials(
    scopes: string[],
    target: TenantAuthority | undefined,
    options?: TokenOptions
  ): Promise<AuthenticationResult | null> {
    const cca = this.clientApplication as ConfidentialClientApplication;
    const key = this.claimsKey(scopes, target);

    const clientCredentialRequest: ClientCredentialRequestWithClientClaims = {
      scopes,
      azureRegion: undefined, // Can be added to options if needed
      claims: this.cacheableClaims(key, options),
      correlationId: options?.correlationId ?? this.options.correlationId,
      ...target,
      // MSAL Node 7 caches client claims by value and sends them on every network call.
      ...(this.options.claims ? { claimsFromClient: this.options.claims } : {}),
      // After a 401 the SDK asks for a new token: skip MSAL's token cache (#167).
      ...(options?.forceRefresh ? { skipCache: true } : {}),
    };

    const result = await cca.acquireTokenByClientCredential(clientCredentialRequest);
    this.claimsSent.add(key);
    return result;
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

    // A code is single use, whether or not the redemption succeeds.
    this.codeRedeemed = true;
    return await this.clientApplication.acquireTokenByCode(authCodeRequest);
  }

  /**
   * Acquires token using username/password flow
   * @private
   */
  private async acquireTokenByUsernamePassword(
    scopes: string[],
    target: TenantAuthority | undefined,
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
      ...target,
    };

    // MSAL deprecated ROPC; the flow stays for the majors that still have it (the constructor
    // checks that the method exists, see UsernamePasswordFlowOptions)
    // eslint-disable-next-line @typescript-eslint/no-deprecated
    return await pca.acquireTokenByUsernamePassword(usernamePasswordRequest);
  }

  /**
   * Acquires token silently from cache
   * @private
   */
  private async acquireTokenSilent(
    scopes: string[],
    target: TenantAuthority | undefined,
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

    return await this.silent(account, scopes, target, options);
  }

  /**
   * `acquireTokenSilent` for an account. `TokenOptions.forceRefresh` (set by the SDK after a 401)
   * skips MSAL's cached access token and uses the refresh token.
   * @private
   */
  private async silent(
    account: AccountInfo,
    scopes: string[],
    target: TenantAuthority | undefined,
    options?: TokenOptions
  ): Promise<AuthenticationResult | null> {
    const key = this.claimsKey(scopes, target, account);
    const request: SilentFlowRequest = {
      scopes,
      account,
      forceRefresh: options?.forceRefresh ?? false,
      claims: this.cacheableClaims(key, options),
      correlationId: options?.correlationId ?? this.options.correlationId,
      ...target,
    };
    const result = await this.clientApplication.acquireTokenSilent(request);
    this.claimsSent.add(key);
    return result;
  }

  /**
   * The claims for a request MSAL could answer from its cache (silent, client credentials). A
   * claims challenge (`TokenOptions.claims`, after a 401) is always sent. The configured claims are
   * sent on the first request for the scope set, tenant and account, and on a forced refresh,
   * which go to Entra ID anyway: MSAL skips its cache for a request with claims, so sending them
   * every time would send every request to Entra ID.
   * @private
   */
  private cacheableClaims(key: string, options?: TokenOptions): string | undefined {
    if (options?.claims) {
      return options.claims;
    }
    return options?.forceRefresh || !this.claimsSent.has(key) ? this.options.claims : undefined;
  }

  private claimsKey(
    scopes: string[],
    target: TenantAuthority | undefined,
    account?: AccountInfo | null
  ): string {
    return JSON.stringify([
      scopeKey(scopes),
      target?.authority ?? null,
      account?.homeAccountId ?? null,
    ]);
  }

  private rememberClaimsSent(
    scopes: string[],
    target: TenantAuthority | undefined,
    account: AccountInfo | null | undefined
  ): void {
    this.claimsSent.add(this.claimsKey(scopes, target, account));
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
