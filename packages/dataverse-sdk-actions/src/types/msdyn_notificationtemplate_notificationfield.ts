import type { BooleanManagedProperty } from "./BooleanManagedProperty.js";

/**
 * msdyn_notificationtemplate_notificationfield entity type
 */
export interface msdyn_notificationtemplate_notificationfield {
  componentidunique?: string;
  componentstate?: number;
  iscustomizable?: BooleanManagedProperty;
  ismanaged?: boolean;
  msdyn_notificationfieldid?: string;
  msdyn_notificationtemplate_notificationfieldid?: string;
  msdyn_notificationtemplateid?: string;
  overwritetime?: string;
  solutionid?: string;
  versionnumber?: number;
}
