import type { BooleanManagedProperty } from "./BooleanManagedProperty.js";

/**
 * botcomponent_workflow entity type
 */
export interface botcomponent_workflow {
  botcomponent_workflowid?: string;
  botcomponentid?: string;
  componentidunique?: string;
  componentstate?: number;
  iscustomizable?: BooleanManagedProperty;
  ismanaged?: boolean;
  overwritetime?: string;
  solutionid?: string;
  versionnumber?: number;
  workflowid?: string;
}
