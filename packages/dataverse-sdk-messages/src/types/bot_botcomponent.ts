import type { BooleanManagedProperty } from "./BooleanManagedProperty.js";

/**
 * bot_botcomponent entity type
 */
export interface bot_botcomponent {
  botid: string;
  overwritetime: string;
  ismanaged: boolean;
  bot_botcomponentid: string;
  versionnumber: number;
  botcomponentid: string;
  iscustomizable: BooleanManagedProperty;
  componentstate: number;
  componentidunique: string;
  solutionid: string;
}
