/**
 * Picking the environment after sign-in: the visitor's environments from the Global Discovery
 * Service, ordered and filtered for the picker. Loaded with the picker and MSAL, not up front.
 */
import {
  DISCOVERY_CLOUDS,
  DiscoveryClient,
  toEnvironment,
  type DiscoveredEnvironment,
} from "@mohsinonxrm/dataverse-sdk-discovery";
import { normalizeUrl, validateEnvironmentUrl } from "../config";
import type { AuthSession } from "./session";

/**
 * The Global Discovery Service the picker asks: the Commercial cloud's, the cloud of the site's
 * sign-in authority (`login.microsoftonline.com`) and Content-Security-Policy (`*.dynamics.com`).
 */
export const DISCOVERY_ORIGIN = new URL(DISCOVERY_CLOUDS.public.baseUrl).origin;

/**
 * The token scopes for it: `https://globaldisco.crm.dynamics.com/user_impersonation`, the same
 * delegated Dynamics CRM permission an environment needs, so one consent at sign-in covers both.
 */
export const DISCOVERY_SCOPES = [`${DISCOVERY_ORIGIN}/user_impersonation`];

/** Above this many environments, the picker shows a filter box. */
export const FILTER_THRESHOLD = 5;

/** The environments the signed-in user can open, ordered for the picker. */
export async function discoverEnvironments(
  session: Pick<AuthSession, "tokenProvider" | "fetchProvider">,
  options: { lastUsed?: string; signal?: AbortSignal } = {}
): Promise<DiscoveredEnvironment[]> {
  const discovery = new DiscoveryClient(session.tokenProvider, {
    scopes: DISCOVERY_SCOPES,
    fetchProvider: session.fetchProvider,
  });
  const organizations = await discovery.listOrganizations({ signal: options.signal });
  return sortEnvironments(organizations.map(toEnvironment), options.lastUsed);
}

/** Whether the app can switch to an environment: enabled, and at a URL the site may call. */
export function canChoose(environment: DiscoveredEnvironment): boolean {
  return environment.enabled && validateEnvironmentUrl(environment.url) === undefined;
}

const sameUrl = (a: string, b: string | undefined) =>
  b !== undefined && normalizeUrl(a).toLowerCase() === normalizeUrl(b).toLowerCase();

/** The last used environment first, then the enabled ones, each group by name. */
export function sortEnvironments(
  environments: readonly DiscoveredEnvironment[],
  lastUsed?: string
): DiscoveredEnvironment[] {
  const rank = (e: DiscoveredEnvironment) => (sameUrl(e.url, lastUsed) ? 0 : e.enabled ? 1 : 2);
  return [...environments].sort(
    (a, b) =>
      rank(a) - rank(b) ||
      a.name.localeCompare(b.name, undefined, { sensitivity: "base" }) ||
      a.url.localeCompare(b.url)
  );
}

/**
 * The environments whose name, unique name, host, region or version contain every word of
 * `query`, ignoring case.
 */
export function filterEnvironments(
  environments: readonly DiscoveredEnvironment[],
  query: string
): DiscoveredEnvironment[] {
  const words = query.toLowerCase().split(/\s+/).filter(Boolean);
  if (!words.length) return [...environments];
  return environments.filter((e) => {
    const text = [e.name, e.uniqueName, hostOf(e.url), e.region ?? "", e.version]
      .join(" ")
      .toLowerCase();
    return words.every((w) => text.includes(w));
  });
}

/** `https://contoso.crm.dynamics.com` → `contoso.crm.dynamics.com`; the text itself if it isn't a URL. */
export function hostOf(url: string): string {
  try {
    return new URL(url).host;
  } catch {
    return url;
  }
}
