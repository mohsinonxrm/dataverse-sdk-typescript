/**
 * timezonerule entity type
 */
export interface timezonerule {
  _createdby_value?: string;
  _createdonbehalfby_value?: string;
  _modifiedby_value?: string;
  _modifiedonbehalfby_value?: string;
  _organizationid_value?: string;
  _timezonedefinitionid_value?: string;
  bias?: number;
  createdon?: string;
  daylightbias?: number;
  daylightday?: number;
  daylightdayofweek?: number;
  daylighthour?: number;
  daylightminute?: number;
  daylightmonth?: number;
  daylightsecond?: number;
  daylightyear?: number;
  effectivedatetime?: string;
  modifiedon?: string;
  standardbias?: number;
  standardday?: number;
  standarddayofweek?: number;
  standardhour?: number;
  standardminute?: number;
  standardmonth?: number;
  standardsecond?: number;
  standardyear?: number;
  timezoneruleid?: string;
  timezoneruleversionnumber?: number;
  versionnumber?: number;
}
