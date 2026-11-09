import type { BooleanManagedProperty } from "./BooleanManagedProperty.js";
import type { EntityKeyIndexStatus } from "./EntityKeyIndexStatus.js";
import type { Label } from "./Label.js";
import type { MetadataBase } from "./MetadataBase.js";

/**
 * EntityKeyMetadata
 * Extends: MetadataBase
 */
export interface EntityKeyMetadata extends MetadataBase {
  AsyncJob: string;
  DisplayName?: Label;
  EntityKeyIndexStatus: EntityKeyIndexStatus;
  EntityLogicalName?: string;
  IntroducedVersion?: string;
  IsCustomizable?: BooleanManagedProperty;
  IsExportKey?: boolean;
  IsManaged?: boolean;
  IsSecondaryKey?: boolean;
  IsSynchronous?: boolean;
  KeyAttributes?: string[];
  LogicalName?: string;
  SchemaName?: string;
}
