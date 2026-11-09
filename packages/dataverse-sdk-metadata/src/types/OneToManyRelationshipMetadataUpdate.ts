import type {
  MetadataODataType,
  ServerSetMetadataProperty,
} from "./AttributeMetadataCreateTypes.js";
import type { ManyToManyRelationshipMetadataUpdate } from "./ManyToManyRelationshipMetadataUpdate.js";
import type { OneToManyRelationshipMetadata } from "./OneToManyRelationshipMetadata.js";

/**
 * OneToManyRelationshipMetadataUpdate - the payload for updating a 1:N relationship: its complete
 * definition, with `@odata.type`. Updates are `PUT`s that replace the definition, so a property
 * left out is reset to its default. Send the retrieved definition back with your changes, or use
 * `mergeAndUpdateRelationship`. The lookup column is updated as a column, not here.
 */
export type OneToManyRelationshipMetadataUpdate = Omit<
  OneToManyRelationshipMetadata,
  ServerSetMetadataProperty | "@odata.type" | "Lookup"
> & {
  "@odata.type": MetadataODataType<"OneToManyRelationshipMetadata">;
};

/** A complete 1:N or N:N relationship definition, told apart by `@odata.type`. */
export type RelationshipMetadataUpdateTypes =
  OneToManyRelationshipMetadataUpdate | ManyToManyRelationshipMetadataUpdate;

/**
 * RelationshipMetadataChanges - the relationship properties to change with
 * `mergeAndUpdateRelationship`, with the relationship's `@odata.type`
 * (`OneToManyRelationshipMetadata` or `ManyToManyRelationshipMetadata`), which the retrieve
 * casts to.
 */
export type RelationshipMetadataChanges =
  | (Partial<OneToManyRelationshipMetadataUpdate> &
      Pick<OneToManyRelationshipMetadataUpdate, "@odata.type">)
  | (Partial<ManyToManyRelationshipMetadataUpdate> &
      Pick<ManyToManyRelationshipMetadataUpdate, "@odata.type">);
