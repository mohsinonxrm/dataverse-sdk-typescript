import type { ImeMode } from "./ImeMode.js";
import type { StringFormat } from "./StringFormat.js";
import type { StringFormatName } from "./StringFormatName.js";

/**
 * ComplexStringAttributeMetadata complex type
 */
export interface ComplexStringAttributeMetadata {
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
