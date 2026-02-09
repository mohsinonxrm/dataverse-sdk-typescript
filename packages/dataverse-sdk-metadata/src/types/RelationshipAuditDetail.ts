import type { AuditDetail } from "./AuditDetail.js";

/**
 * RelationshipAuditDetail
 * Extends: AuditDetail
 */
export interface RelationshipAuditDetail extends AuditDetail {
  RelationshipName?: string;
}
