/**
 * msdyn_upgradeversion entity type
 */
export interface msdyn_upgradeversion {
  _createdby_value?: string;
  _createdonbehalfby_value?: string;
  _modifiedby_value?: string;
  _modifiedonbehalfby_value?: string;
  _msdyn_upgraderun_value?: string;
  _organizationid_value?: string;
  createdon?: string;
  importsequencenumber?: number;
  modifiedon?: string;
  msdyn_finished?: string;
  msdyn_startingversion?: string;
  msdyn_status?: number;
  msdyn_summary?: string;
  msdyn_targetversion?: string;
  msdyn_upgradeversionid?: string;
  overriddencreatedon?: string;
  statecode?: number;
  statuscode?: number;
  timezoneruleversionnumber?: number;
  utcconversiontimezonecode?: number;
  versionnumber?: number;
}
