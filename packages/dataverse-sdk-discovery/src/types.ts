/**
 * Types for Global Discovery Service responses
 */

/**
 * Represents a Dataverse organization instance
 */
export interface OrganizationDetail {
  /**
   * Unique identifier for the organization
   */
  Id: string;

  /**
   * Unique name of the organization
   */
  UniqueName: string;

  /**
   * Friendly name of the organization
   */
  FriendlyName: string;

  /**
   * URL endpoints for this organization
   */
  Endpoints: OrganizationEndpoints;

  /**
   * State of the organization (Enabled, Disabled)
   */
  State: string;

  /**
   * Version of the organization
   */
  Version: string;

  /**
   * URL name of the organization
   */
  UrlName: string;

  /**
   * Geographic region where the organization is hosted
   */
  Geo: string;

  /**
   * Tenant ID associated with the organization
   */
  TenantId: string;

  /**
   * Environment ID
   */
  EnvironmentId: string;

  /**
   * Data center region code
   */
  Region: string;
}

/**
 * Organization endpoint URLs
 */
export interface OrganizationEndpoints {
  /**
   * Web API endpoint (v9.2)
   */
  WebApiUrl: string;

  /**
   * Web application endpoint
   */
  WebApplicationUrl: string;
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
   * Filter organizations by state (e.g., 'Enabled')
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
