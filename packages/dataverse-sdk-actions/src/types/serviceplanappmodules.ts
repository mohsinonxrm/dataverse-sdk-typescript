import type { BooleanManagedProperty } from "./BooleanManagedProperty.js";

/**
 * serviceplanappmodules entity type
 */
export interface serviceplanappmodules {
  appmoduleid?: string;
  componentidunique?: string;
  componentstate?: number;
  iscustomizable?: BooleanManagedProperty;
  ismanaged?: boolean;
  overwritetime?: string;
  serviceplanappmodulesid?: string;
  serviceplanid?: string;
  solutionid?: string;
  versionnumber?: number;
}
