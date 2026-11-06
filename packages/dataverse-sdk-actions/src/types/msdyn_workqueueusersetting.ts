/**
 * msdyn_workqueueusersetting entity type
 */
export interface msdyn_workqueueusersetting {
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
  msdyn_actiononmarkcomplete?: number;
  msdyn_actiononskip?: number;
  msdyn_linkingconfiguration?: string;
  msdyn_name?: string;
  msdyn_sellercardlayout?: string;
  msdyn_sellerfilterconfiguration?: string;
  msdyn_sellersortconfiguration?: string;
  msdyn_suggestionsellerfilterconfiguration?: string;
  msdyn_userid?: string;
  msdyn_workqueueusersettingid?: string;
  overriddencreatedon?: string;
  statecode?: number;
  statuscode?: number;
  timezoneruleversionnumber?: number;
  utcconversiontimezonecode?: number;
  versionnumber?: number;
}
