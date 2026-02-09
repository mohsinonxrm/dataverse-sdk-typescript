import type { BooleanManagedProperty } from "./BooleanManagedProperty.js";

/**
 * aicopilot_aiplugin entity type
 */
export interface aicopilot_aiplugin {
  versionnumber: number;
  solutionid: string;
  componentidunique: string;
  overwritetime: string;
  iscustomizable: BooleanManagedProperty;
  aicopilotid: string;
  componentstate: number;
  aicopilot_aipluginid: string;
  aipluginid: string;
  ismanaged: boolean;
}
