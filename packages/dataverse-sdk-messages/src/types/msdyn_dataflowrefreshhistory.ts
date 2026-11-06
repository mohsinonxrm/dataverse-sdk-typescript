/**
 * msdyn_dataflowrefreshhistory entity type
 */
export interface msdyn_dataflowrefreshhistory {
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
  msdyn_dataflowid?: string;
  msdyn_dataflowname?: string;
  msdyn_dataflowrefreshhistoryid?: string;
  msdyn_endtime?: string;
  msdyn_errorinfojson?: string;
  msdyn_jobid?: string;
  msdyn_name?: string;
  msdyn_refreshstatus?: string;
  msdyn_refreshtype?: string;
  msdyn_requestid?: string;
  msdyn_starttime?: string;
  msdyn_transactionid?: string;
  overriddencreatedon?: string;
  statecode?: number;
  statuscode?: number;
  timezoneruleversionnumber?: number;
  utcconversiontimezonecode?: number;
  versionnumber?: number;
}
