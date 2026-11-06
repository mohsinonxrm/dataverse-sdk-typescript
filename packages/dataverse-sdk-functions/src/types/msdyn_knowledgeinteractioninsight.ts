/**
 * msdyn_knowledgeinteractioninsight entity type
 */
export interface msdyn_knowledgeinteractioninsight {
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
  msdyn_articlerank?: number;
  msdyn_articlerecordid?: string;
  msdyn_articlerelevance?: number;
  msdyn_interactioncontext?: string;
  msdyn_interactiontype?: string;
  msdyn_knowledgeinteractioninsightid?: string;
  msdyn_knowledgeoperationid?: string;
  msdyn_knowledgeoperationtype?: string;
  msdyn_timestamp?: string;
  overriddencreatedon?: string;
  statecode?: number;
  statuscode?: number;
  timezoneruleversionnumber?: number;
  utcconversiontimezonecode?: number;
  versionnumber?: number;
}
