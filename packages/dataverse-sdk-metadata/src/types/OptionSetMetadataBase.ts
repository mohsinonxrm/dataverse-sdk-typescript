import type { MetadataBase } from "./MetadataBase.js";

/**
 * OptionSetMetadataBase - base interface for option set metadata
 * (Not present in CSDL - manually maintained)
 */
export interface OptionSetMetadataBase extends MetadataBase {
  Description?: { LocalizedLabels?: Array<{ Label?: string; LanguageCode?: number }> };
  DisplayName?: { LocalizedLabels?: Array<{ Label?: string; LanguageCode?: number }> };
  IsCustomOptionSet?: boolean;
  IsCustomizable?: { Value: boolean };
  IsGlobal?: boolean;
  IsManaged?: boolean;
  Name?: string;
  OptionSetType?: number;
  IntroducedVersion?: string;
  ExternalTypeName?: string;
}
