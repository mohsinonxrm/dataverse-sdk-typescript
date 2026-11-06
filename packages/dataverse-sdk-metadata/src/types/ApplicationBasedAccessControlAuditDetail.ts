import type { AuditDetail } from "./AuditDetail.js";

/**
 * ApplicationBasedAccessControlAuditDetail
 * Extends: AuditDetail
 */
export interface ApplicationBasedAccessControlAuditDetail extends AuditDetail {
  ApplicationId?: string;
  ImpersonatedUserId?: string;
  UserID?: string;
}
