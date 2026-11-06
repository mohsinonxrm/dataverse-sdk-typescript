import type { BooleanManagedProperty } from "./BooleanManagedProperty.js";

/**
 * msdyn_salestag_msdyn_sequence entity type
 */
export interface msdyn_salestag_msdyn_sequence {
  componentidunique?: string;
  componentstate?: number;
  iscustomizable?: BooleanManagedProperty;
  ismanaged?: boolean;
  msdyn_salestag_msdyn_sequenceid?: string;
  msdyn_salestagid?: string;
  msdyn_sequenceid?: string;
  overwritetime?: string;
  solutionid?: string;
  versionnumber?: number;
}
