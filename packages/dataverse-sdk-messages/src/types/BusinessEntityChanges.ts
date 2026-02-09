import type { IChangedItem } from "./IChangedItem.js";

/**
 * BusinessEntityChanges complex type
 */
export interface BusinessEntityChanges {
  MoreRecords: boolean;
  RecordCountLessThanMarv: number;
  PagingCookie: string;
  DataToken: string;
  Changes: IChangedItem[];
  GlobalMetadataVersion: string;
}
