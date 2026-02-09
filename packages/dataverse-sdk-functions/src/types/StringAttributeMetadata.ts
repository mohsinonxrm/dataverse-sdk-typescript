import type { ImeMode } from "./ImeMode.js";
import type { StringFormat } from "./StringFormat.js";
import type { StringFormatName } from "./StringFormatName.js";

/**
 * StringAttributeMetadata entity type
 */
export interface StringAttributeMetadata {
  Format: StringFormat;
  FormatName: StringFormatName;
  ImeMode: ImeMode;
  MaxLength: number;
  YomiOf: string;
  IsLocalizable: boolean;
  DatabaseLength: number;
  FormulaDefinition: string;
  SourceTypeMask: number;
}
