import type { AuditDetail } from "./AuditDetail.js";

/**
 * ApplicationBasedAccessControlAuditDetail complex type
 */
export interface ApplicationBasedAccessControlAuditDetail extends AuditDetail {
  ApplicationId?: string;
  UserID?: string;
  ImpersonatedUserId?: string;
}
