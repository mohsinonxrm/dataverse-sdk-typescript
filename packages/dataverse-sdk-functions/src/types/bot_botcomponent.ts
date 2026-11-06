import type { BooleanManagedProperty } from "./BooleanManagedProperty.js";

/**
 * bot_botcomponent entity type
 */
export interface bot_botcomponent {
  bot_botcomponentid?: string;
  botcomponentid?: string;
  botid?: string;
  componentidunique?: string;
  componentstate?: number;
  iscustomizable?: BooleanManagedProperty;
  ismanaged?: boolean;
  overwritetime?: string;
  solutionid?: string;
  versionnumber?: number;
}
