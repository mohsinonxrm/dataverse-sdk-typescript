/**
 * msdyn_agentcapacityupdatehistory entity type
 */
export interface msdyn_agentcapacityupdatehistory {
  _createdby_value?: string;
  _createdonbehalfby_value?: string;
  _modifiedby_value?: string;
  _modifiedonbehalfby_value?: string;
  _msdyn_agentid_value?: string;
  _msdyn_capacityprofileid_value?: string;
  _msdyn_presenceid_value?: string;
  _msdyn_sessionid_value?: string;
  _ownerid_value?: string;
  _owningbusinessunit_value?: string;
  _owningteam_value?: string;
  _owninguser_value?: string;
  createdon?: string;
  importsequencenumber?: number;
  modifiedon?: string;
  msdyn_agentcapacityupdatehistoryid?: string;
  msdyn_availablecapacityprofileunits?: number;
  msdyn_blockassignment?: boolean;
  msdyn_defaultmaxunits?: number;
  msdyn_endtime?: string;
  msdyn_eventid?: string;
  msdyn_isforceassignment?: boolean;
  msdyn_isunitbased?: boolean;
  msdyn_name?: string;
  msdyn_resetduration?: number;
  msdyn_starttime?: string;
  overriddencreatedon?: string;
  statecode?: number;
  statuscode?: number;
  timezoneruleversionnumber?: number;
  utcconversiontimezonecode?: number;
  versionnumber?: number;
}
