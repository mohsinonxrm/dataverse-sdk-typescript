import type { BooleanManagedProperty } from "./BooleanManagedProperty.js";

/**
 * workflowcardconnections entity type
 */
export interface workflowcardconnections {
  solutionid: string;
  componentidunique: string;
  overwritetime: string;
  cardid: string;
  ismanaged: boolean;
  componentstate: number;
  iscustomizable: BooleanManagedProperty;
  versionnumber: number;
  workflowid: string;
  workflowcardconnectionsid: string;
}
