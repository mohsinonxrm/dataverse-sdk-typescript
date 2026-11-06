import type { LookupMetadata } from "./LookupMetadata.js";

/**
 * LookupEntityResponse complex type
 */
export interface LookupEntityResponse {
  EntityLogicalName?: string;
  Metadata?: LookupMetadata;
  PagingCookie?: string;
  TotalRecordCount?: number;
  Data?: Record<string, unknown>[];
}
