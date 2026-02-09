import type { BooleanManagedProperty } from "./BooleanManagedProperty.js";

/**
 * msdyn_salestag_msdyn_sequence entity type
 */
export interface msdyn_salestag_msdyn_sequence {
  solutionid: string;
  msdyn_salestagid: string;
  ismanaged: boolean;
  msdyn_sequenceid: string;
  msdyn_salestag_msdyn_sequenceid: string;
  iscustomizable: BooleanManagedProperty;
  versionnumber: number;
  componentidunique: string;
  overwritetime: string;
  componentstate: number;
}
