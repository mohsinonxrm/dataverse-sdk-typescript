import type { TraceInfo } from "./TraceInfo.js";

/**
 * ValidationResult complex type
 */
export interface ValidationResult {
  ActivityId?: string;
  TraceInfo?: TraceInfo;
  ValidationSuccess?: boolean;
}
