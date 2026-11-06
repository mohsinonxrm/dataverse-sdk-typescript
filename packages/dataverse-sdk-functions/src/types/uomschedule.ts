/**
 * uomschedule entity type
 */
export interface uomschedule {
  _createdby_value?: string;
  _createdbyexternalparty_value?: string;
  _createdonbehalfby_value?: string;
  _modifiedby_value?: string;
  _modifiedbyexternalparty_value?: string;
  _modifiedonbehalfby_value?: string;
  _organizationid_value?: string;
  baseuomname?: string;
  createdon?: string;
  description?: string;
  importsequencenumber?: number;
  modifiedon?: string;
  name?: string;
  overriddencreatedon?: string;
  statecode?: number;
  statuscode?: number;
  timezoneruleversionnumber?: number;
  uomscheduleid?: string;
  utcconversiontimezonecode?: number;
  versionnumber?: number;
}
