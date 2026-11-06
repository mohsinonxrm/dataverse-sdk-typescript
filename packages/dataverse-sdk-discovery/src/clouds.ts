import { DataverseInvalidRequestError } from "@mohsinonxrm/dataverse-sdk-core";
import type {
  FetchProvider,
  Logger,
  MiddlewareCustomization,
  RetryOptions,
  TelemetryClient,
} from "@mohsinonxrm/dataverse-sdk-core";
import { trimTrailingSlashes } from "./url.js";

/**
 * A cloud the Global Discovery Service runs in.
 *
 * - `public`: Commercial cloud (most customers)
 * - `gcc`: US Government Community Cloud
 * - `usg`: US Government (GCC High)
 * - `dod`: US Department of Defense
 * - `china`: China, operated by 21Vianet
 */
export type DiscoveryCloud = "public" | "gcc" | "usg" | "dod" | "china";

/** The Global Discovery Service endpoint and token scope of a cloud. */
export interface DiscoveryCloudEndpoint {
  /** The service root, e.g. `https://globaldisco.crm.dynamics.com/api/discovery/v2.0`. */
  baseUrl: string;
  /** The scope to request a token for, e.g. `https://globaldisco.crm.dynamics.com/.default`. */
  scope: string;
}

/** The Global Discovery Service path appended to a cloud's host. */
export const DISCOVERY_API_PATH = "/api/discovery/v2.0";

function cloud(origin: string): DiscoveryCloudEndpoint {
  return { baseUrl: `${origin}${DISCOVERY_API_PATH}`, scope: `${origin}/.default` };
}

/**
 * Global Discovery Service endpoint and scope per cloud, from Microsoft Learn,
 * "Discover user organizations" (Global Discovery service locations). The token audience is the
 * cloud's discovery host.
 *
 * @see https://learn.microsoft.com/power-apps/developer/data-platform/discovery-service
 */
export const DISCOVERY_CLOUDS: Readonly<Record<DiscoveryCloud, DiscoveryCloudEndpoint>> =
  Object.freeze({
    public: cloud("https://globaldisco.crm.dynamics.com"),
    gcc: cloud("https://globaldisco.crm9.dynamics.com"),
    usg: cloud("https://globaldisco.crm.microsoftdynamics.us"),
    dod: cloud("https://globaldisco.crm.appsplatform.us"),
    china: cloud("https://globaldisco.crm.dynamics.cn"),
  });

/** Options for {@link DiscoveryClient}. */
export interface DiscoveryClientOptions {
  /**
   * The cloud to discover environments in. Selects the endpoint and the token scope from
   * {@link DISCOVERY_CLOUDS}. Defaults to `"public"`.
   */
  cloud?: DiscoveryCloud;

  /**
   * A custom Global Discovery Service root, which overrides the cloud's endpoint. Either the full
   * root (`https://globaldisco.example.com/api/discovery/v2.0`) or just the host
   * (`https://globaldisco.example.com`), in which case `/api/discovery/v2.0` is appended.
   * Unless `scopes` is given, the scope is derived from its origin: `https://<host>/.default`.
   */
  baseUrl?: string;

  /**
   * Scopes to request the token for, overriding the cloud's or `baseUrl`'s default
   * `https://<host>/.default`. For example `["https://globaldisco.crm.dynamics.com/user_impersonation"]`.
   */
  scopes?: string[];

  /**
   * The `fetch` to send requests with (tests, proxies, Node polyfills). Defaults to the global
   * `fetch`.
   */
  fetchProvider?: FetchProvider;

  /** Logger for request/response diagnostics, as in `DataverseClientOptions.logger`. */
  logger?: Logger;

  /** Telemetry client, as in `DataverseClientOptions.telemetry`. */
  telemetry?: TelemetryClient;

  /**
   * Retry policy for 429 / 502 / 503 / 504 responses, as in `DataverseClientOptions.retry`.
   * `Retry-After` is honoured. Defaults to the SDK's defaults.
   */
  retry?: RetryOptions;

  /**
   * Customise the middleware pipeline, as in `DataverseClientOptions.middleware`: `prepend`
   * middleware runs before the defaults, `append` middleware runs last, right before `fetch`
   * (so it sees the final headers, including `authorization`), and `replace` receives the
   * defaults and returns the list to use. Use it to record or inspect discovery requests;
   * `buildUrl(request)` from `@mohsinonxrm/dataverse-sdk-core` gives the URL `fetch` receives.
   */
  middleware?: MiddlewareCustomization;
}

/** The endpoint and scopes a {@link DiscoveryClientOptions} resolves to. */
export function resolveDiscoveryEndpoint(options: DiscoveryClientOptions = {}): {
  baseUrl: string;
  scopes: string[];
} {
  const cloudName = options.cloud ?? "public";
  if (!Object.prototype.hasOwnProperty.call(DISCOVERY_CLOUDS, cloudName)) {
    throw DataverseInvalidRequestError.invalidParameter(
      "cloud",
      `"${cloudName}" is not one of ${Object.keys(DISCOVERY_CLOUDS).join(", ")}`
    );
  }
  const preset = DISCOVERY_CLOUDS[cloudName];

  let baseUrl = preset.baseUrl;
  let scope = preset.scope;
  if (options.baseUrl !== undefined) {
    let parsed: URL;
    try {
      parsed = new URL(options.baseUrl);
    } catch {
      throw DataverseInvalidRequestError.invalidBaseUrl(options.baseUrl);
    }
    if (parsed.protocol !== "https:" && parsed.protocol !== "http:") {
      throw DataverseInvalidRequestError.invalidBaseUrl(options.baseUrl);
    }
    const path = trimTrailingSlashes(parsed.pathname);
    baseUrl = `${parsed.origin}${path === "" ? DISCOVERY_API_PATH : path}`;
    scope = `${parsed.origin}/.default`;
  }

  const scopes = options.scopes && options.scopes.length > 0 ? [...options.scopes] : [scope];
  return { baseUrl, scopes };
}
