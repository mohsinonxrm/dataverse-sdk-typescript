import type { AttributeMetadata } from "./AttributeMetadata.js";
import type { ImeMode } from "./ImeMode.js";
import type { StringFormat } from "./StringFormat.js";
import type { StringFormatName } from "./StringFormatName.js";

/**
 * StringAttributeMetadata entity type
 */
export interface StringAttributeMetadata extends AttributeMetadata {
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
