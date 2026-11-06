import type { BooleanManagedProperty } from "./BooleanManagedProperty.js";

/**
 * botcomponent_aipluginoperation entity type
 */
export interface botcomponent_aipluginoperation {
  aipluginoperationid?: string;
  botcomponent_aipluginoperationid?: string;
  botcomponentid?: string;
  componentidunique?: string;
  componentstate?: number;
  iscustomizable?: BooleanManagedProperty;
  ismanaged?: boolean;
  overwritetime?: string;
  solutionid?: string;
  versionnumber?: number;
}
