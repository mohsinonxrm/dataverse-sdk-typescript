import type { BooleanManagedProperty } from "./BooleanManagedProperty.js";

/**
 * msdyn_ocdispositioncode_msdyn_liveworkstream entity type
 */
export interface msdyn_ocdispositioncode_msdyn_liveworkstream {
  componentidunique?: string;
  componentstate?: number;
  iscustomizable?: BooleanManagedProperty;
  ismanaged?: boolean;
  msdyn_liveworkstreamid?: string;
  msdyn_ocdispositioncode_msdyn_liveworkstreamid?: string;
  msdyn_ocdispositioncodeid?: string;
  overwritetime?: string;
  solutionid?: string;
  versionnumber?: number;
}
