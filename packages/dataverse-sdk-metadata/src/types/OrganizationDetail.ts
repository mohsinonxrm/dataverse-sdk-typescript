import type { EndpointCollection } from "./EndpointCollection.js";
import type { OrganizationState } from "./OrganizationState.js";
import type { OrganizationType } from "./OrganizationType.js";

/**
 * OrganizationDetail
 */
export interface OrganizationDetail {
  OrganizationId?: string;
  FriendlyName?: string;
  OrganizationVersion?: string;
  EnvironmentId?: string;
  DatacenterId?: string;
  Geo?: string;
  TenantId?: string;
  UrlName?: string;
  UniqueName?: string;
  Endpoints?: EndpointCollection;
  State?: OrganizationState;
  SchemaType?: string;
  OrganizationType?: OrganizationType;
}
