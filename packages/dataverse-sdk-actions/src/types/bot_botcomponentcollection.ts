import type { BooleanManagedProperty } from "./BooleanManagedProperty.js";

/**
 * bot_botcomponentcollection entity type
 */
export interface bot_botcomponentcollection {
  iscustomizable?: BooleanManagedProperty;
  botcomponentcollectionid?: string;
  overwritetime?: string;
  componentstate?: number;
  bot_botcomponentcollectionid?: string;
  componentidunique?: string;
  solutionid?: string;
  versionnumber?: number;
  ismanaged?: boolean;
  botid?: string;
}
