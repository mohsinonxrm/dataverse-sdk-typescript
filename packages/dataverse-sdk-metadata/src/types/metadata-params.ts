import type { ComplexLookupAttributeMetadata } from "./ComplexLookupAttributeMetadata.js";
import type { ComplexOneToManyRelationshipMetadata } from "./ComplexOneToManyRelationshipMetadata.js";
import type { Label } from "./Label.js";

/**
 * Parameters for InsertOptionValue action
 */
export interface InsertOptionValueParams {
  EntityLogicalName?: string;
  AttributeLogicalName?: string;
  Label: Label;
  Value?: number;
  SolutionUniqueName?: string;
}

/**
 * Parameters for UpdateOptionValue action
 */
export interface UpdateOptionValueParams {
  EntityLogicalName?: string;
  AttributeLogicalName?: string;
  Value: number;
  Label?: Label;
  Description?: Label;
  MergeLabels?: boolean;
}

/**
 * Parameters for DeleteOptionValue action
 */
export interface DeleteOptionValueParams {
  EntityLogicalName?: string;
  AttributeLogicalName?: string;
  Value: number;
}

/**
 * Parameters for OrderOption action
 */
export interface OrderOptionParams {
  EntityLogicalName: string;
  AttributeLogicalName: string;
  Values: number[];
  SolutionUniqueName?: string;
}

/**
 * Parameters for InsertStatusValue action
 */
export interface InsertStatusValueParams {
  EntityLogicalName: string;
  AttributeLogicalName: string;
  Label: Label;
  StateCode: number;
  Value?: number;
  SolutionUniqueName?: string;
}

/**
 * Lookup column of the polymorphic-lookup actions: a `ComplexLookupAttributeMetadata`
 * (`Targets`, `Format`, `RequiredLevel`, `DisplayName`, ...). The Web API reads the
 * `@odata.type` annotation when present.
 */
export type PolymorphicLookupAttributeInput = ComplexLookupAttributeMetadata & {
  "@odata.type"?: string;
};

/**
 * 1:N relationship of the polymorphic-lookup actions: a `ComplexOneToManyRelationshipMetadata`
 * (`CascadeConfiguration`, `ReferencedAttribute`, `AssociatedMenuConfiguration`, ...), one per
 * target table. `SchemaName`, `ReferencedEntity` and `ReferencingEntity` are required.
 */
export type PolymorphicOneToManyRelationshipInput = ComplexOneToManyRelationshipMetadata & {
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
