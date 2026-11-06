import type { LookupMetadata } from "./LookupMetadata.js";

/**
 * LookupEntityResponse complex type
 */
export interface LookupEntityResponse {
  Metadata?: LookupMetadata;
  EntityLogicalName?: string;
  TotalRecordCount?: number;
  PagingCookie?: string;
  Data?: Record<string, unknown>[];
}
