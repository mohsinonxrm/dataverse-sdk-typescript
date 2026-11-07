import type { TraceInfo } from "./TraceInfo.js";

/**
 * ValidationResult
 */
export interface ValidationResult {
  ActivityId?: string;
  TraceInfo?: TraceInfo;
  ValidationSuccess?: boolean;
}
