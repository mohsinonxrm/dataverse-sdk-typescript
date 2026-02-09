import type { BooleanManagedProperty } from "./BooleanManagedProperty.js";
import type { EntityKeyIndexStatus } from "./EntityKeyIndexStatus.js";
import type { Label } from "./Label.js";

/**
 * EntityKeyMetadata entity type
 */
export interface EntityKeyMetadata {
  DisplayName: Label;
  LogicalName: string;
  SchemaName: string;
  EntityLogicalName: string;
  KeyAttributes: string[];
  IsCustomizable: BooleanManagedProperty;
  IsManaged: boolean;
  IntroducedVersion: string;
  EntityKeyIndexStatus: EntityKeyIndexStatus;
  AsyncJob: string;
  IsSynchronous: boolean;
  IsExportKey: boolean;
  IsSecondaryKey: boolean;
}
