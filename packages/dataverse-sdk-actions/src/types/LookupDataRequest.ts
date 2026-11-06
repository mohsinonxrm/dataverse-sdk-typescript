import type { EntityAndAttribute } from "./EntityAndAttribute.js";
import type { LookupEntityInfo } from "./LookupEntityInfo.js";

/**
 * LookupDataRequest complex type
 */
export interface LookupDataRequest {
  AppId?: string;
  EntityAndAttribute?: EntityAndAttribute;
  LookupEntityByName?: LookupEntityInfo[];
  QueryString?: string;
  RelatedRecordId?: string;
  ReturnMetadata?: boolean;
}
