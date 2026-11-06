import type { AttributeMetadata } from './AttributeMetadata.js';
import type { BooleanManagedProperty } from './BooleanManagedProperty.js';
import type { DateTimeBehavior } from './DateTimeBehavior.js';
import type { DateTimeFormat } from './DateTimeFormat.js';
import type { ImeMode } from './ImeMode.js';

/**
 * DateTimeAttributeMetadata entity type
 */
export interface DateTimeAttributeMetadata extends AttributeMetadata {
  CanChangeDateTimeBehavior?: BooleanManagedProperty;
  DateTimeBehavior?: DateTimeBehavior;
  Format?: DateTimeFormat;
  FormulaDefinition?: string;
  ImeMode?: ImeMode;
  MaxSupportedValue: string;
  MinSupportedValue: string;
  SourceTypeMask?: number;
}
