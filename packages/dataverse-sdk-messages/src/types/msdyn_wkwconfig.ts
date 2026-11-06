/**
 * msdyn_wkwconfig entity type
 */
export interface msdyn_wkwconfig {
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
  msdyn_currentstatus?: number;
  msdyn_emailtemplateid?: string;
  msdyn_isfrecomplete?: boolean;
  msdyn_iswkwenabled?: boolean;
  msdyn_name?: string;
  msdyn_wkwconfigid?: string;
  overriddencreatedon?: string;
  statecode?: number;
  statuscode?: number;
  timezoneruleversionnumber?: number;
  utcconversiontimezonecode?: number;
  versionnumber?: number;
}
