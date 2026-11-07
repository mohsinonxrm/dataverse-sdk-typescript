import type { BooleanManagedProperty } from "./BooleanManagedProperty.js";
import type { ComplexAttributeMetadata } from "./ComplexAttributeMetadata.js";
import type { DateTimeBehavior } from "./DateTimeBehavior.js";
import type { DateTimeFormat } from "./DateTimeFormat.js";
import type { ImeMode } from "./ImeMode.js";

/**
 * ComplexDateTimeAttributeMetadata complex type
 */
export interface ComplexDateTimeAttributeMetadata extends ComplexAttributeMetadata {
  CanChangeDateTimeBehavior?: BooleanManagedProperty;
  DateTimeBehavior?: DateTimeBehavior;
  Format?: DateTimeFormat;
  FormulaDefinition?: string;
  ImeMode?: ImeMode;
  SourceTypeMask?: number;
}
