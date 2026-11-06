import type { AuditDetail } from './AuditDetail.js';

/**
 * UserAccessAuditDetail complex type
 */
export interface UserAccessAuditDetail extends AuditDetail {
  AccessTime?: string;
  Interval?: number;
}
