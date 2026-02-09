import type { ImeMode } from "./ImeMode.js";
import type { MemoFormatName } from "./MemoFormatName.js";
import type { StringFormat } from "./StringFormat.js";

/**
 * ComplexMemoAttributeMetadata complex type
 */
export interface ComplexMemoAttributeMetadata {
  Format: StringFormat;
  FormatName: MemoFormatName;
  ImeMode: ImeMode;
  MaxLength: number;
  IsLocalizable: boolean;
}
