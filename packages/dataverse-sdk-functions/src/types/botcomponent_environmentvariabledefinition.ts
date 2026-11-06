import type { BooleanManagedProperty } from "./BooleanManagedProperty.js";

/**
 * botcomponent_environmentvariabledefinition entity type
 */
export interface botcomponent_environmentvariabledefinition {
  botcomponent_environmentvariabledefinitionid?: string;
  botcomponentid?: string;
  componentidunique?: string;
  componentstate?: number;
  environmentvariabledefinitionid?: string;
  iscustomizable?: BooleanManagedProperty;
  ismanaged?: boolean;
  overwritetime?: string;
  solutionid?: string;
  versionnumber?: number;
}
