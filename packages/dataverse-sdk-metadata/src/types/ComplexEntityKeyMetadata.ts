import type { BooleanManagedProperty } from "./BooleanManagedProperty.js";
import type { EntityKeyIndexStatus } from "./EntityKeyIndexStatus.js";
import type { Label } from "./Label.js";

/**
 * ComplexEntityKeyMetadata
 */
export interface ComplexEntityKeyMetadata {
  DisplayName?: Label;
  LogicalName?: string;
  SchemaName?: string;
  EntityLogicalName?: string;
  KeyAttributes?: string[];
  IsCustomizable?: BooleanManagedProperty;
  IsManaged?: boolean;
  IntroducedVersion?: string;
  EntityKeyIndexStatus?: EntityKeyIndexStatus;
  IsSynchronous?: boolean;
  IsExportKey?: boolean;
  IsSecondaryKey?: boolean;
  MetadataId?: string;
  HasChanged?: boolean;
}
