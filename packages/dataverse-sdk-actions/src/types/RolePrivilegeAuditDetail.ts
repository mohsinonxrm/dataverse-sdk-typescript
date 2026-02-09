import type { RolePrivilege } from "./RolePrivilege.js";

/**
 * RolePrivilegeAuditDetail complex type
 */
export interface RolePrivilegeAuditDetail {
  OldRolePrivileges: RolePrivilege[];
  NewRolePrivileges: RolePrivilege[];
  InvalidNewPrivileges: string[];
}
