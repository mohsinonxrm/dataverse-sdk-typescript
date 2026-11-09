import type { MetadataODataType } from "./AttributeMetadataCreateTypes.js";
import type { ServerSetEntityProperty } from "./EntityMetadataCreate.js";
import type { EntityMetadata } from "./EntityMetadata.js";

/**
 * EntityMetadataUpdate - the payload for updating a table: its complete definition, with
 * `@odata.type`. Updates are `PUT`s that replace the definition, so a property left out is
 * reset to its default. Retrieve the definition, change it and send all of it back
 * (`{ ...retrieved, "@odata.type": "Microsoft.Dynamics.CRM.EntityMetadata" }`), or use
 * `mergeAndUpdateEntityDefinition` with just the changes. Columns (`Attributes`) are updated
 * one by one, not through the table.
 */
export type EntityMetadataUpdate = Omit<
  EntityMetadata,
  ServerSetEntityProperty | "@odata.type" | "Attributes"
> & {
  "@odata.type": MetadataODataType<"EntityMetadata">;
};

/**
 * EntityMetadataChanges - the table properties to change with `mergeAndUpdateEntityDefinition`,
 * which retrieves the rest of the definition and sends it with them.
 */
export type EntityMetadataChanges = Partial<EntityMetadataUpdate>;
