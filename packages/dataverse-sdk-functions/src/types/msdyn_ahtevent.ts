/**
 * msdyn_ahtevent entity type
 */
export interface msdyn_ahtevent {
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
  msdyn_ahteventid?: string;
  msdyn_dedupkey?: string;
  msdyn_eventtime?: string;
  msdyn_eventtype?: string;
  msdyn_liveworkitemid?: string;
  msdyn_name?: string;
  msdyn_payload?: string;
  msdyn_sessionid?: string;
  msdyn_sessionparticipantid?: string;
  overriddencreatedon?: string;
  partitionid?: string;
  ttlinseconds?: number;
  versionnumber?: number;
}
