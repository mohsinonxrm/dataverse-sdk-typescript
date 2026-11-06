import type { BooleanManagedProperty } from "./BooleanManagedProperty.js";

/**
 * botcomponent_connectionreference entity type
 */
export interface botcomponent_connectionreference {
  iscustomizable?: BooleanManagedProperty;
  overwritetime?: string;
  versionnumber?: number;
  componentstate?: number;
  solutionid?: string;
  componentidunique?: string;
  ismanaged?: boolean;
  connectionreferenceid?: string;
  botcomponentid?: string;
  botcomponent_connectionreferenceid?: string;
}
