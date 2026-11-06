/**
 * msdyn_personalsoundsetting entity type
 */
export interface msdyn_personalsoundsetting {
  _createdby_value?: string;
  _createdonbehalfby_value?: string;
  _modifiedby_value?: string;
  _modifiedonbehalfby_value?: string;
  _msdyn_linksoundfile_value?: string;
  _ownerid_value?: string;
  _owningbusinessunit_value?: string;
  _owningteam_value?: string;
  _owninguser_value?: string;
  createdon?: string;
  importsequencenumber?: number;
  modifiedon?: string;
  msdyn_enablesound?: boolean;
  msdyn_isdefaultrecord?: boolean;
  msdyn_linkchannel?: string;
  msdyn_loopsound?: boolean;
  msdyn_name?: string;
  msdyn_personalsoundsettingid?: string;
  msdyn_volume?: number;
  overriddencreatedon?: string;
  statecode?: number;
  statuscode?: number;
  timezoneruleversionnumber?: number;
  utcconversiontimezonecode?: number;
  versionnumber?: number;
}
