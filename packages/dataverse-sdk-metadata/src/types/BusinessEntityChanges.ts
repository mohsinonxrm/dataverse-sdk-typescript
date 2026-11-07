import type { IChangedItem } from "./IChangedItem.js";

/**
 * BusinessEntityChanges
 */
export interface BusinessEntityChanges {
  Changes?: IChangedItem[];
  DataToken?: string;
  GlobalMetadataVersion?: string;
  MoreRecords?: boolean;
  PagingCookie?: string;
  RecordCountLessThanMarv?: number;
}
