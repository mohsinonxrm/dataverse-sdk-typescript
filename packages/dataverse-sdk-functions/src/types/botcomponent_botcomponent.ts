import type { BooleanManagedProperty } from "./BooleanManagedProperty.js";

/**
 * botcomponent_botcomponent entity type
 */
export interface botcomponent_botcomponent {
  botcomponent_botcomponentid?: string;
  botcomponentidone?: string;
  botcomponentidtwo?: string;
  componentidunique?: string;
  componentstate?: number;
  iscustomizable?: BooleanManagedProperty;
  ismanaged?: boolean;
  overwritetime?: string;
  solutionid?: string;
  versionnumber?: number;
}
