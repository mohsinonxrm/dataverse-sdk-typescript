import type { AuditDetail } from "./AuditDetail.js";

/**
 * AuditDetailCollection complex type
 */
export interface AuditDetailCollection {
  AuditDetails: AuditDetail[];
  MoreRecords: boolean;
  PagingCookie: string;
  TotalRecordCount: number;
}
