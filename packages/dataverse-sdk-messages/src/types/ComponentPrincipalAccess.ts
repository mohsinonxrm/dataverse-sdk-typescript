import type { ShareAccessRights } from "./ShareAccessRights.js";

/**
 * ComponentPrincipalAccess complex type
 */
export interface ComponentPrincipalAccess {
  ShareAccessMask: ShareAccessRights;
  RequestType: number;
}
