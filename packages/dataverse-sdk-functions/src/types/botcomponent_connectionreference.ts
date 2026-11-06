import type { BooleanManagedProperty } from "./BooleanManagedProperty.js";

/**
 * botcomponent_connectionreference entity type
 */
export interface botcomponent_connectionreference {
  botcomponent_connectionreferenceid?: string;
  botcomponentid?: string;
  componentidunique?: string;
  componentstate?: number;
  connectionreferenceid?: string;
  iscustomizable?: BooleanManagedProperty;
  ismanaged?: boolean;
  overwritetime?: string;
  solutionid?: string;
  versionnumber?: number;
}
