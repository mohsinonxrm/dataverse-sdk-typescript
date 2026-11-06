/**
 * msdyn_channelinstance entity type
 */
export interface msdyn_channelinstance {
  _createdby_value?: string;
  _createdonbehalfby_value?: string;
  _modifiedby_value?: string;
  _modifiedonbehalfby_value?: string;
  _msdyn_channeldefinitionid_value?: string;
  _msdyn_channelinstanceaccountid_value?: string;
  _msdyn_consumingapplicationid_value?: string;
  _msdyn_extendedentityid_value?: string;
  _ownerid_value?: string;
  _owningbusinessunit_value?: string;
  _owningteam_value?: string;
  _owninguser_value?: string;
  createdon?: string;
  importsequencenumber?: number;
  modifiedon?: string;
  msdyn_channelinstanceid?: string;
  msdyn_contactpoint?: string;
  msdyn_description?: string;
  msdyn_name?: string;
  overriddencreatedon?: string;
  statecode?: number;
  statuscode?: number;
  timezoneruleversionnumber?: number;
  utcconversiontimezonecode?: number;
  versionnumber?: number;
}
