/**
 * msdyn_historicalcaseharvestbatch entity type
 */
export interface msdyn_historicalcaseharvestbatch {
  _createdby_value?: string;
  _createdonbehalfby_value?: string;
  _modifiedby_value?: string;
  _modifiedonbehalfby_value?: string;
  _msdyn_historicalcaseharvestrunid_value?: string;
  _ownerid_value?: string;
  _owningbusinessunit_value?: string;
  _owningteam_value?: string;
  _owninguser_value?: string;
  createdon?: string;
  importsequencenumber?: number;
  modifiedon?: string;
  modulerunid?: string;
  msdyn_articlescreated?: number;
  msdyn_batchprocessingcompletedon?: string;
  msdyn_batchsize?: number;
  msdyn_casesskipped?: number;
  msdyn_historicalcaseharvestbatchid?: string;
  msdyn_incidentids?: string;
  msdyn_name?: string;
  msdyn_updatescheduledon?: string;
  msdyn_updatescheduledonsentinel?: string;
  overriddencreatedon?: string;
  statecode?: number;
  statuscode?: number;
  timezoneruleversionnumber?: number;
  utcconversiontimezonecode?: number;
  versionnumber?: number;
}
