import type { BooleanManagedProperty } from "./BooleanManagedProperty.js";

/**
 * serviceplanappmodules entity type
 */
export interface serviceplanappmodules {
  serviceplanappmodulesid: string;
  iscustomizable: BooleanManagedProperty;
  componentstate: number;
  componentidunique: string;
  ismanaged: boolean;
  serviceplanid: string;
  versionnumber: number;
  overwritetime: string;
  appmoduleid: string;
  solutionid: string;
}
