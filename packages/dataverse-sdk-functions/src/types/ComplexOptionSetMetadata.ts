import type { BooleanManagedProperty } from "./BooleanManagedProperty.js";
import type { Label } from "./Label.js";
import type { OptionMetadata } from "./OptionMetadata.js";
import type { OptionSetType } from "./OptionSetType.js";

/**
 * ComplexOptionSetMetadata complex type
 */
export interface ComplexOptionSetMetadata {
  Description?: Label;
  DisplayName?: Label;
  ExternalTypeName?: string;
  HasChanged?: boolean;
  IntroducedVersion?: string;
  IsCustomOptionSet?: boolean;
  IsCustomizable?: BooleanManagedProperty;
  IsGlobal?: boolean;
  IsManaged?: boolean;
  MetadataId?: string;
  Name?: string;
  OptionSetType?: OptionSetType;
  Options?: OptionMetadata[];
  ParentOptionSetName?: string;
}
