/**
 * msdyn_agentcapacityprofileunit entity type
 */
export interface msdyn_agentcapacityprofileunit {
  _createdby_value?: string;
  _createdonbehalfby_value?: string;
  _modifiedby_value?: string;
  _modifiedonbehalfby_value?: string;
  _msdyn_agentid_value?: string;
  _msdyn_capacityprofileid_value?: string;
  _ownerid_value?: string;
  _owningbusinessunit_value?: string;
  _owningteam_value?: string;
  _owninguser_value?: string;
  createdon?: string;
  importsequencenumber?: number;
  modifiedon?: string;
  msdyn_agentcapacityprofileunitid?: string;
  msdyn_availablecapacityprofileunits?: number;
  msdyn_consumedcapacityprofileunits?: number;
  msdyn_defaultmaxunits?: number;
  msdyn_isforceassignedprofile?: boolean;
  msdyn_name?: string;
  overriddencreatedon?: string;
  statecode?: number;
  statuscode?: number;
  timezoneruleversionnumber?: number;
  utcconversiontimezonecode?: number;
  versionnumber?: number;
}
