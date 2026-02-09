import type { AccessRights } from "./AccessRights.js";

/**
 * ShareAuditDetail complex type
 */
export interface ShareAuditDetail {
  OldPrivileges: AccessRights;
  NewPrivileges: AccessRights;
}
