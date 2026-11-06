import type { BooleanManagedProperty } from "./BooleanManagedProperty.js";
import type { Label } from "./Label.js";
import type { OptionMetadata } from "./OptionMetadata.js";
import type { OptionSetType } from "./OptionSetType.js";

/**
 * ComplexBooleanOptionSetMetadata
 */
export interface ComplexBooleanOptionSetMetadata {
  Description?: Label;
  DisplayName?: Label;
  ExternalTypeName?: string;
  FalseOption?: OptionMetadata;
  HasChanged?: boolean;
  IntroducedVersion?: string;
  IsCustomOptionSet?: boolean;
  IsCustomizable?: BooleanManagedProperty;
  IsGlobal?: boolean;
  IsManaged?: boolean;
  MetadataId?: string;
  Name?: string;
  OptionSetType?: OptionSetType;
  TrueOption?: OptionMetadata;
}
