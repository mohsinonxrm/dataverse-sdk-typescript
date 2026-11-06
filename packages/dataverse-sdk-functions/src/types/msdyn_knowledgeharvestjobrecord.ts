/**
 * msdyn_knowledgeharvestjobrecord entity type
 */
export interface msdyn_knowledgeharvestjobrecord {
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
  msdyn_additionalinformation?: string;
  msdyn_aiusage?: string;
  msdyn_entityids?: string;
  msdyn_entityname?: number;
  msdyn_harvesttype?: number;
  msdyn_historicalharvestbatchid?: string;
  msdyn_historicalharvestrunid?: string;
  msdyn_knowledgeharvestjobrecordid?: string;
  msdyn_knowledgeharvestplanid?: string;
  msdyn_retrycount?: number;
  overriddencreatedon?: string;
  statecode?: number;
  statuscode?: number;
  timezoneruleversionnumber?: number;
  utcconversiontimezonecode?: number;
  versionnumber?: number;
}
