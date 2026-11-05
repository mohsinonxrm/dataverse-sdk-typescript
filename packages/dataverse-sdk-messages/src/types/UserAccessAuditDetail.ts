import type { AuditDetail } from "./AuditDetail.js";

/**
 * UserAccessAuditDetail complex type
 */
export interface UserAccessAuditDetail extends AuditDetail {
  Interval?: number;
  AccessTime?: string;
}
