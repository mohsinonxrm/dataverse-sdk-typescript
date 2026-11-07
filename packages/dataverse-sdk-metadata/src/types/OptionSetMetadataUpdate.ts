import type {
  MetadataODataType,
  ServerSetMetadataProperty,
} from "./AttributeMetadataCreateTypes.js";
import type { OptionSetMetadata } from "./OptionSetMetadata.js";

/**
 * OptionSetMetadataUpdate - the payload for updating a global choice: its complete definition,
 * with `@odata.type`. Updates are `PUT`s that replace the definition, so a property left out is
 * reset to its default. Send the retrieved definition back with your changes, or use
 * `mergeAndUpdateGlobalOptionSet`. A `PUT` doesn't change the options (`Options`): use
 * `insertOptionValue`, `updateOptionValue`, `deleteOptionValue` and `orderOptions`.
 */
export type OptionSetMetadataUpdate = Omit<
  OptionSetMetadata,
  ServerSetMetadataProperty | "IsCustomOptionSet" | "@odata.type" | "Options"
> & {
  "@odata.type": MetadataODataType<"OptionSetMetadata">;
};

/**
 * OptionSetMetadataChanges - the global choice properties to change with
 * `mergeAndUpdateGlobalOptionSet`, which retrieves the rest of the definition and sends it with
 * them.
 */
export type OptionSetMetadataChanges = Partial<OptionSetMetadataUpdate>;
