import type { BooleanManagedProperty } from "./BooleanManagedProperty.js";
import type { EntityKeyIndexStatus } from "./EntityKeyIndexStatus.js";
import type { Label } from "./Label.js";
import type { MetadataBase } from "./MetadataBase.js";

/**
 * EntityKeyMetadata entity type
 */
export interface EntityKeyMetadata extends MetadataBase {
  DisplayName?: Label;
  LogicalName?: string;
  SchemaName?: string;
  EntityLogicalName?: string;
  KeyAttributes?: string[];
  IsCustomizable?: BooleanManagedProperty;
  IsManaged?: boolean;
  IntroducedVersion?: string;
  EntityKeyIndexStatus: EntityKeyIndexStatus;
  AsyncJob: string;
  IsSynchronous?: boolean;
  IsExportKey?: boolean;
  IsSecondaryKey?: boolean;
}
