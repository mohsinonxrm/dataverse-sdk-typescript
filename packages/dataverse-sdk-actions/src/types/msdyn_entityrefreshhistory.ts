/**
 * msdyn_entityrefreshhistory entity type
 */
export interface msdyn_entityrefreshhistory {
  _createdby_value?: string;
  _createdonbehalfby_value?: string;
  _modifiedby_value?: string;
  _modifiedonbehalfby_value?: string;
  _msdyn_dataflowhistorylookup_value?: string;
  _ownerid_value?: string;
  _owningbusinessunit_value?: string;
  _owningteam_value?: string;
  _owninguser_value?: string;
  createdon?: string;
  importsequencenumber?: number;
  modifiedon?: string;
  msdyn_dataflowid?: string;
  msdyn_dataflowname?: string;
  msdyn_endtime?: string;
  msdyn_entityname?: string;
  msdyn_entityrefreshhistoryid?: string;
  msdyn_errorcount?: number;
  msdyn_errorinfoerrorcode?: string;
  msdyn_errorinfoerrormessage?: string;
  msdyn_errorinfoevaluationresultjson?: string;
  msdyn_errorinfoevaluationresultjsonmemo?: string;
  msdyn_errorinfoloadtocdserrorinfojson?: string;
  msdyn_errorinfoloadtocdserrorinfojsonmemo?: string;
  msdyn_insertcount?: number;
  msdyn_name?: string;
  msdyn_refreshstatus?: string;
  msdyn_starttime?: string;
  msdyn_transactionid?: string;
  msdyn_upsertcount?: number;
  overriddencreatedon?: string;
  statecode?: number;
  statuscode?: number;
  timezoneruleversionnumber?: number;
  utcconversiontimezonecode?: number;
  versionnumber?: number;
}
