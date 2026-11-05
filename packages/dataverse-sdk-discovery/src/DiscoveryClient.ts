/**
 * Global Discovery Service client for discovering Dataverse organizations
 *
 * @packageDocumentation
 */

import {
  DataverseClient,
  DataverseError,
  DataverseInvalidRequestError,
  odata,
  parseODataError,
} from "@mohsinonxrm/dataverse-sdk-core";
import type { AccessTokenProvider } from "@mohsinonxrm/dataverse-sdk-core";
import type {
  OrganizationDetail,
  DiscoveryOptions,
  DiscoveryRequestOptions,
  DiscoveryResponse,
} from "./types.js";
import { OrganizationState } from "./types.js";
import { originOf } from "./url.js";
import { resolveDiscoveryEndpoint } from "./clouds.js";
import type { DiscoveryClientOptions } from "./clouds.js";

/** Upper bound on `@odata.nextLink` pages followed by one call, so a looping service can't hang it. */
const MAX_PAGES = 1000;

/**
 * Client for interacting with the Dataverse Global Discovery Service.
 *
 * The Discovery Service allows you to discover which Dataverse organizations
 * a user has access to across all regions of a cloud: Commercial (`public`, the default), `gcc`,
 * `usg` (GCC High), `dod` or `china`. See {@link DiscoveryClientOptions.cloud}.
 *
 * Requests go through the SDK pipeline (the same one `DataverseClient` uses): an injectable
 * `fetchProvider`, retry with `Retry-After` on 429/502/503/504, logging and telemetry, and typed
 * errors (`DataverseODataError` / `DataverseThrottleError`, both `DataverseError`s with `status`).
 * The bearer token is only sent to the discovery host, including for `@odata.nextLink` pages.
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
  private readonly baseUrl: string;
  private readonly scopes: string[];
  private readonly http: DataverseClient;

  /**
   * Creates a new DiscoveryClient instance
   *
   * @param tokenProvider - Token provider for authentication
   * @param options - A cloud (`{ cloud: "usg" }`), a custom `baseUrl`, `scopes`, and pipeline
   *   options (`fetchProvider`, `logger`, `telemetry`, `retry`). For backward compatibility a
   *   string is taken as `baseUrl`. Defaults to the Commercial cloud.
   *
   * @throws {DataverseInvalidRequestError} If `cloud` is unknown or `baseUrl` is not an absolute
   *   https URL (plain http is allowed only for localhost)
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
   *
   * // Injected fetch and a gentler retry policy
   * const tested = new DiscoveryClient(tokenProvider, {
   *   fetchProvider: { fetch: myFetch },
   *   retry: { maxRetries: 2 },
   * });
   * ```
   */
  constructor(tokenProvider: AccessTokenProvider, options?: string | DiscoveryClientOptions) {
    const opts: DiscoveryClientOptions =
      typeof options === "string" ? { baseUrl: options } : (options ?? {});
    const resolved = resolveDiscoveryEndpoint(opts);
    this.baseUrl = resolved.baseUrl;
    this.scopes = resolved.scopes;
    // Every request uses an absolute URL, so the client's Web API root is never used; its origin
    // is the only one the token may be sent to.
    this.http = new DataverseClient({
      baseUrl: new URL(this.baseUrl).origin,
      tokenProvider,
      scopes: this.scopes,
      fetchProvider: opts.fetchProvider,
      logger: opts.logger,
      telemetry: opts.telemetry,
      retry: opts.retry,
    });
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
   * Every query option value is percent-encoded. `@odata.nextLink` pages are followed and
   * concatenated.
   *
   * @param options - Optional query options (filter, select, orderby) and an abort `signal`
   * @returns Array of organization details
   *
   * @throws {DataverseODataError} If the service returns an error status (`status`, `code`, `requestId`)
   * @throws {DataverseThrottleError} On a 429 that is still throttled after the retries (`retryAfterMs`)
   * @throws {DOMException} `AbortError` when `signal` aborts
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
   * // Order by friendly name, cancellable
   * const controller = new AbortController();
   * const ordered = await discovery.listOrganizations({
   *   orderby: 'FriendlyName',
   *   signal: controller.signal,
   * });
   *
   * // Build filters with escaped literals
   * import { odata } from '@mohsinonxrm/dataverse-sdk-core';
   * const matches = await discovery.listOrganizations({
   *   filter: odata.contains('FriendlyName', userInput),
   * });
   * ```
   */
  async listOrganizations(options?: DiscoveryOptions): Promise<OrganizationDetail[]> {
    const queryParams: string[] = [];
    if (options?.filter) {
      queryParams.push(`$filter=${encodeURIComponent(options.filter)}`);
    }
    if (options?.select && options.select.length > 0) {
      queryParams.push(`$select=${options.select.map(encodeURIComponent).join(",")}`);
    }
    if (options?.orderby) {
      queryParams.push(`$orderby=${encodeURIComponent(options.orderby)}`);
    }
    const queryString = queryParams.length > 0 ? `?${queryParams.join("&")}` : "";

    const results: OrganizationDetail[] = [];
    const seen = new Set<string>();
    let url: string | undefined = `${this.baseUrl}/Instances${queryString}`;
    while (url !== undefined) {
      if (seen.has(url) || seen.size >= MAX_PAGES) {
        throw new DataverseError(
          `Discovery paging stopped: ${seen.has(url) ? "@odata.nextLink repeated a page" : `more than ${String(MAX_PAGES)} pages`}`
        );
      }
      seen.add(url);
      const page = await this.getPage(url, options?.signal);
      results.push(...page.value);
      const next = page["@odata.nextLink"];
      // A relative link is relative to the page it came from, not to a Web API root.
      url = next ? new URL(next, url).href : undefined;
    }
    return results;
  }

  /**
   * Gets a specific organization by unique name.
   *
   * @param uniqueName - The unique name of the organization. Quotes are escaped.
   * @param options - Optional abort `signal`
   * @returns Organization detail if found, null otherwise
   *
   * @throws {DataverseError} If the request fails
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
  async getOrganization(
    uniqueName: string,
    options?: DiscoveryRequestOptions
  ): Promise<OrganizationDetail | null> {
    const orgs = await this.listOrganizations({
      filter: odata.eq("UniqueName", uniqueName),
      signal: options?.signal,
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
   * @param options - Optional abort `signal`
   * @returns Organization detail if found, null otherwise
   *
   * @throws {DataverseInvalidRequestError} If `url` is not an absolute http(s) URL
   * @throws {DataverseError} If the request fails
   *
   * @example
   * ```typescript
   * const org = await discovery.getOrganizationByUrl('https://contoso.crm.dynamics.com/');
   * ```
   */
  async getOrganizationByUrl(
    url: string,
    options?: DiscoveryRequestOptions
  ): Promise<OrganizationDetail | null> {
    const wanted = originOf(url);
    if (!wanted) {
      throw DataverseInvalidRequestError.invalidParameter(
        "url",
        "must be an absolute http(s) URL such as https://contoso.crm.dynamics.com"
      );
    }
    const orgs = await this.listOrganizations({ signal: options?.signal });
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
   * @param region - Region code (e.g., 'NA'). Quotes are escaped.
   * @param options - Optional abort `signal`
   * @returns Array of organizations in the specified region
   *
   * @throws {DataverseError} If the request fails
   *
   * @example
   * ```typescript
   * // Get all North American organizations
   * const naOrgs = await discovery.getOrganizationsByRegion('NA');
   * ```
   */
  async getOrganizationsByRegion(
    region: string,
    options?: DiscoveryRequestOptions
  ): Promise<OrganizationDetail[]> {
    return await this.listOrganizations({
      filter: odata.eq("Region", region),
      signal: options?.signal,
    });
  }

  /**
   * Gets all enabled organizations (`$filter=State eq 0`).
   *
   * @param options - Optional abort `signal`
   * @returns Array of enabled organizations
   *
   * @throws {DataverseError} If the request fails
   *
   * @example
   * ```typescript
   * const enabledOrgs = await discovery.getEnabledOrganizations();
   * console.log(`You have access to ${enabledOrgs.length} enabled organizations`);
   * ```
   */
  async getEnabledOrganizations(options?: DiscoveryRequestOptions): Promise<OrganizationDetail[]> {
    return await this.listOrganizations({
      filter: odata.eq("State", OrganizationState.Enabled),
      signal: options?.signal,
    });
  }

  /** GET one page through the pipeline; error statuses become typed `DataverseError`s. */
  private async getPage(url: string, signal?: AbortSignal): Promise<DiscoveryResponse> {
    const res = await this.http.send({
      method: "GET",
      url,
      headers: { accept: "application/json" },
      signal,
    });
    if (!res.ok) {
      throw await parseODataError(res);
    }
    return (await res.json()) as DiscoveryResponse;
  }
}
