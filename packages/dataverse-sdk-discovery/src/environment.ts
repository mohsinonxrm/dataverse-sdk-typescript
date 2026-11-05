import type { DiscoveredEnvironment, OrganizationDetail } from "./types.js";
import { OrganizationState } from "./types.js";
import { trimTrailingSlashes } from "./url.js";

/**
 * Summarise a Global Discovery Service {@link OrganizationDetail} as a
 * {@link DiscoveredEnvironment}: camel-cased names, `enabled` as a boolean and the Web API root.
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
