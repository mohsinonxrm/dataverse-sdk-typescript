import type { IChangedItem } from "./IChangedItem.js";

/**
 * BusinessEntityChanges complex type
 */
export interface BusinessEntityChanges {
  Changes?: IChangedItem[];
  DataToken?: string;
  GlobalMetadataVersion?: string;
  MoreRecords?: boolean;
  PagingCookie?: string;
  RecordCountLessThanMarv?: number;
}
