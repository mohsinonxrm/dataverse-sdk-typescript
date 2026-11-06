import type { BooleanManagedProperty } from "./BooleanManagedProperty.js";

/**
 * msdyn_aiconfiguration_documenttemplate entity type
 */
export interface msdyn_aiconfiguration_documenttemplate {
  msdyn_aiconfiguration_documenttemplateid?: string;
  msdyn_aiconfigurationid?: string;
  iscustomizable?: BooleanManagedProperty;
  versionnumber?: number;
  solutionid?: string;
  ismanaged?: boolean;
  componentstate?: number;
  componentidunique?: string;
  msdyn_aidocumenttemplateid?: string;
  overwritetime?: string;
}
