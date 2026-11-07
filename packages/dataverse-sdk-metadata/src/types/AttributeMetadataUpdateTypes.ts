import type {
  MetadataODataType,
  ServerSetAttributeProperty,
} from "./AttributeMetadataCreateTypes.js";
import type { AttributeMetadata } from "./AttributeMetadata.js";
import type { BigIntAttributeMetadata } from "./BigIntAttributeMetadata.js";
import type { BooleanAttributeMetadata } from "./BooleanAttributeMetadata.js";
import type { DateTimeAttributeMetadata } from "./DateTimeAttributeMetadata.js";
import type { DecimalAttributeMetadata } from "./DecimalAttributeMetadata.js";
import type { DoubleAttributeMetadata } from "./DoubleAttributeMetadata.js";
import type { EntityNameAttributeMetadata } from "./EntityNameAttributeMetadata.js";
import type { FileAttributeMetadata } from "./FileAttributeMetadata.js";
import type { ImageAttributeMetadata } from "./ImageAttributeMetadata.js";
import type { IntegerAttributeMetadata } from "./IntegerAttributeMetadata.js";
import type { LookupAttributeMetadata } from "./LookupAttributeMetadata.js";
import type { ManagedPropertyAttributeMetadata } from "./ManagedPropertyAttributeMetadata.js";
import type { MemoAttributeMetadata } from "./MemoAttributeMetadata.js";
import type { MoneyAttributeMetadata } from "./MoneyAttributeMetadata.js";
import type { MultiSelectPicklistAttributeMetadata } from "./MultiSelectPicklistAttributeMetadata.js";
import type { PicklistAttributeMetadata } from "./PicklistAttributeMetadata.js";
import type { StateAttributeMetadata } from "./StateAttributeMetadata.js";
import type { StatusAttributeMetadata } from "./StatusAttributeMetadata.js";
import type { StringAttributeMetadata } from "./StringAttributeMetadata.js";
import type { UniqueIdentifierAttributeMetadata } from "./UniqueIdentifierAttributeMetadata.js";

/**
 * An update payload for column type `T`: its complete definition, with `@odata.type` (as
 * `Microsoft.Dynamics.CRM.<Name>`) required. The properties Dataverse computes
 * (`ServerSetAttributeProperty` and the type's own `ServerSet`) are left out; a retrieved
 * definition that has them can still be sent back.
 */
export type AttributeMetadataUpdate<
  T extends AttributeMetadata,
  Name extends string,
  ServerSet extends string = never,
> = Omit<T, ServerSetAttributeProperty | ServerSet | "@odata.type"> & {
  "@odata.type": MetadataODataType<Name>;
};

/** The update payload of each column type, by the type's name. */
export interface AttributeMetadataUpdateByType {
  BigIntAttributeMetadata: AttributeMetadataUpdate<
    BigIntAttributeMetadata,
    "BigIntAttributeMetadata"
  >;
  BooleanAttributeMetadata: AttributeMetadataUpdate<
    BooleanAttributeMetadata,
    "BooleanAttributeMetadata"
  >;
  DateTimeAttributeMetadata: AttributeMetadataUpdate<
    DateTimeAttributeMetadata,
    "DateTimeAttributeMetadata",
    "MaxSupportedValue" | "MinSupportedValue"
  >;
  DecimalAttributeMetadata: AttributeMetadataUpdate<
    DecimalAttributeMetadata,
    "DecimalAttributeMetadata"
  >;
  DoubleAttributeMetadata: AttributeMetadataUpdate<
    DoubleAttributeMetadata,
    "DoubleAttributeMetadata"
  >;
  EntityNameAttributeMetadata: AttributeMetadataUpdate<
    EntityNameAttributeMetadata,
    "EntityNameAttributeMetadata",
    "IsEntityReferenceStored"
  >;
  FileAttributeMetadata: AttributeMetadataUpdate<FileAttributeMetadata, "FileAttributeMetadata">;
  ImageAttributeMetadata: AttributeMetadataUpdate<ImageAttributeMetadata, "ImageAttributeMetadata">;
  IntegerAttributeMetadata: AttributeMetadataUpdate<
    IntegerAttributeMetadata,
    "IntegerAttributeMetadata"
  >;
  LookupAttributeMetadata: AttributeMetadataUpdate<
    LookupAttributeMetadata,
    "LookupAttributeMetadata"
  >;
  ManagedPropertyAttributeMetadata: AttributeMetadataUpdate<
    ManagedPropertyAttributeMetadata,
    "ManagedPropertyAttributeMetadata",
    "ValueAttributeTypeCode"
  >;
  MemoAttributeMetadata: AttributeMetadataUpdate<MemoAttributeMetadata, "MemoAttributeMetadata">;
  MoneyAttributeMetadata: AttributeMetadataUpdate<MoneyAttributeMetadata, "MoneyAttributeMetadata">;
  MultiSelectPicklistAttributeMetadata: AttributeMetadataUpdate<
    MultiSelectPicklistAttributeMetadata,
    "MultiSelectPicklistAttributeMetadata"
  >;
  PicklistAttributeMetadata: AttributeMetadataUpdate<
    PicklistAttributeMetadata,
    "PicklistAttributeMetadata"
  >;
  StateAttributeMetadata: AttributeMetadataUpdate<StateAttributeMetadata, "StateAttributeMetadata">;
  StatusAttributeMetadata: AttributeMetadataUpdate<
    StatusAttributeMetadata,
    "StatusAttributeMetadata"
  >;
  StringAttributeMetadata: AttributeMetadataUpdate<
    StringAttributeMetadata,
    "StringAttributeMetadata"
  >;
  UniqueIdentifierAttributeMetadata: AttributeMetadataUpdate<
    UniqueIdentifierAttributeMetadata,
    "UniqueIdentifierAttributeMetadata"
  >;
}

/**
 * AttributeMetadataUpdateTypes - the payload for updating a column: its complete definition, as a
 * union discriminated on `@odata.type`. Updates are `PUT`s that replace the definition, so a
 * property left out is reset to its default. Retrieve the column cast to its type, change it and
 * send all of it back, or use `mergeAndUpdateAttributeDefinition`. The abstract
 * `AttributeMetadata` and `EnumAttributeMetadata` are not column types and are not included.
 */
export type AttributeMetadataUpdateTypes =
  AttributeMetadataUpdateByType[keyof AttributeMetadataUpdateByType];

/**
 * AttributeMetadataChanges - the column properties to change with
 * `mergeAndUpdateAttributeDefinition`, with the column's `@odata.type`, which the retrieve
 * casts to. The rest of the definition is retrieved and sent with them.
 */
export type AttributeMetadataChanges = {
  [Name in keyof AttributeMetadataUpdateByType]: Partial<AttributeMetadataUpdateByType[Name]> &
    Pick<AttributeMetadataUpdateByType[Name], "@odata.type">;
}[keyof AttributeMetadataUpdateByType];
