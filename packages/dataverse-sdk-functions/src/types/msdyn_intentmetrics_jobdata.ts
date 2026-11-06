/**
 * msdyn_intentmetrics_jobdata entity type
 */
export interface msdyn_intentmetrics_jobdata {
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
  msdyn_intentdata?: string;
  msdyn_intentmetrics_jobdataid?: string;
  msdyn_name?: string;
  msdyn_shouldupdateintents?: boolean;
  msdyn_trackingdate?: string;
  msdyn_trackingid?: string;
  overriddencreatedon?: string;
  statecode?: number;
  statuscode?: number;
  timezoneruleversionnumber?: number;
  utcconversiontimezonecode?: number;
  versionnumber?: number;
}
