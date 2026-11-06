import type { BooleanManagedProperty } from "./BooleanManagedProperty.js";

/**
 * botcomponent_environmentvariabledefinition entity type
 */
export interface botcomponent_environmentvariabledefinition {
  ismanaged?: boolean;
  botcomponent_environmentvariabledefinitionid?: string;
  iscustomizable?: BooleanManagedProperty;
  solutionid?: string;
  versionnumber?: number;
  botcomponentid?: string;
  componentstate?: number;
  overwritetime?: string;
  environmentvariabledefinitionid?: string;
  componentidunique?: string;
}
