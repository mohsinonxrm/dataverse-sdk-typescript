/**
 * uom entity type
 */
export interface uom {
  _baseuom_value?: string;
  _createdby_value?: string;
  _createdbyexternalparty_value?: string;
  _createdonbehalfby_value?: string;
  _modifiedby_value?: string;
  _modifiedbyexternalparty_value?: string;
  _modifiedonbehalfby_value?: string;
  _uomscheduleid_value?: string;
  createdon?: string;
  importsequencenumber?: number;
  isschedulebaseuom?: boolean;
  modifiedon?: string;
  name?: string;
  organizationid?: string;
  overriddencreatedon?: string;
  quantity?: number;
  timezoneruleversionnumber?: number;
  uomid?: string;
  utcconversiontimezonecode?: number;
  versionnumber?: number;
}
