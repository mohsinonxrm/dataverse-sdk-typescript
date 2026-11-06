import type { AttributeMetadata } from "./AttributeMetadata.js";
import type { BigIntAttributeMetadata } from "./BigIntAttributeMetadata.js";
import type { BooleanAttributeMetadata } from "./BooleanAttributeMetadata.js";
import type { BooleanOptionSetMetadata } from "./BooleanOptionSetMetadata.js";
import type { DateTimeAttributeMetadata } from "./DateTimeAttributeMetadata.js";
import type { DecimalAttributeMetadata } from "./DecimalAttributeMetadata.js";
import type { DoubleAttributeMetadata } from "./DoubleAttributeMetadata.js";
import type { EntityKeyMetadata } from "./EntityKeyMetadata.js";
import type { EntityMetadata } from "./EntityMetadata.js";
import type { EntityNameAttributeMetadata } from "./EntityNameAttributeMetadata.js";
import type { EnumAttributeMetadata } from "./EnumAttributeMetadata.js";
import type { FileAttributeMetadata } from "./FileAttributeMetadata.js";
import type { ImageAttributeMetadata } from "./ImageAttributeMetadata.js";
import type { IntegerAttributeMetadata } from "./IntegerAttributeMetadata.js";
import type { LookupAttributeMetadata } from "./LookupAttributeMetadata.js";
import type { ManagedPropertyAttributeMetadata } from "./ManagedPropertyAttributeMetadata.js";
import type { ManagedPropertyMetadata } from "./ManagedPropertyMetadata.js";
import type { ManyToManyRelationshipMetadata } from "./ManyToManyRelationshipMetadata.js";
import type { MemoAttributeMetadata } from "./MemoAttributeMetadata.js";
import type { MoneyAttributeMetadata } from "./MoneyAttributeMetadata.js";
import type { MultiSelectPicklistAttributeMetadata } from "./MultiSelectPicklistAttributeMetadata.js";
import type { OneToManyRelationshipMetadata } from "./OneToManyRelationshipMetadata.js";
import type { OptionSetMetadata } from "./OptionSetMetadata.js";
import type { OptionSetMetadataBase } from "./OptionSetMetadataBase.js";
import type { PicklistAttributeMetadata } from "./PicklistAttributeMetadata.js";
import type { StateAttributeMetadata } from "./StateAttributeMetadata.js";
import type { StatusAttributeMetadata } from "./StatusAttributeMetadata.js";
import type { StringAttributeMetadata } from "./StringAttributeMetadata.js";
import type { UniqueIdentifierAttributeMetadata } from "./UniqueIdentifierAttributeMetadata.js";

/**
 * MetadataBase entity type
 */
export interface MetadataBase {
  HasChanged?: boolean;
  MetadataId?: string;
}

/**
 * A MetadataBase value: one of the concrete types below, with the `@odata.type` that tells
 * Dataverse which one it is.
 */
export type TypedMetadataBase =
  | (AttributeMetadata & { "@odata.type": "Microsoft.Dynamics.CRM.AttributeMetadata" })
  | (BigIntAttributeMetadata & { "@odata.type": "Microsoft.Dynamics.CRM.BigIntAttributeMetadata" })
  | (BooleanAttributeMetadata & {
      "@odata.type": "Microsoft.Dynamics.CRM.BooleanAttributeMetadata";
    })
  | (BooleanOptionSetMetadata & {
      "@odata.type": "Microsoft.Dynamics.CRM.BooleanOptionSetMetadata";
    })
  | (DateTimeAttributeMetadata & {
      "@odata.type": "Microsoft.Dynamics.CRM.DateTimeAttributeMetadata";
    })
  | (DecimalAttributeMetadata & {
      "@odata.type": "Microsoft.Dynamics.CRM.DecimalAttributeMetadata";
    })
  | (DoubleAttributeMetadata & { "@odata.type": "Microsoft.Dynamics.CRM.DoubleAttributeMetadata" })
  | (EntityKeyMetadata & { "@odata.type": "Microsoft.Dynamics.CRM.EntityKeyMetadata" })
  | (EntityMetadata & { "@odata.type": "Microsoft.Dynamics.CRM.EntityMetadata" })
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
  | (ManagedPropertyMetadata & { "@odata.type": "Microsoft.Dynamics.CRM.ManagedPropertyMetadata" })
  | (ManyToManyRelationshipMetadata & {
      "@odata.type": "Microsoft.Dynamics.CRM.ManyToManyRelationshipMetadata";
    })
  | (MemoAttributeMetadata & { "@odata.type": "Microsoft.Dynamics.CRM.MemoAttributeMetadata" })
  | (MoneyAttributeMetadata & { "@odata.type": "Microsoft.Dynamics.CRM.MoneyAttributeMetadata" })
  | (MultiSelectPicklistAttributeMetadata & {
      "@odata.type": "Microsoft.Dynamics.CRM.MultiSelectPicklistAttributeMetadata";
    })
  | (OneToManyRelationshipMetadata & {
      "@odata.type": "Microsoft.Dynamics.CRM.OneToManyRelationshipMetadata";
    })
  | (OptionSetMetadata & { "@odata.type": "Microsoft.Dynamics.CRM.OptionSetMetadata" })
  | (OptionSetMetadataBase & { "@odata.type": "Microsoft.Dynamics.CRM.OptionSetMetadataBase" })
  | (PicklistAttributeMetadata & {
      "@odata.type": "Microsoft.Dynamics.CRM.PicklistAttributeMetadata";
    })
  | (StateAttributeMetadata & { "@odata.type": "Microsoft.Dynamics.CRM.StateAttributeMetadata" })
  | (StatusAttributeMetadata & { "@odata.type": "Microsoft.Dynamics.CRM.StatusAttributeMetadata" })
  | (StringAttributeMetadata & { "@odata.type": "Microsoft.Dynamics.CRM.StringAttributeMetadata" })
  | (UniqueIdentifierAttributeMetadata & {
      "@odata.type": "Microsoft.Dynamics.CRM.UniqueIdentifierAttributeMetadata";
    });
