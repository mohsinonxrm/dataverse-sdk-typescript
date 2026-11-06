import type { ElasticEntitiesFilePointer } from "./ElasticEntitiesFilePointer.js";

/**
 * EntityFilePointersRequest complex type
 */
export interface EntityFilePointersRequest {
  ElasticEntitiesFilePointers?: ElasticEntitiesFilePointer[];
  FilePointers?: string[];
  ObjectTypeCode?: number;
  OrganizationId?: string;
  ScaleGroupId?: string;
}
