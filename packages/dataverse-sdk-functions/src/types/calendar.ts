/**
 * calendar entity type
 */
export interface calendar {
  _businessunitid_value?: string;
  _createdby_value?: string;
  _createdonbehalfby_value?: string;
  _holidayschedulecalendarid_value?: string;
  _modifiedby_value?: string;
  _modifiedonbehalfby_value?: string;
  _organizationid_value?: string;
  calendarid?: string;
  createdon?: string;
  description?: string;
  isshared?: boolean;
  modifiedon?: string;
  name?: string;
  primaryuserid?: string;
  type?: number;
  versionnumber?: number;
}
