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
 * Parameters for CreateCustomerRelationships action
 */
export interface CreateCustomerRelationshipsParams {
  Lookup: { SchemaName: string };
  OneToManyRelationships: Array<{
    ReferencedEntity: string;
    ReferencingEntity: string;
    SchemaName: string;
  }>;
}

/**
 * Parameters for CreatePolymorphicLookupAttribute action
 */
export interface CreatePolymorphicLookupAttributeParams {
  Lookup: {
    SchemaName: string;
    DisplayName: Label;
    Description?: Label;
  };
  OneToManyRelationships: Array<{
    ReferencedEntity: string;
    ReferencingEntity: string;
    SchemaName: string;
  }>;
  SolutionUniqueName?: string;
}
