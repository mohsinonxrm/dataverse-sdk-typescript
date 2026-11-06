import type { EntityMetadataCreate } from "./EntityMetadataCreate.js";

/**
 * EntityMetadataUpdate - the payload for updating a table. Updates are `PUT`s that replace the
 * definition, so send the complete definition (a retrieved `EntityMetadata` is accepted), or use
 * `mergeAndUpdateEntityDefinition`.
 */
export type EntityMetadataUpdate = Partial<
  Omit<EntityMetadataCreate, "@odata.type" | "Attributes">
> & {
  "@odata.type"?: string;
};
