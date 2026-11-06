import type { PagingInfo } from "./PagingInfo.js";

/**
 * LookupEntityInfo complex type
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
