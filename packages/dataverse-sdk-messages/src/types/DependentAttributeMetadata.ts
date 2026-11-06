import type { DependentOptionSetMetadata } from "./DependentOptionSetMetadata.js";

/**
 * DependentAttributeMetadata complex type
 */
export interface DependentAttributeMetadata {
  AttributeFormatType?: string;
  AttributeId?: string;
  AttributeOf?: string;
  AttributeType?: string;
  DisplayName?: string;
  EntityName?: string;
  IsCustomAttribute?: boolean;
  IsRangeBased?: boolean;
  IsValidForAdvancedFind?: boolean;
  IsValidForGrid?: boolean;
  LogicalName?: string;
  MaxLength?: number;
  MaxValue?: number;
  MinValue?: number;
  OptionSet?: DependentOptionSetMetadata;
  Precision?: number;
  Targets?: string[];
  YomiOf?: string;
}
