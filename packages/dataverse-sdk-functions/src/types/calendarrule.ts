/**
 * calendarrule entity type
 */
export interface calendarrule {
  _calendarid_value?: string;
  _createdby_value?: string;
  _createdonbehalfby_value?: string;
  _innercalendarid_value?: string;
  _modifiedby_value?: string;
  _modifiedonbehalfby_value?: string;
  _serviceid_value?: string;
  businessunitid?: string;
  calendarruleid?: string;
  createdon?: string;
  description?: string;
  duration?: number;
  effectiveintervalend?: string;
  effectiveintervalstart?: string;
  effort?: number;
  endtime?: string;
  extentcode?: number;
  groupdesignator?: string;
  ismodified?: boolean;
  isselected?: boolean;
  issimple?: boolean;
  isvaried?: boolean;
  modifiedon?: string;
  name?: string;
  offset?: number;
  organizationid?: string;
  pattern?: string;
  rank?: number;
  starttime?: string;
  subcode?: number;
  timecode?: number;
  timezonecode?: number;
  versionnumber?: number;
}
