import type { DiscoveredEnvironment, OrganizationDetail } from "./types.js";
import { OrganizationState } from "./types.js";

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

/**
 * The lower-cased origin of an absolute http(s) URL, or `undefined` when `value` is not one.
 * Used to match an environment by its `Url` or `ApiUrl`.
 */
export function originOf(value: string | null | undefined): string | undefined {
  if (!value) return undefined;
  try {
    const u = new URL(value);
    if (u.protocol !== "https:" && u.protocol !== "http:") return undefined;
    return u.origin;
  } catch {
    return undefined;
  }
}

/** Remove trailing `/` characters in linear time. */
function trimTrailingSlashes(value: string): string {
  let end = value.length;
  while (end > 0 && value.charCodeAt(end - 1) === 47) end--;
  return value.slice(0, end);
}
