import type { BooleanManagedProperty } from "./BooleanManagedProperty.js";

/**
 * botcomponent_dvtablesearch entity type
 */
export interface botcomponent_dvtablesearch {
  botcomponent_dvtablesearchid: string;
  overwritetime: string;
  dvtablesearchid: string;
  iscustomizable: BooleanManagedProperty;
  ismanaged: boolean;
  componentstate: number;
  componentidunique: string;
  botcomponentid: string;
  versionnumber: number;
  solutionid: string;
}
