import type { AuditDetail } from './AuditDetail.js';

/**
 * RelationshipAuditDetail complex type
 */
export interface RelationshipAuditDetail extends AuditDetail {
  RelationshipName?: string;
  TargetRecords?: Record<string, unknown>[];
}
