import type { LookupMetadata } from "./LookupMetadata.js";

/**
 * LookupEntityResponse
 */
export interface LookupEntityResponse {
  EntityLogicalName?: string;
  Metadata?: LookupMetadata;
  PagingCookie?: string;
  TotalRecordCount?: number;
}
