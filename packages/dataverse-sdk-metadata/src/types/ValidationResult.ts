import type { TraceInfo } from "./TraceInfo.js";

/**
 * ValidationResult
 */
export interface ValidationResult {
  ValidationSuccess?: boolean;
  TraceInfo?: TraceInfo;
  ActivityId?: string;
}
