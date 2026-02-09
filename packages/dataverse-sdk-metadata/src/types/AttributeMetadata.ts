import type { AttributeRequiredLevelManagedProperty } from "./AttributeRequiredLevelManagedProperty.js";
import type { AttributeTypeCode } from "./AttributeTypeCode.js";
import type { AttributeTypeDisplayName } from "./AttributeTypeDisplayName.js";
import type { BooleanManagedProperty } from "./BooleanManagedProperty.js";
import type { EntitySetting } from "./EntitySetting.js";
import type { Label } from "./Label.js";
import type { MetadataBase } from "./MetadataBase.js";

/**
 * AttributeMetadata
 * Extends: MetadataBase
 */
export interface AttributeMetadata extends MetadataBase {
  AttributeOf?: string;
  AttributeType?: AttributeTypeCode;
  AttributeTypeName?: AttributeTypeDisplayName;
  ColumnNumber?: number;
  Description?: Label;
  DisplayName?: Label;
  DeprecatedVersion?: string;
  IntroducedVersion?: string;
  EntityLogicalName?: string;
  IsAuditEnabled?: BooleanManagedProperty;
  IsCustomAttribute?: boolean;
  IsPrimaryId?: boolean;
  IsValidODataAttribute: boolean;
  IsPrimaryName?: boolean;
  IsValidForCreate?: boolean;
  IsValidForRead?: boolean;
  IsValidForUpdate?: boolean;
  CanBeSecuredForRead?: boolean;
  CanBeSecuredForCreate?: boolean;
  CanBeSecuredForUpdate?: boolean;
  IsSecured?: boolean;
  IsRetrievable?: boolean;
  IsFilterable?: boolean;
  IsSearchable?: boolean;
  IsManaged?: boolean;
  IsGlobalFilterEnabled?: BooleanManagedProperty;
  IsSortableEnabled?: BooleanManagedProperty;
  LinkedAttributeId?: string;
  LogicalName?: string;
  IsCustomizable?: BooleanManagedProperty;
  IsRenameable?: BooleanManagedProperty;
  IsValidForAdvancedFind?: BooleanManagedProperty;
  IsValidForForm?: boolean;
  IsRequiredForForm?: boolean;
  IsValidForGrid?: boolean;
  RequiredLevel?: AttributeRequiredLevelManagedProperty;
  CanModifyAdditionalSettings?: BooleanManagedProperty;
  SchemaName?: string;
  ExternalName?: string;
  IsLogical?: boolean;
  IsDataSourceSecret?: boolean;
  InheritsFrom?: string;
  CreatedOn?: string;
  ModifiedOn?: string;
  SourceType?: number;
  AutoNumberFormat?: string;
  Settings?: EntitySetting[];
}
