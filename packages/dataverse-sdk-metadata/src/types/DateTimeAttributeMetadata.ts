import type { AttributeMetadata } from "./AttributeMetadata.js";
import type { BooleanManagedProperty } from "./BooleanManagedProperty.js";
import type { DateTimeBehavior } from "./DateTimeBehavior.js";
import type { DateTimeFormat } from "./DateTimeFormat.js";
import type { ImeMode } from "./ImeMode.js";

/**
 * DateTimeAttributeMetadata
 * Extends: AttributeMetadata
 */
export interface DateTimeAttributeMetadata extends AttributeMetadata {
  MinSupportedValue: string;
  MaxSupportedValue: string;
  Format?: DateTimeFormat;
  ImeMode?: ImeMode;
  SourceTypeMask?: number;
  FormulaDefinition?: string;
  DateTimeBehavior?: DateTimeBehavior;
  CanChangeDateTimeBehavior?: BooleanManagedProperty;
}
