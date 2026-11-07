import type { AuditDetail } from "./AuditDetail.js";
import type { RolePrivilege } from "./RolePrivilege.js";

/**
 * RolePrivilegeAuditDetail
 * Extends: AuditDetail
 */
export interface RolePrivilegeAuditDetail extends AuditDetail {
  InvalidNewPrivileges?: string[];
  NewRolePrivileges?: RolePrivilege[];
  OldRolePrivileges?: RolePrivilege[];
}
