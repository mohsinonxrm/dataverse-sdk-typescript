import type { BooleanManagedProperty } from "./BooleanManagedProperty.js";
import type { DateTimeBehavior } from "./DateTimeBehavior.js";
import type { DateTimeFormat } from "./DateTimeFormat.js";
import type { ImeMode } from "./ImeMode.js";

/**
 * ComplexDateTimeAttributeMetadata complex type
 */
export interface ComplexDateTimeAttributeMetadata {
  Format: DateTimeFormat;
  ImeMode: ImeMode;
  SourceTypeMask: number;
  FormulaDefinition: string;
  DateTimeBehavior: DateTimeBehavior;
  CanChangeDateTimeBehavior: BooleanManagedProperty;
}
