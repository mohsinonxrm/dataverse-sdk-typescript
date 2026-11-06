import type { AuditDetail } from "./AuditDetail.js";
import type { RolePrivilege } from "./RolePrivilege.js";

/**
 * RolePrivilegeAuditDetail complex type
 */
export interface RolePrivilegeAuditDetail extends AuditDetail {
  OldRolePrivileges?: RolePrivilege[];
  NewRolePrivileges?: RolePrivilege[];
  InvalidNewPrivileges?: string[];
}
