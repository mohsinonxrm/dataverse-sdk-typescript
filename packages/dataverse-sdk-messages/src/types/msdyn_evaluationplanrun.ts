/**
 * msdyn_evaluationplanrun entity type
 */
export interface msdyn_evaluationplanrun {
  _createdby_value?: string;
  _createdonbehalfby_value?: string;
  _modifiedby_value?: string;
  _modifiedonbehalfby_value?: string;
  _msdyn_assignedto_value?: string;
  _msdyn_evaluationcriteria_value?: string;
  _msdyn_evaluationplan_value?: string;
  _msdyn_evaluationthirdpartyconfiguration_value?: string;
  _ownerid_value?: string;
  _owningbusinessunit_value?: string;
  _owningteam_value?: string;
  _owninguser_value?: string;
  createdon?: string;
  importsequencenumber?: number;
  modifiedon?: string;
  msdyn_additionalcontext?: string;
  msdyn_bjscorrelationid?: string;
  msdyn_bjsjobid?: string;
  msdyn_duedate?: string;
  msdyn_errordetails?: string;
  msdyn_evaluationmethod?: number;
  msdyn_evaluationplanenddate?: string;
  msdyn_evaluationplanrunid?: string;
  msdyn_evaluationplanstartdate?: string;
  msdyn_evaluationscreated?: number;
  msdyn_evaluationsfailed?: number;
  msdyn_filterrulesxml?: string;
  msdyn_pageindex?: number;
  msdyn_paginationmarker?: string;
  msdyn_planname?: string;
  msdyn_recordscountidentifiedbycondition?: number;
  msdyn_recordscountidentifiedbysampling?: number;
  msdyn_recordsidentificationcompletedon?: string;
  msdyn_recordtype?: number;
  msdyn_samplingconfiguration?: string;
  msdyn_totalrecordsdiscovered?: number;
  overriddencreatedon?: string;
  statecode?: number;
  statuscode?: number;
  timezoneruleversionnumber?: number;
  utcconversiontimezonecode?: number;
  versionnumber?: number;
}
