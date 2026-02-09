import type { BooleanManagedProperty } from "./BooleanManagedProperty.js";
import type { Label } from "./Label.js";
import type { OptionMetadata } from "./OptionMetadata.js";
import type { OptionSetType } from "./OptionSetType.js";

/**
 * ComplexOptionSetMetadata
 */
export interface ComplexOptionSetMetadata {
  Options?: OptionMetadata[];
  ParentOptionSetName?: string;
  Description?: Label;
  DisplayName?: Label;
  IsCustomOptionSet?: boolean;
  IsGlobal?: boolean;
  IsManaged?: boolean;
  IsCustomizable?: BooleanManagedProperty;
  Name?: string;
  ExternalTypeName?: string;
  OptionSetType?: OptionSetType;
  IntroducedVersion?: string;
  MetadataId?: string;
  HasChanged?: boolean;
}
