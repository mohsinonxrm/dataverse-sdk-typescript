import type { AuditDetail } from "./AuditDetail.js";

/**
 * IPFirewallAccessAuditDetail
 * Extends: AuditDetail
 */
export interface IPFirewallAccessAuditDetail extends AuditDetail {
  IPAddress?: string;
  UserID?: string;
}
