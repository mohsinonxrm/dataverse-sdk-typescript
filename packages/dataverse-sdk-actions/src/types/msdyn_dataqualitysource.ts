/**
 * msdyn_dataqualitysource entity type
 */
export interface msdyn_dataqualitysource {
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
  msdyn_conversationindex?: string;
  msdyn_dataqualitysourceid?: string;
  msdyn_name?: string;
  msdyn_originalconversationid?: string;
  msdyn_originalsourceid?: string;
  msdyn_regardingid?: string;
  msdyn_regardingtype?: string;
  msdyn_sourcecontenthash?: string;
  msdyn_sourceentitylogicalname?: string;
  msdyn_sourceitemid?: string;
  msdyn_sourcerole?: string;
  msdyn_timestamp?: string;
  msdyn_type?: number;
  overriddencreatedon?: string;
  statecode?: number;
  statuscode?: number;
  timezoneruleversionnumber?: number;
  utcconversiontimezonecode?: number;
  versionnumber?: number;
}
