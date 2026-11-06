import type {
  MetadataODataType,
  ServerSetMetadataProperty,
} from "./AttributeMetadataCreateTypes.js";
import type { ManyToManyRelationshipMetadata } from "./ManyToManyRelationshipMetadata.js";

/**
 * ManyToManyRelationshipMetadataCreate - the payload for creating an N:N relationship:
 * `@odata.type`, `SchemaName`, both tables and the intersect table name are required.
 */
export type ManyToManyRelationshipMetadataCreate = Omit<
  ManyToManyRelationshipMetadata,
  | ServerSetMetadataProperty
  | "IsCustomRelationship"
  | "RelationshipType"
  | "Entity1IntersectAttribute"
  | "Entity2IntersectAttribute"
  | "@odata.type"
  | "SchemaName"
  | "Entity1LogicalName"
  | "Entity2LogicalName"
  | "IntersectEntityName"
> & {
  "@odata.type": MetadataODataType<"ManyToManyRelationshipMetadata">;
  SchemaName: string;
  Entity1LogicalName: string;
  Entity2LogicalName: string;
  IntersectEntityName: string;
};
