import type { EndpointCollection } from './EndpointCollection.js';
import type { OrganizationState } from './OrganizationState.js';
import type { OrganizationType } from './OrganizationType.js';

/**
 * OrganizationDetail complex type
 */
export interface OrganizationDetail {
  DatacenterId?: string;
  Endpoints?: EndpointCollection;
  EnvironmentId?: string;
  FriendlyName?: string;
  Geo?: string;
  OrganizationId?: string;
  OrganizationType?: OrganizationType;
  OrganizationVersion?: string;
  SchemaType?: string;
  State?: OrganizationState;
  TenantId?: string;
  UniqueName?: string;
  UrlName?: string;
}
