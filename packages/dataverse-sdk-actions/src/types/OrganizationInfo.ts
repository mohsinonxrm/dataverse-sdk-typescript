import type { OrganizationType } from "./OrganizationType.js";
import type { Solution } from "./Solution.js";

/**
 * OrganizationInfo complex type
 */
export interface OrganizationInfo {
  InstanceType?: OrganizationType;
  Solutions?: Solution[];
}
