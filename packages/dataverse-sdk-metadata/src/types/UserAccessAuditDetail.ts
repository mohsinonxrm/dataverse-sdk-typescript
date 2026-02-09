import type { AuditDetail } from "./AuditDetail.js";

/**
 * UserAccessAuditDetail
 * Extends: AuditDetail
 */
export interface UserAccessAuditDetail extends AuditDetail {
  Interval?: number;
  AccessTime?: string;
}
