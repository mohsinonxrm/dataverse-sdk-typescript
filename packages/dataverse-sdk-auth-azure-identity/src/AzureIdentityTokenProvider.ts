/**
 * @fileoverview Azure Identity Token Provider for Dataverse SDK
 * Implements AccessTokenProvider using @azure/identity for Azure-hosted scenarios
 * Supports: ManagedIdentity, DefaultAzureCredential, EnvironmentCredential, etc.
 */

import type { AccessToken, TokenCredential, GetTokenOptions } from "@azure/identity";
import type { AccessTokenProvider, TokenOptions } from "@mohsinonxrm/dataverse-sdk-core";
import {
  DataverseAuthenticationError,
  DataverseInvalidRequestError,
} from "@mohsinonxrm/dataverse-sdk-core";

/** Default {@link AzureIdentityTokenProviderOptions.refreshMarginMs}: 5 minutes. */
export const DEFAULT_REFRESH_MARGIN_MS = 5 * 60 * 1000;

/** Identifies a token request: the scope set (in any order) and the tenant. */
function cacheKey(scopes: string[], tenantId: string | undefined): string {
  return JSON.stringify([[...scopes].sort(), tenantId ?? null]);
}

/** A cached token, and the time after which the provider asks the credential for a new one. */
interface CachedToken {
  token: string;
  expiresOnTimestamp: number;
  refreshAt: number;
}

/**
 * Configuration options for Azure Identity token provider
 */
export interface AzureIdentityTokenProviderOptions {
  /**
   * Default scopes to request when none are provided to getToken()
   * Typically: ['https://<org>.crm.dynamics.com/.default']
   */
  scopes: string[];

  /**
   * Optional tenant ID to use for token requests
   * Useful for multi-tenant scenarios
   */
  tenantId?: string;

  /**
   * Additional options to pass to TokenCredential.getToken()
   */
  getTokenOptions?: Omit<GetTokenOptions, "tenantId">;

  /**
   * Keep tokens in memory, per scope set and tenant, until they are close to expiry. Default
   * `true`.
   *
   * The SDK asks for a token on every request. Some credentials don't cache: `AzureCliCredential`,
   * `AzurePowerShellCredential` and `AzureDeveloperCliCredential` start an `az` / `pwsh` / `azd`
   * process on every call, and `DefaultAzureCredential` walks its whole chain each time. With the
   * cache, the credential is called once per token lifetime, and concurrent requests share one
   * call. Set `false` to call the credential on every request.
   */
  cacheTokens?: boolean;

  /**
   * How long before a cached token expires the provider gets a new one, in milliseconds.
   * Default {@link DEFAULT_REFRESH_MARGIN_MS} (5 minutes). A token that lives shorter than twice
   * the margin is refreshed at half its lifetime. When the credential sets
   * `refreshAfterTimestamp` (managed identity does), the earlier of the two times is used.
   *
   * If that refresh fails while the cached token is still valid, the cached token is returned and
   * the next call tries again.
   */
  refreshMarginMs?: number;
}

/**
 * Azure Identity token provider for Dataverse SDK
 *
 * Enables authentication using any @azure/identity credential including:
 * - DefaultAzureCredential (tries multiple credential types)
 * - ManagedIdentityCredential (Azure resources with managed identity)
 * - EnvironmentCredential (environment variables)
 * - ClientSecretCredential (service principal)
 * - ClientCertificateCredential (certificate-based)
 * - UsernamePasswordCredential (username/password)
 * - DeviceCodeCredential (device code flow)
 * - InteractiveBrowserCredential (browser-based)
 * - AzureCliCredential (Azure CLI)
 * - AzurePowerShellCredential (Azure PowerShell)
 * - WorkloadIdentityCredential (Kubernetes workload identity)
 *
 * @example
 * ```typescript
 * // Managed Identity (recommended for Azure resources)
 * import { ManagedIdentityCredential } from '@azure/identity';
 * import { AzureIdentityTokenProvider } from '@mohsinonxrm/dataverse-sdk-auth-azure-identity';
 * import { DataverseClient } from '@mohsinonxrm/dataverse-sdk-core';
 *
 * const credential = new ManagedIdentityCredential();
 * const tokenProvider = new AzureIdentityTokenProvider(credential, {
 *   scopes: ['https://org.crm.dynamics.com/.default'],
 * });
 *
 * const client = new DataverseClient({
 *   baseUrl: 'https://org.crm.dynamics.com',
 *   tokenProvider,
 * });
 * ```
 *
 * @example
 * ```typescript
 * // DefaultAzureCredential (tries multiple credential types)
 * import { DefaultAzureCredential } from '@azure/identity';
 *
 * const credential = new DefaultAzureCredential();
 * const tokenProvider = new AzureIdentityTokenProvider(credential, {
 *   scopes: ['https://org.crm.dynamics.com/.default'],
 * });
 * ```
 *
 * @example
 * ```typescript
 * // Service Principal with Client Secret
 * import { ClientSecretCredential } from '@azure/identity';
 *
 * const credential = new ClientSecretCredential(
 *   'tenant-id',
 *   'client-id',
 *   'client-secret'
 * );
 * const tokenProvider = new AzureIdentityTokenProvider(credential, {
 *   scopes: ['https://org.crm.dynamics.com/.default'],
 * });
 * ```
 *
 * @example
 * ```typescript
 * // Azure CLI Credential (local development)
 * import { AzureCliCredential } from '@azure/identity';
 *
 * const credential = new AzureCliCredential();
 * const tokenProvider = new AzureIdentityTokenProvider(credential, {
 *   scopes: ['https://org.crm.dynamics.com/.default'],
 * });
 * ```
 */
export class AzureIdentityTokenProvider implements AccessTokenProvider {
  private credential: TokenCredential;
  private options: AzureIdentityTokenProviderOptions;
  /** Cached tokens by scope set and tenant (#86). */
  private readonly tokens = new Map<string, CachedToken>();
  /** Credential calls in progress by scope set and tenant, shared by concurrent callers. */
  private readonly inFlight = new Map<string, Promise<AccessToken>>();

  /**
   * Creates a new Azure Identity token provider
   *
   * @param credential - Any TokenCredential from @azure/identity
   * @param options - Configuration options including default scopes
   * @throws {DataverseInvalidRequestError} If credential or options are invalid
   */
  constructor(credential: TokenCredential, options: AzureIdentityTokenProviderOptions) {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
    if (!credential) {
      throw new DataverseInvalidRequestError(
        "TokenCredential is required. Please provide a valid credential from @azure/identity."
      );
    }

    // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
    if (!options) {
      throw new DataverseInvalidRequestError(
        "Options are required. Please provide AzureIdentityTokenProviderOptions with scopes."
      );
    }

    // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
    if (!options.scopes || options.scopes.length === 0) {
      throw new DataverseInvalidRequestError(
        'Scopes cannot be empty. Please provide at least one scope (e.g., ["https://org.crm.dynamics.com/.default"]).'
      );
    }

    if (
      options.refreshMarginMs !== undefined &&
      !(Number.isFinite(options.refreshMarginMs) && options.refreshMarginMs >= 0)
    ) {
      throw DataverseInvalidRequestError.invalidParameter(
        "refreshMarginMs",
        "must be a finite number of milliseconds, 0 or more"
      );
    }

    this.credential = credential;
    this.options = options;
  }

  /**
   * Acquires an access token from Azure Identity
   *
   * Tokens are cached in memory per scope set and tenant (see
   * {@link AzureIdentityTokenProviderOptions.cacheTokens}), so most calls don't reach the credential.
   *
   * @param scopes - Optional scopes to override default scopes
   * @param options - Optional token request options (claims, tenantId, correlationId). `forceRefresh`
   *   (sent by the SDK after a 401) skips this provider's cache and calls the credential.
   *   `@azure/identity` has no option to skip a credential's own cache, so an MSAL-based credential
   *   (client secret, managed identity, …) may still return its cached token. A claims challenge
   *   also skips the cache and is passed on; the token it returns replaces the cached one.
   * @returns Access token string
   * @throws {DataverseAuthenticationError} If token acquisition fails
   * @throws {DataverseInvalidRequestError} If scopes are empty after resolution
   *
   * @example
   * ```typescript
   * // Use default scopes from constructor
   * const token = await tokenProvider.getToken();
   *
   * // Override with different scopes
   * const token = await tokenProvider.getToken([
   *   'https://other-org.crm.dynamics.com/.default'
   * ]);
   *
   * // Pass additional options
   * const token = await tokenProvider.getToken(undefined, {
   *   tenantId: 'specific-tenant-id',
   *   claims: '{"access_token":{"email":{"essential":true}}}',
   * });
   * ```
   */
  async getToken(scopes?: string | string[], options?: TokenOptions): Promise<string> {
    // Resolve scopes: parameter > default from options
    const resolvedScopes = scopes
      ? Array.isArray(scopes)
        ? scopes
        : [scopes]
      : this.options.scopes;

    // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
    if (!resolvedScopes || resolvedScopes.length === 0) {
      throw new DataverseInvalidRequestError(
        "Scopes cannot be empty. Provide scopes in constructor or getToken() call."
      );
    }

    const tenantId = options?.tenantId ?? this.options.tenantId;
    // A claims challenge or forceRefresh (both sent by the SDK after a 401) means the cached token
    // was rejected, so they skip the cache.
    const bypassCache = options?.claims !== undefined || options?.forceRefresh === true;

    if (this.options.cacheTokens === false) {
      return (await this.requestToken(resolvedScopes, tenantId, options?.claims)).token;
    }

    const key = cacheKey(resolvedScopes, tenantId);
    const cached = this.tokens.get(key);
    if (cached && !bypassCache && Date.now() < cached.refreshAt) {
      return cached.token;
    }

    try {
      return (await this.fetchAndCache(key, resolvedScopes, tenantId, options?.claims)).token;
    } catch (error) {
      // The refresh margin is there so a failed refresh doesn't fail the request: the cached token
      // still works until it expires, and the next call tries again.
      if (cached && !bypassCache && Date.now() < cached.expiresOnTimestamp) {
        return cached.token;
      }
      throw error;
    }
  }

  /**
   * Removes every cached token, so the next `getToken()` calls the credential.
   */
  clearTokenCache(): void {
    this.tokens.clear();
  }

  /**
   * Calls the credential and caches the result. Calls without claims share one credential call
   * per scope set and tenant, so concurrent requests start one `az` process, not one each.
   * @private
   */
  private fetchAndCache(
    key: string,
    scopes: string[],
    tenantId: string | undefined,
    claims: string | undefined
  ): Promise<AccessToken> {
    if (claims === undefined) {
      const shared = this.inFlight.get(key);
      if (shared) {
        return shared;
      }
    }

    const promise = this.requestToken(scopes, tenantId, claims).then((accessToken) => {
      this.store(key, accessToken);
      return accessToken;
    });

    if (claims === undefined) {
      this.inFlight.set(key, promise);
      const forget = (): void => {
        if (this.inFlight.get(key) === promise) {
          this.inFlight.delete(key);
        }
      };
      promise.then(forget, forget);
    }
    return promise;
  }

  /**
   * Caches a token until `refreshMarginMs` before it expires (or its `refreshAfterTimestamp`).
   * A token without a usable expiry is not cached.
   * @private
   */
  private store(key: string, accessToken: AccessToken): void {
    const now = Date.now();
    const { expiresOnTimestamp, refreshAfterTimestamp } = accessToken;
    // Custom credentials may omit the expiry or send a non-number.
    if (!Number.isFinite(expiresOnTimestamp) || expiresOnTimestamp <= now) {
      this.tokens.delete(key);
      return;
    }
    const lifetime = expiresOnTimestamp - now;
    const margin = Math.min(
      this.options.refreshMarginMs ?? DEFAULT_REFRESH_MARGIN_MS,
      lifetime / 2
    );
    let refreshAt = expiresOnTimestamp - margin;
    if (refreshAfterTimestamp !== undefined && Number.isFinite(refreshAfterTimestamp)) {
      refreshAt = Math.min(refreshAt, refreshAfterTimestamp);
    }
    this.tokens.set(key, { token: accessToken.token, expiresOnTimestamp, refreshAt });
  }

  /**
   * One call to the credential, with Dataverse errors for failures.
   * @private
   */
  private async requestToken(
    scopes: string[],
    tenantId: string | undefined,
    claims: string | undefined
  ): Promise<AccessToken> {
    try {
      // Note: correlationId is not part of GetTokenOptions in @azure/identity
      const getTokenOptions: GetTokenOptions = {
        ...this.options.getTokenOptions,
        tenantId,
        claims,
      };

      const tokenResponse = await this.credential.getToken(scopes, getTokenOptions);

      if (!tokenResponse?.token) {
        throw new DataverseAuthenticationError(
          "Token acquisition returned empty token. The credential may be misconfigured or expired."
        );
      }

      return tokenResponse;
    } catch (error) {
      // If already a Dataverse error, re-throw
      if (
        error instanceof DataverseAuthenticationError ||
        error instanceof DataverseInvalidRequestError
      ) {
        throw error;
      }

      // Wrap Azure Identity errors, keeping the original as `cause`
      throw new DataverseAuthenticationError(
        `Failed to acquire token from Azure Identity: ${error instanceof Error ? error.message : "Unknown error"}`,
        error instanceof Error ? error : undefined
      );
    }
  }

  /**
   * Gets the underlying TokenCredential
   * Useful for advanced scenarios where direct credential access is needed
   *
   * @returns The TokenCredential instance
   */
  getCredential(): TokenCredential {
    return this.credential;
  }

  /**
   * Gets the current configuration options
   *
   * @returns The provider options
   */
  getOptions(): Readonly<AzureIdentityTokenProviderOptions> {
    return Object.freeze({ ...this.options });
  }
}
