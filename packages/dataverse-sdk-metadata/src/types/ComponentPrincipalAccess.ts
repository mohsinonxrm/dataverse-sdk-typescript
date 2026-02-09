import type { ShareAccessRights } from "./ShareAccessRights.js";

/**
 * ComponentPrincipalAccess
 */
export interface ComponentPrincipalAccess {
  ShareAccessMask?: ShareAccessRights;
  RequestType?: number;
}
