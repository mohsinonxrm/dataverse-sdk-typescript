import type { ElasticEntitiesFilePointer } from "./ElasticEntitiesFilePointer.js";

/**
 * EntityFilePointersRequest complex type
 */
export interface EntityFilePointersRequest {
  ObjectTypeCode: number;
  FilePointers: string[];
  ElasticEntitiesFilePointers: ElasticEntitiesFilePointer[];
  OrganizationId: string;
  ScaleGroupId: string;
}
