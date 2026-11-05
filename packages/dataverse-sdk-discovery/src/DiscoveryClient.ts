/**
 * Global Discovery Service client for discovering Dataverse organizations
 *
 * @packageDocumentation
 */

import { DataverseInvalidRequestError } from "@mohsinonxrm/dataverse-sdk-core";
import type { AccessTokenProvider } from "@mohsinonxrm/dataverse-sdk-core";
import type { OrganizationDetail, DiscoveryOptions, DiscoveryResponse } from "./types.js";
import { OrganizationState } from "./types.js";
import { originOf } from "./url.js";
import { resolveDiscoveryEndpoint } from "./clouds.js";
import type { DiscoveryClientOptions } from "./clouds.js";

/**
 * Client for interacting with the Dataverse Global Discovery Service.
 *
 * The Discovery Service allows you to discover which Dataverse organizations
 * a user has access to across all regions of a cloud: Commercial (`public`, the default), `gcc`,
 * `usg` (GCC High), `dod` or `china`. See {@link DiscoveryClientOptions.cloud}.
 *
 * The service only returns environments for a signed-in user (a delegated token). An app-only
 * (client credentials) token gets no environments.
 *
 * @example
 * ```typescript
 * import { DiscoveryClient, toEnvironment } from '@mohsinonxrm/dataverse-sdk-discovery';
 * import { MsalNodeTokenProvider } from '@mohsinonxrm/dataverse-sdk-auth-msal-node';
 *
 * // Create token provider
 * const tokenProvider = new MsalNodeTokenProvider({
 *   clientId: 'your-client-id',
 *   authority: 'https://login.microsoftonline.com/your-tenant-id',
 *   flow: 'deviceCode',
 *   scopes: ['https://globaldisco.crm.dynamics.com/.default']
 * });
 *
 * // Create discovery client
 * const discovery = new DiscoveryClient(tokenProvider);
 *
 * // List all organizations
 * const orgs = await discovery.listOrganizations();
 * console.log('Available organizations:', orgs.length);
 *
 * orgs.forEach(org => {
 *   console.log(`${org.FriendlyName} (${org.UniqueName})`);
 *   console.log(`  Region: ${org.Region}`);
 *   console.log(`  Web API: ${org.ApiUrl}`);
 * });
 *
 * // Enabled organizations only (State is an integer: 0 = enabled, 1 = disabled)
 * const enabledOrgs = await discovery.getEnabledOrganizations();
 * const environments = enabledOrgs.map(toEnvironment);
 * ```
 */
export class DiscoveryClient {
  private readonly tokenProvider: AccessTokenProvider;
  private readonly baseUrl: string;
  private readonly scopes: string[];

  /**
   * Creates a new DiscoveryClient instance
   *
   * @param tokenProvider - Token provider for authentication
   * @param options - A cloud (`{ cloud: "usg" }`), a custom `baseUrl` and/or `scopes`. For
   *   backward compatibility a string is taken as `baseUrl`. Defaults to the Commercial cloud.
   *
   * @throws {DataverseInvalidRequestError} If `cloud` is unknown or `baseUrl` is not an absolute
   *   http(s) URL
   *
   * @example
   * ```typescript
   * // Commercial cloud
   * const discovery = new DiscoveryClient(tokenProvider);
   *
   * // GCC High: https://globaldisco.crm.microsoftdynamics.us, token for its /.default scope
   * const gccHigh = new DiscoveryClient(tokenProvider, { cloud: "usg" });
   *
   * // Custom endpoint; the scope is derived from its host unless `scopes` is given
   * const custom = new DiscoveryClient(tokenProvider, {
   *   baseUrl: "https://globaldisco.crm.dynamics.com",
   *   scopes: ["https://globaldisco.crm.dynamics.com/user_impersonation"],
   * });
   * ```
   */
  constructor(tokenProvider: AccessTokenProvider, options?: string | DiscoveryClientOptions) {
    this.tokenProvider = tokenProvider;
    const resolved = resolveDiscoveryEndpoint(
      typeof options === "string" ? { baseUrl: options } : options
    );
    this.baseUrl = resolved.baseUrl;
    this.scopes = resolved.scopes;
  }

  /** The Global Discovery Service root this client calls, e.g. `https://globaldisco.crm9.dynamics.com/api/discovery/v2.0`. */
  getBaseUrl(): string {
    return this.baseUrl;
  }

  /** The scopes this client requests its token for. */
  getScopes(): string[] {
    return [...this.scopes];
  }

  /**
   * Lists all Dataverse organizations the authenticated user has access to.
   *
   * @param options - Optional query options (filter, select, orderby)
   * @returns Array of organization details
   *
   * @throws {Error} If the request fails or authentication fails
   *
   * @example
   * ```typescript
   * // List all organizations
   * const orgs = await discovery.listOrganizations();
   *
   * // Filter for enabled organizations (State is an integer: 0 = enabled)
   * const enabledOrgs = await discovery.listOrganizations({
   *   filter: "State eq 0"
   * });
   *
   * // Select specific properties
   * const basicInfo = await discovery.listOrganizations({
   *   select: ['FriendlyName', 'ApiUrl']
   * });
   *
   * // Order by friendly name
   * const ordered = await discovery.listOrganizations({
   *   orderby: 'FriendlyName'
   * });
   *
   * // Find organization by unique name
   * const myOrg = await discovery.listOrganizations({
   *   filter: "UniqueName eq 'contoso'"
   * });
   * ```
   */
  async listOrganizations(options?: DiscoveryOptions): Promise<OrganizationDetail[]> {
    // Get access token
    const token = await this.tokenProvider.getToken(this.scopes);

    // Build query string
    const queryParams: string[] = [];

    if (options?.filter) {
      queryParams.push(`$filter=${encodeURIComponent(options.filter)}`);
    }

    if (options?.select && options.select.length > 0) {
      queryParams.push(`$select=${options.select.join(",")}`);
    }

    if (options?.orderby) {
      queryParams.push(`$orderby=${encodeURIComponent(options.orderby)}`);
    }

    const queryString = queryParams.length > 0 ? `?${queryParams.join("&")}` : "";
    const url = `${this.baseUrl}/Instances${queryString}`;

    // Make request
    const response = await fetch(url, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/json",
        "OData-MaxVersion": "4.0",
        "OData-Version": "4.0",
      },
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(
        `Discovery request failed: ${String(response.status)} ${response.statusText}. ${errorText}`
      );
    }

    const data = (await response.json()) as DiscoveryResponse;
    return data.value;
  }

  /**
   * Gets a specific organization by unique name.
   *
   * @param uniqueName - The unique name of the organization (e.g., 'contoso')
   * @returns Organization detail if found, null otherwise
   *
   * @throws {Error} If the request fails
   *
   * @example
   * ```typescript
   * const org = await discovery.getOrganization('contoso');
   * if (org) {
   *   console.log(`Found: ${org.FriendlyName}`);
   *   console.log(`Web API: ${org.ApiUrl}`);
   * } else {
   *   console.log('Organization not found');
   * }
   * ```
   */
  async getOrganization(uniqueName: string): Promise<OrganizationDetail | null> {
    const orgs = await this.listOrganizations({
      filter: `UniqueName eq '${uniqueName}'`,
    });

    return orgs.length > 0 ? orgs[0] : null;
  }

  /**
   * Gets the organization served at a URL.
   *
   * `url` can be the environment's application URL (`Url`, e.g. `https://contoso.crm.dynamics.com`),
   * its web services URL (`ApiUrl`, e.g. `https://contoso.api.crm.dynamics.com`) or any URL on
   * either origin, such as a Web API root (`…/api/data/v9.2`). Origins are compared
   * case-insensitively; the path, query and trailing slashes are ignored.
   *
   * The match is made on the client, against the full list of environments, because the service
   * compares strings case-sensitively and stores each URL in one exact form.
   *
   * @param url - An absolute http(s) URL of the environment
   * @returns Organization detail if found, null otherwise
   *
   * @throws {DataverseInvalidRequestError} If `url` is not an absolute http(s) URL
   *
   * @example
   * ```typescript
   * const org = await discovery.getOrganizationByUrl('https://contoso.crm.dynamics.com/');
   * ```
   */
  async getOrganizationByUrl(url: string): Promise<OrganizationDetail | null> {
    const wanted = originOf(url);
    if (!wanted) {
      throw DataverseInvalidRequestError.invalidParameter(
        "url",
        "must be an absolute http(s) URL such as https://contoso.crm.dynamics.com"
      );
    }
    const orgs = await this.listOrganizations();
    return (
      orgs.find((org) => originOf(org.Url) === wanted || originOf(org.ApiUrl) === wanted) ?? null
    );
  }

  /**
   * Gets all organizations in a specific region.
   *
   * Filters on the `Region` property (the v2.0 response has no `Geo` property). Region codes are
   * 2-3 letters, such as `'NA'`, and the service compares them case-sensitively.
   *
   * @param region - Region code (e.g., 'NA')
   * @returns Array of organizations in the specified region
   *
   * @throws {Error} If the request fails
   *
   * @example
   * ```typescript
   * // Get all North American organizations
   * const naOrgs = await discovery.getOrganizationsByRegion('NA');
   * ```
   */
  async getOrganizationsByRegion(region: string): Promise<OrganizationDetail[]> {
    return await this.listOrganizations({
      filter: `Region eq '${region}'`,
    });
  }

  /**
   * Gets all enabled organizations (`$filter=State eq 0`).
   *
   * @returns Array of enabled organizations
   *
   * @throws {Error} If the request fails
   *
   * @example
   * ```typescript
   * const enabledOrgs = await discovery.getEnabledOrganizations();
   * console.log(`You have access to ${enabledOrgs.length} enabled organizations`);
   * ```
   */
  async getEnabledOrganizations(): Promise<OrganizationDetail[]> {
    return await this.listOrganizations({
      filter: `State eq ${String(OrganizationState.Enabled)}`,
    });
  }
}
