import type {
  LookupAttributeMetadataCreate,
  MetadataODataType,
  ServerSetMetadataProperty,
} from "./AttributeMetadataCreateTypes.js";
import type { OneToManyRelationshipMetadata } from "./OneToManyRelationshipMetadata.js";

/**
 * OneToManyRelationshipMetadataCreate - the payload for creating a 1:N relationship and its
 * lookup column: `@odata.type`, `SchemaName`, both tables and the `Lookup` are required.
 */
export type OneToManyRelationshipMetadataCreate = Omit<
  OneToManyRelationshipMetadata,
  | ServerSetMetadataProperty
  | "IsCustomRelationship"
  | "RelationshipType"
  | "ReferencingAttribute"
  | "@odata.type"
  | "SchemaName"
  | "ReferencedEntity"
  | "ReferencingEntity"
  | "Lookup"
> & {
  "@odata.type": MetadataODataType<"OneToManyRelationshipMetadata">;
  SchemaName: string;
  /** The "one" (parent) table. */
  ReferencedEntity: string;
  /** The "many" (child) table, which gets the lookup column. */
  ReferencingEntity: string;
  /** The lookup column created on the referencing table. */
  Lookup: LookupAttributeMetadataCreate;
};
