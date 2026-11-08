import { DataverseInvalidRequestError } from "@mohsinonxrm/dataverse-sdk-core";
import type { DiscoveredEnvironment, OrganizationDetail } from "./types.js";
import { OrganizationState } from "./types.js";
import { trimTrailingSlashes } from "./url.js";

/**
 * Summarise a Global Discovery Service {@link OrganizationDetail} as a
 * {@link DiscoveredEnvironment}: camel-cased names, `enabled` as a boolean and the Web API root.
 *
 * It needs a full row, such as one from `listOrganizations()` without `select`.
 *
 * @throws {DataverseInvalidRequestError} If `org` has no `Url` or `ApiUrl` (a row listed with a
 *   `select` that leaves them out)
 *
 * @example
 * ```typescript
 * const env = toEnvironment(org);
 * const client = new DataverseClient({
 *   baseUrl: env.apiUrl,
 *   tokenProvider,
 *   scopes: [`${env.url}/.default`],
 * });
 * ```
 */
export function toEnvironment(org: OrganizationDetail): DiscoveredEnvironment {
  // The type requires both, but a `$select` row (or a JavaScript caller) can lack them.
  for (const property of ["Url", "ApiUrl"] as const) {
    const value: unknown = org[property];
    if (typeof value !== "string" || value === "") {
      throw DataverseInvalidRequestError.invalidParameter(
        "org",
        `has no ${property}; list it without a $select that leaves out Url or ApiUrl`
      );
    }
  }
  const apiUrl = trimTrailingSlashes(org.ApiUrl);
  const env: DiscoveredEnvironment = {
    id: org.Id,
    url: trimTrailingSlashes(org.Url),
    apiUrl,
    webApiUrl: `${apiUrl}/api/data/v9.2`,
    name: org.FriendlyName,
    uniqueName: org.UniqueName,
    enabled: org.State === OrganizationState.Enabled,
    version: org.Version,
  };
  if (org.Region) env.region = org.Region;
  if (org.EnvironmentId) env.environmentId = org.EnvironmentId;
  return env;
}
