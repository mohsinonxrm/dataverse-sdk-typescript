import type { BooleanManagedProperty } from "./BooleanManagedProperty.js";

/**
 * workflowcardconnections entity type
 */
export interface workflowcardconnections {
  cardid?: string;
  componentidunique?: string;
  componentstate?: number;
  iscustomizable?: BooleanManagedProperty;
  ismanaged?: boolean;
  overwritetime?: string;
  solutionid?: string;
  versionnumber?: number;
  workflowcardconnectionsid?: string;
  workflowid?: string;
}
