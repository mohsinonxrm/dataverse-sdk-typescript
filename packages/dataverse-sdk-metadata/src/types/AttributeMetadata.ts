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
  AutoNumberFormat?: string;
  CanBeSecuredForCreate?: boolean;
  CanBeSecuredForRead?: boolean;
  CanBeSecuredForUpdate?: boolean;
  CanModifyAdditionalSettings?: BooleanManagedProperty;
  ColumnNumber?: number;
  CreatedOn?: string;
  DeprecatedVersion?: string;
  Description?: Label;
  DisplayName?: Label;
  EntityLogicalName?: string;
  ExternalName?: string;
  InheritsFrom?: string;
  IntroducedVersion?: string;
  IsAuditEnabled?: BooleanManagedProperty;
  IsCustomAttribute?: boolean;
  IsCustomizable?: BooleanManagedProperty;
  IsDataSourceSecret?: boolean;
  IsFilterable?: boolean;
  IsGlobalFilterEnabled?: BooleanManagedProperty;
  IsLogical?: boolean;
  IsManaged?: boolean;
  IsPrimaryId?: boolean;
  IsPrimaryName?: boolean;
  IsRenameable?: BooleanManagedProperty;
  IsRequiredForForm?: boolean;
  IsRetrievable?: boolean;
  IsSearchable?: boolean;
  IsSecured?: boolean;
  IsSortableEnabled?: BooleanManagedProperty;
  IsValidForAdvancedFind?: BooleanManagedProperty;
  IsValidForCreate?: boolean;
  IsValidForForm?: boolean;
  IsValidForGrid?: boolean;
  IsValidForRead?: boolean;
  IsValidForUpdate?: boolean;
  IsValidODataAttribute: boolean;
  LinkedAttributeId?: string;
  LogicalName?: string;
  ModifiedOn?: string;
  RequiredLevel?: AttributeRequiredLevelManagedProperty;
  SchemaName?: string;
  Settings?: EntitySetting[];
  SourceType?: number;
}
