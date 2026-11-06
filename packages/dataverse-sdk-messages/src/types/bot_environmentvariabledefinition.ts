import type { BooleanManagedProperty } from "./BooleanManagedProperty.js";

/**
 * bot_environmentvariabledefinition entity type
 */
export interface bot_environmentvariabledefinition {
  versionnumber?: number;
  ismanaged?: boolean;
  bot_environmentvariabledefinitionid?: string;
  overwritetime?: string;
  componentidunique?: string;
  iscustomizable?: BooleanManagedProperty;
  componentstate?: number;
  botid?: string;
  solutionid?: string;
  environmentvariabledefinitionid?: string;
}
