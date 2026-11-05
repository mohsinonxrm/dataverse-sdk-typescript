import type { BooleanManagedProperty } from "./BooleanManagedProperty.js";

/**
 * botcomponent_aipluginoperation entity type
 */
export interface botcomponent_aipluginoperation {
  aipluginoperationid?: string;
  botcomponent_aipluginoperationid?: string;
  solutionid?: string;
  iscustomizable?: BooleanManagedProperty;
  versionnumber?: number;
  componentstate?: number;
  componentidunique?: string;
  botcomponentid?: string;
  overwritetime?: string;
  ismanaged?: boolean;
}
