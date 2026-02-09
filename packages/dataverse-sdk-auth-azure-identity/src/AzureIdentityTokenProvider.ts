/**
 * @fileoverview Azure Identity Token Provider for Dataverse SDK
 * Implements AccessTokenProvider using @azure/identity for Azure-hosted scenarios
 * Supports: ManagedIdentity, DefaultAzureCredential, EnvironmentCredential, etc.
 */

import type { TokenCredential, GetTokenOptions } from "@azure/identity";
import type { AccessTokenProvider, TokenOptions } from "@mohsinonxrm/dataverse-sdk-core";
import {
  DataverseAuthenticationError,
  DataverseInvalidRequestError,
} from "@mohsinonxrm/dataverse-sdk-core";

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

    this.credential = credential;
    this.options = options;
  }

  /**
   * Acquires an access token from Azure Identity
   *
   * @param scopes - Optional scopes to override default scopes
   * @param options - Optional token request options (claims, tenantId, correlationId)
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

    try {
      // Build GetTokenOptions for Azure Identity
      // Note: correlationId is not part of GetTokenOptions in @azure/identity
      const getTokenOptions: GetTokenOptions = {
        ...this.options.getTokenOptions,
        tenantId: options?.tenantId ?? this.options.tenantId,
        claims: options?.claims,
      };

      // Acquire token from credential
      const tokenResponse = await this.credential.getToken(resolvedScopes, getTokenOptions);

      if (!tokenResponse?.token) {
        throw new DataverseAuthenticationError(
          "Token acquisition returned empty token. The credential may be misconfigured or expired."
        );
      }

      return tokenResponse.token;
    } catch (error) {
      // If already a Dataverse error, re-throw
      if (
        error instanceof DataverseAuthenticationError ||
        error instanceof DataverseInvalidRequestError
      ) {
        throw error;
      }

      // Wrap Azure Identity errors
      const authError = new DataverseAuthenticationError(
        `Failed to acquire token from Azure Identity: ${error instanceof Error ? error.message : "Unknown error"}`
      );
      // Attach original error as cause property
      if (error) {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        (authError as any).cause = error;
      }
      throw authError;
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
