import type { BooleanManagedProperty } from "./BooleanManagedProperty.js";

/**
 * botcomponent_dvtablesearch entity type
 */
export interface botcomponent_dvtablesearch {
  botcomponent_dvtablesearchid?: string;
  botcomponentid?: string;
  componentidunique?: string;
  componentstate?: number;
  dvtablesearchid?: string;
  iscustomizable?: BooleanManagedProperty;
  ismanaged?: boolean;
  overwritetime?: string;
  solutionid?: string;
  versionnumber?: number;
}
