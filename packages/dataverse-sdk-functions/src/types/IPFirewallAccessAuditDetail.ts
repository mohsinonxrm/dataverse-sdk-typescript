import type { AuditDetail } from "./AuditDetail.js";

/**
 * IPFirewallAccessAuditDetail complex type
 */
export interface IPFirewallAccessAuditDetail extends AuditDetail {
  IPAddress?: string;
  UserID?: string;
}
