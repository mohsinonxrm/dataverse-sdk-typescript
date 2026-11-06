/**
 * equipment entity type
 */
export interface equipment {
  _businessunitid_value?: string;
  _calendarid_value?: string;
  _createdby_value?: string;
  _createdonbehalfby_value?: string;
  _modifiedby_value?: string;
  _modifiedonbehalfby_value?: string;
  _msdyn_organizationalunitid_value?: string;
  _organizationid_value?: string;
  _siteid_value?: string;
  _transactioncurrencyid_value?: string;
  createdon?: string;
  description?: string;
  displayinserviceviews?: boolean;
  emailaddress?: string;
  equipmentid?: string;
  exchangerate?: number;
  importsequencenumber?: number;
  isdisabled?: boolean;
  modifiedon?: string;
  name?: string;
  overriddencreatedon?: string;
  skills?: string;
  timezonecode?: number;
  timezoneruleversionnumber?: number;
  utcconversiontimezonecode?: number;
  versionnumber?: number;
}
