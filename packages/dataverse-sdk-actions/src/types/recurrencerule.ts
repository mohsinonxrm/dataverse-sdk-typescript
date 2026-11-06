/**
 * recurrencerule entity type
 */
export interface recurrencerule {
  _createdby_value?: string;
  _createdonbehalfby_value?: string;
  _modifiedby_value?: string;
  _modifiedonbehalfby_value?: string;
  _objectid_value?: string;
  _ownerid_value?: string;
  _owningbusinessunit_value?: string;
  _owningteam_value?: string;
  _owninguser_value?: string;
  createdon?: string;
  dayofmonth?: number;
  daysofweekmask?: number;
  duration?: number;
  effectiveenddate?: string;
  effectivestartdate?: string;
  endtime?: string;
  firstdayofweek?: number;
  instance?: number;
  interval?: number;
  isnthmonthly?: boolean;
  isnthyearly?: boolean;
  isregenerate?: boolean;
  isweekdaypattern?: boolean;
  modifiedon?: string;
  monthofyear?: number;
  occurrences?: number;
  patternenddate?: string;
  patternendtype?: number;
  patternstartdate?: string;
  recurrencepatterntype?: number;
  ruleid?: string;
  starttime?: string;
  versionnumber?: number;
}
