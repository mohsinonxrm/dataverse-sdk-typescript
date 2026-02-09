import type { TraceInfo } from "./TraceInfo.js";

/**
 * ValidationResult complex type
 */
export interface ValidationResult {
  ValidationSuccess: boolean;
  TraceInfo: TraceInfo;
  ActivityId: string;
}
