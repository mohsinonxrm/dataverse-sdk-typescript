/**
 * msdyn_harvestworkitem entity type
 */
export interface msdyn_harvestworkitem {
  _createdby_value?: string;
  _createdonbehalfby_value?: string;
  _modifiedby_value?: string;
  _modifiedonbehalfby_value?: string;
  _msdyn_knowledgearticleid_value?: string;
  _ownerid_value?: string;
  _owningbusinessunit_value?: string;
  _owningteam_value?: string;
  _owninguser_value?: string;
  createdon?: string;
  importsequencenumber?: number;
  modifiedon?: string;
  msdyn_condensedsummary?: string;
  msdyn_embeddingsummary?: string;
  msdyn_embeddingvector?: string;
  msdyn_harvestworkitemid?: string;
  msdyn_log?: string;
  msdyn_sourcelogicalname?: string;
  msdyn_sourceprimaryid?: string;
  msdyn_state?: number;
  msdyn_summary?: string;
  msdyn_summaryupdatedon?: string;
  overriddencreatedon?: string;
  statecode?: number;
  statuscode?: number;
  timezoneruleversionnumber?: number;
  utcconversiontimezonecode?: number;
  versionnumber?: number;
}
