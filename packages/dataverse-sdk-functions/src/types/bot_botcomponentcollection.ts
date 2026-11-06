import type { BooleanManagedProperty } from "./BooleanManagedProperty.js";

/**
 * bot_botcomponentcollection entity type
 */
export interface bot_botcomponentcollection {
  bot_botcomponentcollectionid?: string;
  botcomponentcollectionid?: string;
  botid?: string;
  componentidunique?: string;
  componentstate?: number;
  iscustomizable?: BooleanManagedProperty;
  ismanaged?: boolean;
  overwritetime?: string;
  solutionid?: string;
  versionnumber?: number;
}
