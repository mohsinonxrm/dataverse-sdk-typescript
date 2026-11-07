import type { PagingInfo } from "./PagingInfo.js";

/**
 * LookupEntityInfo
 */
export interface LookupEntityInfo {
  CustomFilter?: string;
  EntityLogicalName?: string;
  FetchXml?: string;
  LayoutJson?: string;
  PagingInfo?: PagingInfo;
  RelationshipName?: string;
  ViewId?: string;
}
