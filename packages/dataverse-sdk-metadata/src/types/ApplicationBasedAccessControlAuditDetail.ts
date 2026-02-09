import type { AuditDetail } from "./AuditDetail.js";

/**
 * ApplicationBasedAccessControlAuditDetail
 * Extends: AuditDetail
 */
export interface ApplicationBasedAccessControlAuditDetail extends AuditDetail {
  ApplicationId?: string;
  UserID?: string;
  ImpersonatedUserId?: string;
}
