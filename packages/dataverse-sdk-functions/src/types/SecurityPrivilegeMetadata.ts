import type { PrivilegeType } from "./PrivilegeType.js";

/**
 * SecurityPrivilegeMetadata complex type
 */
export interface SecurityPrivilegeMetadata {
  CanBeBasic?: boolean;
  CanBeDeep?: boolean;
  CanBeEntityReference?: boolean;
  CanBeGlobal?: boolean;
  CanBeLocal?: boolean;
  CanBeParentEntityReference?: boolean;
  CanBeRecordFilter?: boolean;
  Name?: string;
  PrivilegeId?: string;
  PrivilegeType?: PrivilegeType;
}
