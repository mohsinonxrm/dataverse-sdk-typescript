import type { PrivilegeDepth } from "./PrivilegeDepth.js";

/**
 * RolePrivilege
 */
export interface RolePrivilege {
  BusinessUnitId?: string;
  Depth?: PrivilegeDepth;
  PrivilegeId?: string;
  PrivilegeName?: string;
  RecordFilterId?: string;
  RecordFilterUniqueName?: string;
}
