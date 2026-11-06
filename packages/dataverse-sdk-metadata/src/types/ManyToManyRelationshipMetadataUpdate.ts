import type { ManyToManyRelationshipMetadataCreate } from "./ManyToManyRelationshipMetadataCreate.js";

/**
 * ManyToManyRelationshipMetadataUpdate - the payload for updating an N:N relationship. Updates are
 * `PUT`s that replace the definition, so send the complete definition.
 */
export type ManyToManyRelationshipMetadataUpdate = Partial<
  Omit<ManyToManyRelationshipMetadataCreate, "@odata.type">
> & {
  "@odata.type"?: string;
};
