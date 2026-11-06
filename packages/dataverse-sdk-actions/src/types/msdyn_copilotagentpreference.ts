/**
 * msdyn_copilotagentpreference entity type
 */
export interface msdyn_copilotagentpreference {
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
  msdyn_agentprompts?: string;
  msdyn_copilotagentpreferenceid?: string;
  msdyn_copilottoolscope?: string;
  msdyn_enabledefaultexecution?: boolean;
  msdyn_enabledskills?: string;
  msdyn_isfullpagecopilotenabled?: boolean;
  msdyn_issharepointbasedanswersenabled?: boolean;
  msdyn_kbfilterscope?: string;
  msdyn_name?: string;
  msdyn_pluginscope?: string;
  msdyn_prioritizationcolumns?: string;
  msdyn_prioritizationfetchxml?: string;
  msdyn_prioritizationprompt?: string;
  overriddencreatedon?: string;
  statecode?: number;
  statuscode?: number;
  timezoneruleversionnumber?: number;
  utcconversiontimezonecode?: number;
  versionnumber?: number;
}
