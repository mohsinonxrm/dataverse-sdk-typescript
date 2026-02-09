import type { BooleanManagedProperty } from "./BooleanManagedProperty.js";
import type { Label } from "./Label.js";
import type { OptionSetType } from "./OptionSetType.js";

/**
 * OptionSetMetadataBase entity type
 */
export interface OptionSetMetadataBase {
  Description: Label;
  DisplayName: Label;
  IsCustomOptionSet: boolean;
  IsGlobal: boolean;
  IsManaged: boolean;
  IsCustomizable: BooleanManagedProperty;
  Name: string;
  ExternalTypeName: string;
  OptionSetType: OptionSetType;
  IntroducedVersion: string;
}
