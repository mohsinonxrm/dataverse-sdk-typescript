import type { SubCode } from "./SubCode.js";
import type { TimeCode } from "./TimeCode.js";

/**
 * TimeInfo complex type
 */
export interface TimeInfo {
  Start?: string;
  End?: string;
  TimeCode?: TimeCode;
  SubCode?: SubCode;
  SourceId?: string;
  CalendarId?: string;
  SourceTypeCode?: number;
  IsActivity?: boolean;
  ActivityStatusCode?: number;
  Effort?: number;
  DisplayText?: string;
}
