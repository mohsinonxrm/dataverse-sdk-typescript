import type { BooleanManagedProperty } from "./BooleanManagedProperty.js";

/**
 * botcomponent_botcomponent entity type
 */
export interface botcomponent_botcomponent {
  ismanaged: boolean;
  botcomponent_botcomponentid: string;
  iscustomizable: BooleanManagedProperty;
  versionnumber: number;
  componentstate: number;
  botcomponentidtwo: string;
  botcomponentidone: string;
  componentidunique: string;
  overwritetime: string;
  solutionid: string;
}
