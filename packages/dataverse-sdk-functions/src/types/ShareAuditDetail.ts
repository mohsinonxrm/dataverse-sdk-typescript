import type { AccessRights } from "./AccessRights.js";
import type { AuditDetail } from "./AuditDetail.js";

/**
 * ShareAuditDetail complex type
 */
export interface ShareAuditDetail extends AuditDetail {
  OldPrivileges?: AccessRights;
  NewPrivileges?: AccessRights;
}
