/**
 * PagingInfo
 */
export interface PagingInfo {
  PageNumber?: number;
  Count?: number;
  ReturnTotalRecordCount?: boolean;
  ReturnRecordCountLessThanMarv?: boolean;
  PagingCookie?: string;
}
