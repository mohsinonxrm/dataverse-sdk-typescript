import type { AuditDetail } from "./AuditDetail.js";

/**
 * ApplicationBasedAccessControlAuditDetail complex type
 */
export interface ApplicationBasedAccessControlAuditDetail extends AuditDetail {
  ApplicationId?: string;
  ImpersonatedUserId?: string;
  UserID?: string;
}
