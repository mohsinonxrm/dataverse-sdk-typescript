/**
 * msdyn_ocsessionparticipantevent entity type
 */
export interface msdyn_ocsessionparticipantevent {
  _createdby_value?: string;
  _createdonbehalfby_value?: string;
  _modifiedby_value?: string;
  _modifiedonbehalfby_value?: string;
  _msdyn_sessionid_value?: string;
  _msdyn_sessionparticipantid_value?: string;
  _ownerid_value?: string;
  _owningbusinessunit_value?: string;
  _owningteam_value?: string;
  _owninguser_value?: string;
  createdon?: string;
  importsequencenumber?: number;
  modifiedon?: string;
  msdyn_eventduration?: number;
  msdyn_eventendtime?: string;
  msdyn_eventreason?: number;
  msdyn_eventstarttime?: string;
  msdyn_eventtype?: number;
  msdyn_name?: string;
  msdyn_ocsessionparticipanteventid?: string;
  overriddencreatedon?: string;
  statecode?: number;
  statuscode?: number;
  timezoneruleversionnumber?: number;
  utcconversiontimezonecode?: number;
  versionnumber?: number;
}
