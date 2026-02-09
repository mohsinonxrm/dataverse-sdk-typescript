import type { BooleanManagedProperty } from "./BooleanManagedProperty.js";

/**
 * msdyn_channelprofile_msdyn_ocautomateda entity type
 */
export interface msdyn_channelprofile_msdyn_ocautomateda {
  overwritetime: string;
  msdyn_channelprofileid: string;
  versionnumber: number;
  iscustomizable: BooleanManagedProperty;
  componentstate: number;
  ismanaged: boolean;
  componentidunique: string;
  msdyn_ocautomatedactionruleid: string;
  solutionid: string;
  msdyn_channelprofile_msdyn_ocautomatedaid: string;
}
