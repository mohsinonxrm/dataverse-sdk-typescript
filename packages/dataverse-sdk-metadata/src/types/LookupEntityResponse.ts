import type { LookupMetadata } from "./LookupMetadata.js";

/**
 * LookupEntityResponse
 */
export interface LookupEntityResponse {
  Metadata?: LookupMetadata;
  EntityLogicalName?: string;
  TotalRecordCount?: number;
  PagingCookie?: string;
}
