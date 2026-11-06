import type { ComplexAttributeMetadata } from "./ComplexAttributeMetadata.js";
import type { ImeMode } from "./ImeMode.js";
import type { StringFormat } from "./StringFormat.js";
import type { StringFormatName } from "./StringFormatName.js";

/**
 * ComplexStringAttributeMetadata
 * Extends: ComplexAttributeMetadata
 */
export interface ComplexStringAttributeMetadata extends ComplexAttributeMetadata {
  DatabaseLength?: number;
  Format?: StringFormat;
  FormatName?: StringFormatName;
  FormulaDefinition?: string;
  ImeMode?: ImeMode;
  IsLocalizable?: boolean;
  MaxLength?: number;
  SourceTypeMask?: number;
  YomiOf?: string;
}
