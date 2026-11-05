import type { AttributeRequiredLevelManagedProperty } from "./AttributeRequiredLevelManagedProperty.js";
import type { AttributeTypeCode } from "./AttributeTypeCode.js";
import type { AttributeTypeDisplayName } from "./AttributeTypeDisplayName.js";
import type { BigIntAttributeMetadata } from "./BigIntAttributeMetadata.js";
import type { BooleanAttributeMetadata } from "./BooleanAttributeMetadata.js";
import type { BooleanManagedProperty } from "./BooleanManagedProperty.js";
import type { DateTimeAttributeMetadata } from "./DateTimeAttributeMetadata.js";
import type { DecimalAttributeMetadata } from "./DecimalAttributeMetadata.js";
import type { DoubleAttributeMetadata } from "./DoubleAttributeMetadata.js";
import type { EntityNameAttributeMetadata } from "./EntityNameAttributeMetadata.js";
import type { EntitySetting } from "./EntitySetting.js";
import type { EnumAttributeMetadata } from "./EnumAttributeMetadata.js";
import type { FileAttributeMetadata } from "./FileAttributeMetadata.js";
import type { ImageAttributeMetadata } from "./ImageAttributeMetadata.js";
import type { IntegerAttributeMetadata } from "./IntegerAttributeMetadata.js";
import type { Label } from "./Label.js";
import type { LookupAttributeMetadata } from "./LookupAttributeMetadata.js";
import type { ManagedPropertyAttributeMetadata } from "./ManagedPropertyAttributeMetadata.js";
import type { MemoAttributeMetadata } from "./MemoAttributeMetadata.js";
import type { MetadataBase } from "./MetadataBase.js";
import type { MoneyAttributeMetadata } from "./MoneyAttributeMetadata.js";
import type { MultiSelectPicklistAttributeMetadata } from "./MultiSelectPicklistAttributeMetadata.js";
import type { PicklistAttributeMetadata } from "./PicklistAttributeMetadata.js";
import type { StateAttributeMetadata } from "./StateAttributeMetadata.js";
import type { StatusAttributeMetadata } from "./StatusAttributeMetadata.js";
import type { StringAttributeMetadata } from "./StringAttributeMetadata.js";
import type { UniqueIdentifierAttributeMetadata } from "./UniqueIdentifierAttributeMetadata.js";

/**
 * AttributeMetadata entity type
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

/**
 * A AttributeMetadata value: one of the concrete types below, with the `@odata.type` that tells
 * Dataverse which one it is.
 */
export type TypedAttributeMetadata =
  | (AttributeMetadata & { "@odata.type": "Microsoft.Dynamics.CRM.AttributeMetadata" })
  | (BigIntAttributeMetadata & { "@odata.type": "Microsoft.Dynamics.CRM.BigIntAttributeMetadata" })
  | (BooleanAttributeMetadata & {
      "@odata.type": "Microsoft.Dynamics.CRM.BooleanAttributeMetadata";
    })
  | (DateTimeAttributeMetadata & {
      "@odata.type": "Microsoft.Dynamics.CRM.DateTimeAttributeMetadata";
    })
  | (DecimalAttributeMetadata & {
      "@odata.type": "Microsoft.Dynamics.CRM.DecimalAttributeMetadata";
    })
  | (DoubleAttributeMetadata & { "@odata.type": "Microsoft.Dynamics.CRM.DoubleAttributeMetadata" })
  | (EntityNameAttributeMetadata & {
      "@odata.type": "Microsoft.Dynamics.CRM.EntityNameAttributeMetadata";
    })
  | (EnumAttributeMetadata & { "@odata.type": "Microsoft.Dynamics.CRM.EnumAttributeMetadata" })
  | (FileAttributeMetadata & { "@odata.type": "Microsoft.Dynamics.CRM.FileAttributeMetadata" })
  | (ImageAttributeMetadata & { "@odata.type": "Microsoft.Dynamics.CRM.ImageAttributeMetadata" })
  | (IntegerAttributeMetadata & {
      "@odata.type": "Microsoft.Dynamics.CRM.IntegerAttributeMetadata";
    })
  | (LookupAttributeMetadata & { "@odata.type": "Microsoft.Dynamics.CRM.LookupAttributeMetadata" })
  | (ManagedPropertyAttributeMetadata & {
      "@odata.type": "Microsoft.Dynamics.CRM.ManagedPropertyAttributeMetadata";
    })
  | (MemoAttributeMetadata & { "@odata.type": "Microsoft.Dynamics.CRM.MemoAttributeMetadata" })
  | (MoneyAttributeMetadata & { "@odata.type": "Microsoft.Dynamics.CRM.MoneyAttributeMetadata" })
  | (MultiSelectPicklistAttributeMetadata & {
      "@odata.type": "Microsoft.Dynamics.CRM.MultiSelectPicklistAttributeMetadata";
    })
  | (PicklistAttributeMetadata & {
      "@odata.type": "Microsoft.Dynamics.CRM.PicklistAttributeMetadata";
    })
  | (StateAttributeMetadata & { "@odata.type": "Microsoft.Dynamics.CRM.StateAttributeMetadata" })
  | (StatusAttributeMetadata & { "@odata.type": "Microsoft.Dynamics.CRM.StatusAttributeMetadata" })
  | (StringAttributeMetadata & { "@odata.type": "Microsoft.Dynamics.CRM.StringAttributeMetadata" })
  | (UniqueIdentifierAttributeMetadata & {
      "@odata.type": "Microsoft.Dynamics.CRM.UniqueIdentifierAttributeMetadata";
    });
