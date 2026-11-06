/**
 * msdyn_aioptimization entity type
 */
export interface msdyn_aioptimization {
  _createdby_value?: string;
  _createdonbehalfby_value?: string;
  _modifiedby_value?: string;
  _modifiedonbehalfby_value?: string;
  _msdyn_aimodelid_value?: string;
  _msdyn_aioptimizationprivatedataid_value?: string;
  _ownerid_value?: string;
  _owningbusinessunit_value?: string;
  _owningteam_value?: string;
  _owninguser_value?: string;
  createdon?: string;
  importsequencenumber?: number;
  modifiedon?: string;
  msdyn_aiobjectid?: string;
  msdyn_aioptimizationid?: string;
  msdyn_currentiteration?: number;
  msdyn_currentprompt?: string;
  msdyn_currentscore?: number;
  msdyn_enddate?: string;
  msdyn_evaluationcriteria?: string;
  msdyn_explanation?: string;
  msdyn_modelsettings?: string;
  msdyn_oldscore?: number;
  msdyn_prompthistory?: string;
  msdyn_runstatus?: number;
  msdyn_startdate?: string;
  msdyn_totaliterations?: number;
  overriddencreatedon?: string;
  statecode?: number;
  statuscode?: number;
  timezoneruleversionnumber?: number;
  utcconversiontimezonecode?: number;
  versionnumber?: number;
}
