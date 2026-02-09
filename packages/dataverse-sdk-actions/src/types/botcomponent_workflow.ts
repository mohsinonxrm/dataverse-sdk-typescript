import type { BooleanManagedProperty } from "./BooleanManagedProperty.js";

/**
 * botcomponent_workflow entity type
 */
export interface botcomponent_workflow {
  iscustomizable: BooleanManagedProperty;
  botcomponent_workflowid: string;
  solutionid: string;
  versionnumber: number;
  overwritetime: string;
  botcomponentid: string;
  componentidunique: string;
  workflowid: string;
  componentstate: number;
  ismanaged: boolean;
}
