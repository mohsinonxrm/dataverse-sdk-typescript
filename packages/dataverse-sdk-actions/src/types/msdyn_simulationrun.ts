/**
 * msdyn_simulationrun entity type
 */
export interface msdyn_simulationrun {
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
  msdyn_customdata?: string;
  msdyn_endtime?: string;
  msdyn_errormessage?: string;
  msdyn_feedbacktext?: string;
  msdyn_ispromptsaved?: boolean;
  msdyn_isrunhelpful?: boolean;
  msdyn_kpimetrics?: string;
  msdyn_prompt?: string;
  msdyn_simulationrunid?: string;
  msdyn_source?: string;
  msdyn_stage?: string;
  msdyn_stagedescription?: string;
  msdyn_starttime?: string;
  msdyn_status?: number;
  msdyn_workstreamid?: string;
  overriddencreatedon?: string;
  partitionid?: string;
  statecode?: number;
  statuscode?: number;
  timezoneruleversionnumber?: number;
  ttlinseconds?: number;
  utcconversiontimezonecode?: number;
  versionnumber?: number;
}
