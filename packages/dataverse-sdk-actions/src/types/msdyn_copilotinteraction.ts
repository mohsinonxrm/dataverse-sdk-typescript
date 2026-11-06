/**
 * msdyn_copilotinteraction entity type
 */
export interface msdyn_copilotinteraction {
  _createdby_value?: string;
  _createdonbehalfby_value?: string;
  _modifiedby_value?: string;
  _modifiedonbehalfby_value?: string;
  _msdyn_interactiondataid_value?: string;
  _organizationid_value?: string;
  createdon?: string;
  importsequencenumber?: number;
  modifiedon?: string;
  msdyn_clienttimestamp?: string;
  msdyn_copilotinteractionid?: string;
  msdyn_interactioncontext?: string;
  msdyn_interactionforid?: string;
  msdyn_interactionforlogicalname?: string;
  msdyn_interactiontype?: number;
  msdyn_name?: string;
  msdyn_scenariorequestid?: string;
  msdyn_scenariotype?: number;
  overriddencreatedon?: string;
  statecode?: number;
  statuscode?: number;
  timezoneruleversionnumber?: number;
  utcconversiontimezonecode?: number;
  versionnumber?: number;
}
