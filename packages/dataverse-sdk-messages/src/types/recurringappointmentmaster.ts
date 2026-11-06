import type { activitypointer } from "./activitypointer.js";

/**
 * recurringappointmentmaster entity type
 */
export interface recurringappointmentmaster extends activitypointer {
  occurrences?: number;
  importsequencenumber?: number;
  category?: string;
  _ruleid_value?: string;
  isregenerate?: boolean;
  isnthmonthly?: boolean;
  endtime?: string;
  lastexpandedinstancedate?: string;
  isonlinemeeting?: boolean;
  daysofweekmask?: number;
  outlookownerapptid?: number;
  onlinemeetingid?: string;
  effectiveenddate?: string;
  onlinemeetingchatid?: string;
  isalldayevent?: boolean;
  patternenddate?: string;
  starttime?: string;
  globalobjectid?: string;
  patternstartdate?: string;
  overriddencreatedon?: string;
  subscriptionid?: string;
  instance?: number;
  patternendtype?: number;
  deletedexceptionslist?: string;
  onlinemeetingjoinurl?: string;
  nextexpansioninstancedate?: string;
  monthofyear?: number;
  duration?: number;
  isweekdaypattern?: boolean;
  firstdayofweek?: number;
  isnthyearly?: boolean;
  seriesstatus?: boolean;
  subcategory?: string;
  dayofmonth?: number;
  interval?: number;
  expansionstatecode?: number;
  effectivestartdate?: string;
  recurrencepatterntype?: number;
  onlinemeetingtype?: number;
  isunsafe?: number;
  _groupid_value?: string;
  location?: string;
}
