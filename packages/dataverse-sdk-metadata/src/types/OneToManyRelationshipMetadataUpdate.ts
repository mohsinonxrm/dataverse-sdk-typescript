import type { OneToManyRelationshipMetadataCreate } from "./OneToManyRelationshipMetadataCreate.js";

/**
 * OneToManyRelationshipMetadataUpdate - the payload for updating a 1:N relationship. Updates are
 * `PUT`s that replace the definition, so send the complete definition.
 */
export type OneToManyRelationshipMetadataUpdate = Partial<
  Omit<OneToManyRelationshipMetadataCreate, "@odata.type" | "Lookup">
> & {
  "@odata.type"?: string;
};
