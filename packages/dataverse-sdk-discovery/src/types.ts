/**
 * Types for Global Discovery Service responses
 */

/**
 * Values of {@link OrganizationDetail.State}, as documented for the Global Discovery Service
 * `Instance` entity.
 */
export const OrganizationState = {
  /** The environment is enabled. */
  Enabled: 0,
  /** The environment is disabled. */
  Disabled: 1,
} as const;

/**
 * A Dataverse environment (an `Instance`) as returned by the Global Discovery Service v2.0
 * (`GET https://globaldisco.crm.dynamics.com/api/discovery/v2.0/Instances`).
 *
 * The property names are the service's own. The response is flat: there is no `Endpoints`
 * object and no `Geo` property. Use {@link toEnvironment} for a camel-cased summary.
 *
 * When the request uses `$select`, only the selected properties are present.
 *
 * @see https://learn.microsoft.com/power-apps/developer/data-platform/discovery-service
 */
export interface OrganizationDetail {
  /** The OrganizationId of the environment (a GUID). */
  Id: string;

  /** The unique name of the environment, e.g. `"unq6bcbf6bf1f2a4ab999012605b314d"`. */
  UniqueName: string;

  /** The name used in the environment's URL, e.g. `"contoso"` for `https://contoso.crm.dynamics.com`. */
  UrlName: string;

  /** The display name shown in make.powerapps.com and other environment pickers. */
  FriendlyName: string;

  /**
   * Whether the environment is enabled: `0` = enabled, `1` = disabled
   * (see {@link OrganizationState}). The service sends an integer, not a string.
   */
  State: number;

  /** The current version of the environment, e.g. `"9.2.24101.00177"`. */
  Version: string;

  /** The application (web client) URL, e.g. `"https://contoso.crm.dynamics.com"`. */
  Url: string;

  /**
   * The URL client applications should use for web services, e.g.
   * `"https://contoso.api.crm.dynamics.com"`. Pass it as `DataverseClientOptions.baseUrl`.
   */
  ApiUrl: string;

  /** When the environment was last updated (ISO 8601 date-time). */
  LastUpdated: string;

  /** The Power Platform environment id. */
  EnvironmentId?: string | null;

  /** The id of the Microsoft Entra tenant the environment belongs to (a GUID). */
  TenantId?: string | null;

  /** A 2-3 letter code for the region where the environment is located, e.g. `"NA"`, `"EUR"`. */
  Region?: string | null;

  /** The purpose given when the environment was created. */
  Purpose?: string | null;

  /** Whether the calling user has the System Administrator role in the environment. */
  IsUserSysAdmin?: boolean;

  /** The type of the organization (Dataverse `OrganizationType` enum value). */
  OrganizationType?: number;

  /** The id of the data center where the environment is located. */
  DatacenterId?: string | null;

  /** The name of the data center where the environment is located. Usually `null`. */
  DatacenterName?: string | null;

  /** For internal use only. */
  SchemaType?: string | null;

  /**
   * Status of the instance: `0` InstanceLocked, `1` PendingServiceInstanceMove,
   * `2` InstanceFailed, `3` Provisioning, `4` InActiveOrganizationStatus, `5` NewInstance,
   * `6` InstancePickerReady.
   */
  StatusMessage?: number | null;

  /** When the environment's trial period expires (ISO 8601 date-time), if it is a trial. */
  TrialExpirationDate?: string | null;
}

/**
 * A camel-cased summary of an {@link OrganizationDetail}, returned by {@link toEnvironment}.
 */
export interface DiscoveredEnvironment {
  /** The OrganizationId (`Id`). */
  id: string;
  /** The application URL (`Url`), e.g. `"https://contoso.crm.dynamics.com"`. */
  url: string;
  /** The web services URL (`ApiUrl`), e.g. `"https://contoso.api.crm.dynamics.com"`. */
  apiUrl: string;
  /** The Web API root, `ApiUrl` + `/api/data/v9.2`. */
  webApiUrl: string;
  /** The display name (`FriendlyName`). */
  name: string;
  /** The unique name (`UniqueName`). */
  uniqueName: string;
  /** `true` when `State` is `0` (enabled). */
  enabled: boolean;
  /** The environment version (`Version`). */
  version: string;
  /** The region code (`Region`), when the service returned one. */
  region?: string;
  /** The Power Platform environment id (`EnvironmentId`), when the service returned one. */
  environmentId?: string;
}

/**
 * Response from Global Discovery Service
 */
export interface DiscoveryResponse {
  value: OrganizationDetail[];
}

/**
 * Options for discovery service requests
 */
export interface DiscoveryOptions {
  /**
   * OData `$filter` expression, e.g. `"State eq 0"` or `"Region eq 'NA'"`.
   * String comparisons in the Global Discovery Service are case sensitive.
   */
  filter?: string;

  /**
   * Select specific properties
   */
  select?: string[];

  /**
   * Order results
   */
  orderby?: string;
}
