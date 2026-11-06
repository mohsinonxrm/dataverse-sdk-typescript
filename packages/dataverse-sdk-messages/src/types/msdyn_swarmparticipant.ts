/**
 * msdyn_swarmparticipant entity type
 */
export interface msdyn_swarmparticipant {
  _createdby_value?: string;
  _createdonbehalfby_value?: string;
  _modifiedby_value?: string;
  _modifiedonbehalfby_value?: string;
  _msdyn_swarmid_value?: string;
  _msdyn_swarmroleid_value?: string;
  _msdyn_userid_value?: string;
  _ownerid_value?: string;
  _owningbusinessunit_value?: string;
  _owningteam_value?: string;
  _owninguser_value?: string;
  createdon?: string;
  importsequencenumber?: number;
  modifiedon?: string;
  msdyn_acceptedon?: string;
  msdyn_name?: string;
  msdyn_rejectedon?: string;
  msdyn_rejectedreason?: string;
  msdyn_swarmparticipantid?: string;
  overriddencreatedon?: string;
  statecode?: number;
  statuscode?: number;
  timezoneruleversionnumber?: number;
  utcconversiontimezonecode?: number;
  versionnumber?: number;
}
