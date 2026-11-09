import type {
  MetadataODataType,
  OptionMetadataCreate,
  ServerSetMetadataProperty,
} from "./AttributeMetadataCreateTypes.js";
import type { OptionSetMetadata } from "./OptionSetMetadata.js";

/**
 * OptionSetMetadataCreate - the payload for creating a global choice: `@odata.type` and `Name`
 * are required.
 */
export type OptionSetMetadataCreate = Omit<
  OptionSetMetadata,
  ServerSetMetadataProperty | "IsCustomOptionSet" | "@odata.type" | "Name" | "Options"
> & {
  "@odata.type": MetadataODataType<"OptionSetMetadata">;
  Name: string;
  Options?: OptionMetadataCreate[];
};
