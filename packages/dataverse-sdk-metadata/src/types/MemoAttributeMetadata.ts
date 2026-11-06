import type { AttributeMetadata } from "./AttributeMetadata.js";
import type { ImeMode } from "./ImeMode.js";
import type { MemoFormatName } from "./MemoFormatName.js";
import type { StringFormat } from "./StringFormat.js";

/**
 * MemoAttributeMetadata
 * Extends: AttributeMetadata
 */
export interface MemoAttributeMetadata extends AttributeMetadata {
  Format?: StringFormat;
  FormatName?: MemoFormatName;
  ImeMode?: ImeMode;
  IsLocalizable?: boolean;
  MaxLength?: number;
}
