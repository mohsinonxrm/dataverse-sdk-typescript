/**
 * msdyn_conversationaggregatedinsights entity type
 */
export interface msdyn_conversationaggregatedinsights {
  _createdby_value?: string;
  _createdonbehalfby_value?: string;
  _modifiedby_value?: string;
  _modifiedonbehalfby_value?: string;
  _ownerid_value?: string;
  _owningbusinessunit_value?: string;
  _owningteam_value?: string;
  _owninguser_value?: string;
  createdon?: string;
  importsequencenumber?: number;
  modifiedon?: string;
  msdyn_conversationaggregatedinsightsid?: string;
  msdyn_conversationdurationinms?: number;
  msdyn_customerlongestmonologueinms?: number;
  msdyn_name?: string;
  msdyn_switchcount?: number;
  overriddencreatedon?: string;
  statecode?: number;
  statuscode?: number;
  timezoneruleversionnumber?: number;
  utcconversiontimezonecode?: number;
  versionnumber?: number;
}
