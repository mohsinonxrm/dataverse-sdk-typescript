import type { ComplexAttributeMetadata } from "./ComplexAttributeMetadata.js";
import type { ImeMode } from "./ImeMode.js";
import type { MemoFormatName } from "./MemoFormatName.js";
import type { StringFormat } from "./StringFormat.js";

/**
 * ComplexMemoAttributeMetadata
 * Extends: ComplexAttributeMetadata
 */
export interface ComplexMemoAttributeMetadata extends ComplexAttributeMetadata {
  Format?: StringFormat;
  FormatName?: MemoFormatName;
  ImeMode?: ImeMode;
  MaxLength?: number;
  IsLocalizable?: boolean;
}
