import type { EntityAndAttribute } from "./EntityAndAttribute.js";
import type { LookupEntityInfo } from "./LookupEntityInfo.js";

/**
 * LookupDataRequest
 */
export interface LookupDataRequest {
  LookupEntityByName?: LookupEntityInfo[];
  EntityAndAttribute?: EntityAndAttribute;
  AppId?: string;
  RelatedRecordId?: string;
  QueryString?: string;
  ReturnMetadata?: boolean;
}
