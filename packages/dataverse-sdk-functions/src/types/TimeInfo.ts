import type { SubCode } from './SubCode.js';
import type { TimeCode } from './TimeCode.js';

/**
 * TimeInfo complex type
 */
export interface TimeInfo {
  ActivityStatusCode?: number;
  CalendarId?: string;
  DisplayText?: string;
  Effort?: number;
  End?: string;
  IsActivity?: boolean;
  SourceId?: string;
  SourceTypeCode?: number;
  Start?: string;
  SubCode?: SubCode;
  TimeCode?: TimeCode;
}
