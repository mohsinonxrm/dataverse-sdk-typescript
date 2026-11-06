import type { ShareAccessRights } from "./ShareAccessRights.js";

/**
 * ComponentPrincipalAccess
 */
export interface ComponentPrincipalAccess {
  RequestType?: number;
  ShareAccessMask?: ShareAccessRights;
}
