import type { BooleanManagedProperty } from "./BooleanManagedProperty.js";
import type { ComplexAttributeMetadata } from "./ComplexAttributeMetadata.js";
import type { DateTimeBehavior } from "./DateTimeBehavior.js";
import type { DateTimeFormat } from "./DateTimeFormat.js";
import type { ImeMode } from "./ImeMode.js";

/**
 * ComplexDateTimeAttributeMetadata
 * Extends: ComplexAttributeMetadata
 */
export interface ComplexDateTimeAttributeMetadata extends ComplexAttributeMetadata {
  Format?: DateTimeFormat;
  ImeMode?: ImeMode;
  SourceTypeMask?: number;
  FormulaDefinition?: string;
  DateTimeBehavior?: DateTimeBehavior;
  CanChangeDateTimeBehavior?: BooleanManagedProperty;
}
