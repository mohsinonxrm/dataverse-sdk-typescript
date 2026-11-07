import type { AuditDetail } from "./AuditDetail.js";

/**
 * UserAccessAuditDetail
 * Extends: AuditDetail
 */
export interface UserAccessAuditDetail extends AuditDetail {
  AccessTime?: string;
  Interval?: number;
}
