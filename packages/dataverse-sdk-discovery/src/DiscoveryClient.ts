/**
 * Global Discovery Service client for discovering Dataverse organizations
 *
 * @packageDocumentation
 */

import type { AccessTokenProvider } from "@mohsinonxrm/dataverse-sdk-core";
import type { OrganizationDetail, DiscoveryOptions, DiscoveryResponse } from "./types.js";

/**
 * Global Discovery Service endpoint for Commercial cloud
 */
const GLOBAL_DISCOVERY_URL = "https://globaldisco.crm.dynamics.com/api/discovery/v2.0";

/**
 * Discovery Service scopes for authentication
 */
const DISCOVERY_SCOPES = ["https://globaldisco.crm.dynamics.com/.default"];

/**
 * Client for interacting with the Dataverse Global Discovery Service.
 *
 * The Discovery Service allows you to discover which Dataverse organizations
 * a user has access to across all regions in the Commercial cloud.
 *
 * @example
 * ```typescript
 * import { DiscoveryClient } from '@mohsinonxrm/dataverse-sdk-discovery';
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
 *   console.log(`  Region: ${org.Geo}`);
 *   console.log(`  Web API: ${org.Endpoints.WebApiUrl}`);
 * });
 *
 * // Filter for enabled organizations only
 * const enabledOrgs = await discovery.listOrganizations({
 *   filter: "State eq 'Enabled'"
 * });
 * ```
 */
export class DiscoveryClient {
  private readonly tokenProvider: AccessTokenProvider;
  private readonly baseUrl: string;

  /**
   * Creates a new DiscoveryClient instance
   *
   * @param tokenProvider - Token provider for authentication
   * @param baseUrl - Optional custom discovery endpoint (defaults to Commercial global disco)
   *
   * @example
   * ```typescript
   * const discovery = new DiscoveryClient(tokenProvider);
   * ```
   */
  constructor(tokenProvider: AccessTokenProvider, baseUrl?: string) {
    this.tokenProvider = tokenProvider;
    this.baseUrl = baseUrl ?? GLOBAL_DISCOVERY_URL;
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
   * // Filter for enabled organizations
   * const enabledOrgs = await discovery.listOrganizations({
   *   filter: "State eq 'Enabled'"
   * });
   *
   * // Select specific properties
   * const basicInfo = await discovery.listOrganizations({
   *   select: ['UniqueName', 'FriendlyName', 'Geo', 'Endpoints']
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
    const token = await this.tokenProvider.getToken(DISCOVERY_SCOPES);

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
   *   console.log(`Web API: ${org.Endpoints.WebApiUrl}`);
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
   * Gets all organizations in a specific geographic region.
   *
   * @param geo - Geographic region code (e.g., 'NA', 'EMEA', 'APAC')
   * @returns Array of organizations in the specified region
   *
   * @throws {Error} If the request fails
   *
   * @example
   * ```typescript
   * // Get all North American organizations
   * const naOrgs = await discovery.getOrganizationsByRegion('NA');
   *
   * // Get all European organizations
   * const emeaOrgs = await discovery.getOrganizationsByRegion('EMEA');
   * ```
   */
  async getOrganizationsByRegion(geo: string): Promise<OrganizationDetail[]> {
    return await this.listOrganizations({
      filter: `Geo eq '${geo}'`,
    });
  }

  /**
   * Gets all enabled organizations.
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
      filter: "State eq 'Enabled'",
    });
  }
}
