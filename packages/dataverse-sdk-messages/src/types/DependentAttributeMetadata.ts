import type { DependentOptionSetMetadata } from "./DependentOptionSetMetadata.js";

/**
 * DependentAttributeMetadata complex type
 */
export interface DependentAttributeMetadata {
  AttributeId?: string;
  LogicalName?: string;
  DisplayName?: string;
  AttributeType?: string;
  AttributeFormatType?: string;
  EntityName?: string;
  IsCustomAttribute?: boolean;
  IsValidForAdvancedFind?: boolean;
  IsValidForGrid?: boolean;
  YomiOf?: string;
  AttributeOf?: string;
  OptionSet?: DependentOptionSetMetadata;
  Targets?: string[];
  IsRangeBased?: boolean;
  MinValue?: number;
  MaxValue?: number;
  Precision?: number;
  MaxLength?: number;
}
