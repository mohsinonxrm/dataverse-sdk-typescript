import type { BooleanManagedProperty } from "./BooleanManagedProperty.js";
import type { Label } from "./Label.js";
import type { MetadataBase } from "./MetadataBase.js";
import type { OptionSetType } from "./OptionSetType.js";

/**
 * OptionSetMetadataBase - base interface for option set metadata
 * (Not present in CSDL - manually maintained)
 */
export interface OptionSetMetadataBase extends MetadataBase {
  Description?: Label;
  DisplayName?: Label;
  IsCustomOptionSet?: boolean;
  IsCustomizable?: BooleanManagedProperty;
  IsGlobal?: boolean;
  IsManaged?: boolean;
  Name?: string;
  OptionSetType?: OptionSetType;
  IntroducedVersion?: string;
  ExternalTypeName?: string;
}
