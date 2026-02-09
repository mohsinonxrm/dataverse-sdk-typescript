import type { AuditDetail } from "./AuditDetail.js";

/**
 * AuditDetailCollection
 */
export interface AuditDetailCollection {
  AuditDetails?: AuditDetail[];
  MoreRecords?: boolean;
  PagingCookie?: string;
  TotalRecordCount?: number;
}
