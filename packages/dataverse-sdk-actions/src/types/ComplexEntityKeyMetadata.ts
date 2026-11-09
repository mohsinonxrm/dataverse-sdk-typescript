import type { BooleanManagedProperty } from "./BooleanManagedProperty.js";
import type { EntityKeyIndexStatus } from "./EntityKeyIndexStatus.js";
import type { Label } from "./Label.js";

/**
 * ComplexEntityKeyMetadata complex type
 */
export interface ComplexEntityKeyMetadata {
  DisplayName?: Label;
  EntityKeyIndexStatus?: EntityKeyIndexStatus;
  EntityLogicalName?: string;
  HasChanged?: boolean;
  IntroducedVersion?: string;
  IsCustomizable?: BooleanManagedProperty;
  IsExportKey?: boolean;
  IsManaged?: boolean;
  IsSecondaryKey?: boolean;
  IsSynchronous?: boolean;
  KeyAttributes?: string[];
  LogicalName?: string;
  MetadataId?: string;
  SchemaName?: string;
}
