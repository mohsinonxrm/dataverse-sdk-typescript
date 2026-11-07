import type { AccessRights } from "./AccessRights.js";
import type { AuditDetail } from "./AuditDetail.js";

/**
 * ShareAuditDetail
 * Extends: AuditDetail
 */
export interface ShareAuditDetail extends AuditDetail {
  NewPrivileges?: AccessRights;
  OldPrivileges?: AccessRights;
}
