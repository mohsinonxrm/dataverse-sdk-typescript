import type { BooleanManagedProperty } from "./BooleanManagedProperty.js";
import type { Label } from "./Label.js";
import type { OptionMetadata } from "./OptionMetadata.js";
import type { OptionSetType } from "./OptionSetType.js";

/**
 * ComplexBooleanOptionSetMetadata complex type
 */
export interface ComplexBooleanOptionSetMetadata {
  TrueOption?: OptionMetadata;
  FalseOption?: OptionMetadata;
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
