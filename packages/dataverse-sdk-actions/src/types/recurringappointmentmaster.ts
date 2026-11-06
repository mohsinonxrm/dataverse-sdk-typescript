import type { activitypointer } from "./activitypointer.js";

/**
 * recurringappointmentmaster entity type
 */
export interface recurringappointmentmaster extends activitypointer {
  _groupid_value?: string;
  _ruleid_value?: string;
  category?: string;
  dayofmonth?: number;
  daysofweekmask?: number;
  deletedexceptionslist?: string;
  duration?: number;
  effectiveenddate?: string;
  effectivestartdate?: string;
  endtime?: string;
  expansionstatecode?: number;
  firstdayofweek?: number;
  globalobjectid?: string;
  importsequencenumber?: number;
  instance?: number;
  interval?: number;
  isalldayevent?: boolean;
  isnthmonthly?: boolean;
  isnthyearly?: boolean;
  isonlinemeeting?: boolean;
  isregenerate?: boolean;
  isunsafe?: number;
  isweekdaypattern?: boolean;
  lastexpandedinstancedate?: string;
  location?: string;
  monthofyear?: number;
  nextexpansioninstancedate?: string;
  occurrences?: number;
  onlinemeetingchatid?: string;
  onlinemeetingid?: string;
  onlinemeetingjoinurl?: string;
  onlinemeetingtype?: number;
  outlookownerapptid?: number;
  overriddencreatedon?: string;
  patternenddate?: string;
  patternendtype?: number;
  patternstartdate?: string;
  recurrencepatterntype?: number;
  seriesstatus?: boolean;
  starttime?: string;
  subcategory?: string;
  subscriptionid?: string;
}
