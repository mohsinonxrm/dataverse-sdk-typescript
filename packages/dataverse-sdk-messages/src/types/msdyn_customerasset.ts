/**
 * msdyn_customerasset entity type
 */
export interface msdyn_customerasset {
  _createdby_value?: string;
  _createdonbehalfby_value?: string;
  _modifiedby_value?: string;
  _modifiedonbehalfby_value?: string;
  _msdyn_account_value?: string;
  _msdyn_customerassetcategory_value?: string;
  _msdyn_functionallocation_value?: string;
  _msdyn_lastcommandsent_value?: string;
  _msdyn_masterasset_value?: string;
  _msdyn_parentasset_value?: string;
  _msdyn_product_value?: string;
  _ownerid_value?: string;
  _owningbusinessunit_value?: string;
  _owningteam_value?: string;
  _owninguser_value?: string;
  createdon?: string;
  importsequencenumber?: number;
  modifiedon?: string;
  msdyn_alert?: boolean;
  msdyn_alertcount?: number;
  msdyn_alertcount_date?: string;
  msdyn_alertcount_state?: number;
  msdyn_assettag?: string;
  msdyn_customerassetid?: string;
  msdyn_deviceid?: string;
  msdyn_lastalerttime?: string;
  msdyn_lastalerttime_date?: string;
  msdyn_lastalerttime_state?: number;
  msdyn_lastcommandsenttime?: string;
  msdyn_latitude?: number;
  msdyn_longitude?: number;
  msdyn_manufacturingdate?: string;
  msdyn_name?: string;
  msdyn_registrationstatus?: number;
  overriddencreatedon?: string;
  statecode?: number;
  statuscode?: number;
  timezoneruleversionnumber?: number;
  utcconversiontimezonecode?: number;
  versionnumber?: number;
}
