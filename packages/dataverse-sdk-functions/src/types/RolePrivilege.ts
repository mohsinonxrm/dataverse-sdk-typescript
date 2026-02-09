import type { PrivilegeDepth } from "./PrivilegeDepth.js";

/**
 * RolePrivilege complex type
 */
export interface RolePrivilege {
  Depth: PrivilegeDepth;
  PrivilegeId: string;
  BusinessUnitId: string;
  PrivilegeName: string;
  RecordFilterId: string;
  RecordFilterUniqueName: string;
}
