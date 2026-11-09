import type {
  MetadataODataType,
  ServerSetMetadataProperty,
} from "./AttributeMetadataCreateTypes.js";
import type { ManyToManyRelationshipMetadata } from "./ManyToManyRelationshipMetadata.js";

/**
 * ManyToManyRelationshipMetadataUpdate - the payload for updating an N:N relationship: its
 * complete definition, with `@odata.type`. Updates are `PUT`s that replace the definition, so a
 * property left out is reset to its default. Send the retrieved definition back with your
 * changes, or use `mergeAndUpdateRelationship`.
 */
export type ManyToManyRelationshipMetadataUpdate = Omit<
  ManyToManyRelationshipMetadata,
  ServerSetMetadataProperty | "@odata.type"
> & {
  "@odata.type": MetadataODataType<"ManyToManyRelationshipMetadata">;
};
