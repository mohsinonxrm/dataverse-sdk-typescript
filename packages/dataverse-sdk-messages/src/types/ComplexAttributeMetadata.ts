import type { AttributeRequiredLevelManagedProperty } from "./AttributeRequiredLevelManagedProperty.js";
import type { AttributeTypeCode } from "./AttributeTypeCode.js";
import type { AttributeTypeDisplayName } from "./AttributeTypeDisplayName.js";
import type { BooleanManagedProperty } from "./BooleanManagedProperty.js";
import type { ComplexBigIntAttributeMetadata } from "./ComplexBigIntAttributeMetadata.js";
import type { ComplexBooleanAttributeMetadata } from "./ComplexBooleanAttributeMetadata.js";
import type { ComplexDateTimeAttributeMetadata } from "./ComplexDateTimeAttributeMetadata.js";
import type { ComplexDecimalAttributeMetadata } from "./ComplexDecimalAttributeMetadata.js";
import type { ComplexDoubleAttributeMetadata } from "./ComplexDoubleAttributeMetadata.js";
import type { ComplexEnumAttributeMetadata } from "./ComplexEnumAttributeMetadata.js";
import type { ComplexFileAttributeMetadata } from "./ComplexFileAttributeMetadata.js";
import type { ComplexImageAttributeMetadata } from "./ComplexImageAttributeMetadata.js";
import type { ComplexIntegerAttributeMetadata } from "./ComplexIntegerAttributeMetadata.js";
import type { ComplexLookupAttributeMetadata } from "./ComplexLookupAttributeMetadata.js";
import type { ComplexManagedPropertyAttributeMetadata } from "./ComplexManagedPropertyAttributeMetadata.js";
import type { ComplexMemoAttributeMetadata } from "./ComplexMemoAttributeMetadata.js";
import type { ComplexMoneyAttributeMetadata } from "./ComplexMoneyAttributeMetadata.js";
import type { ComplexStringAttributeMetadata } from "./ComplexStringAttributeMetadata.js";
import type { ComplexUniqueIdentifierAttributeMetadata } from "./ComplexUniqueIdentifierAttributeMetadata.js";
import type { EntitySetting } from "./EntitySetting.js";
import type { Label } from "./Label.js";

/**
 * ComplexAttributeMetadata complex type
 */
export interface ComplexAttributeMetadata {
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
  HasChanged?: boolean;
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
  IsValidODataAttribute?: boolean;
  LinkedAttributeId?: string;
  LogicalName?: string;
  MetadataId?: string;
  ModifiedOn?: string;
  RequiredLevel?: AttributeRequiredLevelManagedProperty;
  SchemaName?: string;
  Settings?: EntitySetting[];
  SourceType?: number;
}

/**
 * A ComplexAttributeMetadata value: one of the concrete types below, with the `@odata.type` that tells
 * Dataverse which one it is.
 */
export type TypedComplexAttributeMetadata =
  | (ComplexAttributeMetadata & {
      "@odata.type": "Microsoft.Dynamics.CRM.ComplexAttributeMetadata";
    })
  | (ComplexBigIntAttributeMetadata & {
      "@odata.type": "Microsoft.Dynamics.CRM.ComplexBigIntAttributeMetadata";
    })
  | (ComplexBooleanAttributeMetadata & {
      "@odata.type": "Microsoft.Dynamics.CRM.ComplexBooleanAttributeMetadata";
    })
  | (ComplexDateTimeAttributeMetadata & {
      "@odata.type": "Microsoft.Dynamics.CRM.ComplexDateTimeAttributeMetadata";
    })
  | (ComplexDecimalAttributeMetadata & {
      "@odata.type": "Microsoft.Dynamics.CRM.ComplexDecimalAttributeMetadata";
    })
  | (ComplexDoubleAttributeMetadata & {
      "@odata.type": "Microsoft.Dynamics.CRM.ComplexDoubleAttributeMetadata";
    })
  | (ComplexEnumAttributeMetadata & {
      "@odata.type": "Microsoft.Dynamics.CRM.ComplexEnumAttributeMetadata";
    })
  | (ComplexFileAttributeMetadata & {
      "@odata.type": "Microsoft.Dynamics.CRM.ComplexFileAttributeMetadata";
    })
  | (ComplexImageAttributeMetadata & {
      "@odata.type": "Microsoft.Dynamics.CRM.ComplexImageAttributeMetadata";
    })
  | (ComplexIntegerAttributeMetadata & {
      "@odata.type": "Microsoft.Dynamics.CRM.ComplexIntegerAttributeMetadata";
    })
  | (ComplexLookupAttributeMetadata & {
      "@odata.type": "Microsoft.Dynamics.CRM.ComplexLookupAttributeMetadata";
    })
  | (ComplexManagedPropertyAttributeMetadata & {
      "@odata.type": "Microsoft.Dynamics.CRM.ComplexManagedPropertyAttributeMetadata";
    })
  | (ComplexMemoAttributeMetadata & {
      "@odata.type": "Microsoft.Dynamics.CRM.ComplexMemoAttributeMetadata";
    })
  | (ComplexMoneyAttributeMetadata & {
      "@odata.type": "Microsoft.Dynamics.CRM.ComplexMoneyAttributeMetadata";
    })
  | (ComplexStringAttributeMetadata & {
      "@odata.type": "Microsoft.Dynamics.CRM.ComplexStringAttributeMetadata";
    })
  | (ComplexUniqueIdentifierAttributeMetadata & {
      "@odata.type": "Microsoft.Dynamics.CRM.ComplexUniqueIdentifierAttributeMetadata";
    });
