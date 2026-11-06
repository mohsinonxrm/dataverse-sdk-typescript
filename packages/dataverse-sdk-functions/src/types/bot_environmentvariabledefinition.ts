import type { BooleanManagedProperty } from "./BooleanManagedProperty.js";

/**
 * bot_environmentvariabledefinition entity type
 */
export interface bot_environmentvariabledefinition {
  bot_environmentvariabledefinitionid?: string;
  botid?: string;
  componentidunique?: string;
  componentstate?: number;
  environmentvariabledefinitionid?: string;
  iscustomizable?: BooleanManagedProperty;
  ismanaged?: boolean;
  overwritetime?: string;
  solutionid?: string;
  versionnumber?: number;
}
