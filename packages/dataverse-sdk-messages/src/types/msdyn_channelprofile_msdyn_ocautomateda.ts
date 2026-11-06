import type { BooleanManagedProperty } from "./BooleanManagedProperty.js";

/**
 * msdyn_channelprofile_msdyn_ocautomateda entity type
 */
export interface msdyn_channelprofile_msdyn_ocautomateda {
  componentidunique?: string;
  componentstate?: number;
  iscustomizable?: BooleanManagedProperty;
  ismanaged?: boolean;
  msdyn_channelprofile_msdyn_ocautomatedaid?: string;
  msdyn_channelprofileid?: string;
  msdyn_ocautomatedactionruleid?: string;
  overwritetime?: string;
  solutionid?: string;
  versionnumber?: number;
}
