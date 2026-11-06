import type { BooleanManagedProperty } from "./BooleanManagedProperty.js";

/**
 * msdyn_ocdispositioncode_msdyn_liveworkstream entity type
 */
export interface msdyn_ocdispositioncode_msdyn_liveworkstream {
  iscustomizable?: BooleanManagedProperty;
  overwritetime?: string;
  componentidunique?: string;
  msdyn_ocdispositioncode_msdyn_liveworkstreamid?: string;
  ismanaged?: boolean;
  msdyn_ocdispositioncodeid?: string;
  versionnumber?: number;
  msdyn_liveworkstreamid?: string;
  componentstate?: number;
  solutionid?: string;
}
