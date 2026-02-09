import type { BooleanManagedProperty } from "./BooleanManagedProperty.js";

/**
 * msdyn_notificationtemplate_notificationfield entity type
 */
export interface msdyn_notificationtemplate_notificationfield {
  iscustomizable: BooleanManagedProperty;
  msdyn_notificationtemplateid: string;
  overwritetime: string;
  componentidunique: string;
  componentstate: number;
  msdyn_notificationtemplate_notificationfieldid: string;
  ismanaged: boolean;
  solutionid: string;
  msdyn_notificationfieldid: string;
  versionnumber: number;
}
