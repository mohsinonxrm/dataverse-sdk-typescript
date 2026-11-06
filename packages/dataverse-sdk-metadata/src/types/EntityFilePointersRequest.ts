import type { ElasticEntitiesFilePointer } from "./ElasticEntitiesFilePointer.js";

/**
 * EntityFilePointersRequest
 */
export interface EntityFilePointersRequest {
  ElasticEntitiesFilePointers?: ElasticEntitiesFilePointer[];
  FilePointers?: string[];
  ObjectTypeCode?: number;
  OrganizationId?: string;
  ScaleGroupId?: string;
}
