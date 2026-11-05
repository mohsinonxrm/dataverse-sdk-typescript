import type { PagingInfo } from "./PagingInfo.js";

/**
 * LookupEntityInfo complex type
 */
export interface LookupEntityInfo {
  EntityLogicalName?: string;
  ViewId?: string;
  CustomFilter?: string;
  RelationshipName?: string;
  FetchXml?: string;
  LayoutJson?: string;
  PagingInfo?: PagingInfo;
}
