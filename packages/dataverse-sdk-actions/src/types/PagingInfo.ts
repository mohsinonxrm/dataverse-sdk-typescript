/**
 * PagingInfo complex type
 */
export interface PagingInfo {
  Count?: number;
  PageNumber?: number;
  PagingCookie?: string;
  ReturnRecordCountLessThanMarv?: boolean;
  ReturnTotalRecordCount?: boolean;
}
