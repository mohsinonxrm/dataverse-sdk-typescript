import type { BooleanManagedProperty } from "./BooleanManagedProperty.js";

/**
 * aicopilot_aiplugin entity type
 */
export interface aicopilot_aiplugin {
  aicopilot_aipluginid?: string;
  aicopilotid?: string;
  aipluginid?: string;
  componentidunique?: string;
  componentstate?: number;
  iscustomizable?: BooleanManagedProperty;
  ismanaged?: boolean;
  overwritetime?: string;
  solutionid?: string;
  versionnumber?: number;
}
