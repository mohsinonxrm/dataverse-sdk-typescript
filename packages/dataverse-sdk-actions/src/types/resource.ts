/**
 * resource entity type
 */
export interface resource {
  _businessunitid_value?: string;
  _organizationid_value?: string;
  _siteid_value?: string;
  calendarid?: string;
  displayinserviceviews?: boolean;
  entityimage?: string;
  entityimage_timestamp?: number;
  entityimage_url?: string;
  entityimageid?: string;
  importsequencenumber?: number;
  isdisabled?: boolean;
  name?: string;
  objecttypecode?: string;
  overriddencreatedon?: string;
  resourceid?: string;
  timezoneruleversionnumber?: number;
  utcconversiontimezonecode?: number;
  versionnumber?: number;
}
