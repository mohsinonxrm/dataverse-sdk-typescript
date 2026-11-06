/**
 * msdyn_iotalert entity type
 */
export interface msdyn_iotalert {
  _createdby_value?: string;
  _createdonbehalfby_value?: string;
  _modifiedby_value?: string;
  _modifiedonbehalfby_value?: string;
  _msdyn_case_value?: string;
  _msdyn_customerasset_value?: string;
  _msdyn_device_value?: string;
  _msdyn_lastcommandsent_value?: string;
  _msdyn_parentalert_value?: string;
  _ownerid_value?: string;
  _owningbusinessunit_value?: string;
  _owningteam_value?: string;
  _owninguser_value?: string;
  _stageid_value?: string;
  createdon?: string;
  importsequencenumber?: number;
  modifiedon?: string;
  msdyn_alertdata?: string;
  msdyn_alertpriorityscore?: number;
  msdyn_alerttime?: string;
  msdyn_alerttoken?: string;
  msdyn_alerttype?: number;
  msdyn_alerturl?: string;
  msdyn_description?: string;
  msdyn_deviceid?: string;
  msdyn_iotalertid?: string;
  msdyn_lastcommandsenttime?: string;
  msdyn_parentalerttoken?: string;
  msdyn_suggestedpriority?: number;
  overriddencreatedon?: string;
  processid?: string;
  statecode?: number;
  statuscode?: number;
  timezoneruleversionnumber?: number;
  traversedpath?: string;
  utcconversiontimezonecode?: number;
  versionnumber?: number;
}
