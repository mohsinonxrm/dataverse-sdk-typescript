import type {
  ServerSetAttributeProperty,
  ServerSetMetadataProperty,
} from "./AttributeMetadataCreateTypes.js";
import type { ComplexLookupAttributeMetadata } from "./ComplexLookupAttributeMetadata.js";
import type { ComplexOneToManyRelationshipMetadata } from "./ComplexOneToManyRelationshipMetadata.js";
import type { Label } from "./Label.js";

/**
 * A local choice: the choice column's table and column. Give this or `OptionSetName`, not both.
 */
export interface LocalOptionSetTarget {
  /** Logical name of the table with the choice column, e.g. `"account"`. */
  EntityLogicalName: string;
  /** Logical name of the choice column, e.g. `"new_category"`. */
  AttributeLogicalName: string;
  OptionSetName?: never;
}

/**
 * A global choice, by its `Name`. Give this or `EntityLogicalName` and
 * `AttributeLogicalName`, not both. A column bound to a global choice has no options of its own:
 * change the global choice.
 */
export interface GlobalOptionSetTarget {
  /** `Name` of the global choice, e.g. `"new_colors"`. */
  OptionSetName: string;
  EntityLogicalName?: never;
  AttributeLogicalName?: never;
}

/** The choice an option-value action changes: exactly one local or global choice. */
export type OptionSetTarget = LocalOptionSetTarget | GlobalOptionSetTarget;

/** Parameters for the InsertOptionValue action: a new option in a local or global choice. */
export type InsertOptionValueParams = OptionSetTarget & {
  Label: Label;
  /** The option's value. Dataverse picks the next one from the publisher's prefix if omitted. */
  Value?: number;
  Description?: Label;
  /** Color, as `"#RRGGBB"`. */
  Color?: string;
  ExternalValue?: string;
  IsHidden?: boolean;
  /** Values of the parent choice's options this option depends on. */
  ParentValues?: number[];
  SolutionUniqueName?: string;
};

/** Parameters for the UpdateOptionValue action: change an option of a local or global choice. */
export type UpdateOptionValueParams = OptionSetTarget & {
  /** The value of the option to change. */
  Value: number;
  /**
   * `true` keeps the labels of the languages `Label` and `Description` leave out; `false`
   * removes them. Required: `$metadata` marks it `Nullable="false"`.
   */
  MergeLabels: boolean;
  Label?: Label;
  Description?: Label;
  Color?: string;
  ExternalValue?: string;
  IsHidden?: boolean;
  ParentValues?: number[];
  SolutionUniqueName?: string;
};

/** Parameters for the DeleteOptionValue action: remove an option from a local or global choice. */
export type DeleteOptionValueParams = OptionSetTarget & {
  /** The value of the option to remove. */
  Value: number;
  SolutionUniqueName?: string;
};

/** Parameters for the OrderOption action: the new order of a local or global choice's options. */
export type OrderOptionParams = OptionSetTarget & {
  /** Every option value, in the new order. */
  Values: number[];
  SolutionUniqueName?: string;
};

/**
 * Parameters for the InsertStatusValue action: a new status reason (`statuscode` option) for a
 * state. Status reasons belong to one table's `statuscode` column, so the target is always that
 * column. (Dataverse accepts `OptionSetName` too, and then adds the option to that global
 * choice, which is no status column.)
 */
export type InsertStatusValueParams = LocalOptionSetTarget & {
  Label: Label;
  /** The state (`statecode` value) the status reason belongs to. */
  StateCode: number;
  Value?: number;
  Description?: Label;
  Color?: string;
  SolutionUniqueName?: string;
};

/**
 * Lookup column of the polymorphic-lookup actions: a `ComplexLookupAttributeMetadata`
 * (`Targets`, `Format`, `RequiredLevel`, `DisplayName`, ...) without the properties Dataverse
 * sets. The Web API reads the `@odata.type` annotation when present.
 */
export type PolymorphicLookupAttributeInput = Omit<
  ComplexLookupAttributeMetadata,
  ServerSetAttributeProperty
> & {
  "@odata.type"?: string;
};

/**
 * 1:N relationship of the polymorphic-lookup actions: a `ComplexOneToManyRelationshipMetadata`
 * (`CascadeConfiguration`, `ReferencedAttribute`, `AssociatedMenuConfiguration`, ...), one per
 * target table, without the properties Dataverse sets. `SchemaName`, `ReferencedEntity` and
 * `ReferencingEntity` are required.
 */
export type PolymorphicOneToManyRelationshipInput = Omit<
  ComplexOneToManyRelationshipMetadata,
  ServerSetMetadataProperty | "IsCustomRelationship" | "RelationshipType" | "ReferencingAttribute"
> & {
  "@odata.type"?: string;
  SchemaName: string;
  ReferencedEntity: string;
  ReferencingEntity: string;
};

/**
 * Parameters for CreateCustomerRelationships action
 * (`Lookup`, `OneToManyRelationships`, `SolutionUniqueName`, per the org's `$metadata`).
 */
export interface CreateCustomerRelationshipsParams {
  Lookup: PolymorphicLookupAttributeInput & { SchemaName: string };
  OneToManyRelationships: PolymorphicOneToManyRelationshipInput[];
  SolutionUniqueName?: string;
}

/**
 * Parameters for CreatePolymorphicLookupAttribute action
 * (`Lookup`, `OneToManyRelationships`, `SolutionUniqueName`, per the org's `$metadata`).
 */
export interface CreatePolymorphicLookupAttributeParams {
  Lookup: PolymorphicLookupAttributeInput & { SchemaName: string; DisplayName: Label };
  OneToManyRelationships: PolymorphicOneToManyRelationshipInput[];
  SolutionUniqueName?: string;
}
