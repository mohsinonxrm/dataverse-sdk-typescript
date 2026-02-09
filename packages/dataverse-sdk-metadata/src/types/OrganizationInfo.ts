import type { OrganizationType } from "./OrganizationType.js";
import type { Solution } from "./Solution.js";

/**
 * OrganizationInfo
 */
export interface OrganizationInfo {
  InstanceType?: OrganizationType;
  Solutions?: Solution[];
}
