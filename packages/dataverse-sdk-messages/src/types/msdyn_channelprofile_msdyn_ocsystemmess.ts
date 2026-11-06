import type { BooleanManagedProperty } from "./BooleanManagedProperty.js";

/**
 * msdyn_channelprofile_msdyn_ocsystemmess entity type
 */
export interface msdyn_channelprofile_msdyn_ocsystemmess {
  componentidunique?: string;
  componentstate?: number;
  iscustomizable?: BooleanManagedProperty;
  ismanaged?: boolean;
  msdyn_channelprofile_msdyn_ocsystemmessid?: string;
  msdyn_channelprofileid?: string;
  msdyn_ocsystemmessageid?: string;
  overwritetime?: string;
  solutionid?: string;
  versionnumber?: number;
}
