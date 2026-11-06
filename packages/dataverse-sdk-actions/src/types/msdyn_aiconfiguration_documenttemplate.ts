import type { BooleanManagedProperty } from "./BooleanManagedProperty.js";

/**
 * msdyn_aiconfiguration_documenttemplate entity type
 */
export interface msdyn_aiconfiguration_documenttemplate {
  componentidunique?: string;
  componentstate?: number;
  iscustomizable?: BooleanManagedProperty;
  ismanaged?: boolean;
  msdyn_aiconfiguration_documenttemplateid?: string;
  msdyn_aiconfigurationid?: string;
  msdyn_aidocumenttemplateid?: string;
  overwritetime?: string;
  solutionid?: string;
  versionnumber?: number;
}
