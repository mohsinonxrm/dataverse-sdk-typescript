import type { PrivilegeType } from "./PrivilegeType.js";

/**
 * SecurityPrivilegeMetadata complex type
 */
export interface SecurityPrivilegeMetadata {
  CanBeBasic?: boolean;
  CanBeDeep?: boolean;
  CanBeGlobal?: boolean;
  CanBeLocal?: boolean;
  CanBeEntityReference?: boolean;
  CanBeParentEntityReference?: boolean;
  CanBeRecordFilter?: boolean;
  Name?: string;
  PrivilegeId?: string;
  PrivilegeType?: PrivilegeType;
}
