import type { AttributeMetadata } from "./AttributeMetadata.js";
import type { BigIntAttributeMetadata } from "./BigIntAttributeMetadata.js";
import type { BooleanAttributeMetadata } from "./BooleanAttributeMetadata.js";
import type { DateTimeAttributeMetadata } from "./DateTimeAttributeMetadata.js";
import type { DecimalAttributeMetadata } from "./DecimalAttributeMetadata.js";
import type { DoubleAttributeMetadata } from "./DoubleAttributeMetadata.js";
import type { IntegerAttributeMetadata } from "./IntegerAttributeMetadata.js";
import type { LookupAttributeMetadata } from "./LookupAttributeMetadata.js";
import type { ComplexLookupAttributeMetadata } from "./ComplexLookupAttributeMetadata.js";
import type { MemoAttributeMetadata } from "./MemoAttributeMetadata.js";
import type { MoneyAttributeMetadata } from "./MoneyAttributeMetadata.js";
import type { StringAttributeMetadata } from "./StringAttributeMetadata.js";
import type { FileAttributeMetadata } from "./FileAttributeMetadata.js";
import type { ImageAttributeMetadata } from "./ImageAttributeMetadata.js";
import type { EnumAttributeMetadata } from "./EnumAttributeMetadata.js";
import type { PicklistAttributeMetadata } from "./PicklistAttributeMetadata.js";
import type { ManagedPropertyAttributeMetadata } from "./ManagedPropertyAttributeMetadata.js";
import type { UniqueIdentifierAttributeMetadata } from "./UniqueIdentifierAttributeMetadata.js";

/**
 * AttributeMetadataCreateTypes - union of all attribute create types
 * Uses EntityType versions per Microsoft Web API documentation
 * Exception: ComplexLookupAttributeMetadata for customer lookup columns
 */
export type AttributeMetadataCreateTypes =
  | AttributeMetadata
  | BigIntAttributeMetadata
  | BooleanAttributeMetadata
  | DateTimeAttributeMetadata
  | DecimalAttributeMetadata
  | DoubleAttributeMetadata
  | IntegerAttributeMetadata
  | LookupAttributeMetadata
  | ComplexLookupAttributeMetadata
  | MemoAttributeMetadata
  | MoneyAttributeMetadata
  | StringAttributeMetadata
  | FileAttributeMetadata
  | ImageAttributeMetadata
  | EnumAttributeMetadata
  | PicklistAttributeMetadata
  | ManagedPropertyAttributeMetadata
  | UniqueIdentifierAttributeMetadata;
