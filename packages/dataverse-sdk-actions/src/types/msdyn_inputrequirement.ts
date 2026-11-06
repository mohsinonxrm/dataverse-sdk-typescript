/**
 * msdyn_inputrequirement entity type
 */
export interface msdyn_inputrequirement {
  _createdby_value?: string;
  _createdonbehalfby_value?: string;
  _modifiedby_value?: string;
  _modifiedonbehalfby_value?: string;
  _msdyn_priority_value?: string;
  _msdyn_resourcerequirementid_value?: string;
  _msdyn_status_value?: string;
  _ownerid_value?: string;
  _owningbusinessunit_value?: string;
  _owningteam_value?: string;
  _owninguser_value?: string;
  createdon?: string;
  importsequencenumber?: number;
  modifiedon?: string;
  msdyn_duration?: number;
  msdyn_exclusionreasons?: string;
  msdyn_fromdate?: string;
  msdyn_fromuserquery?: boolean;
  msdyn_fulfilledduration?: number;
  msdyn_inputrequirementid?: string;
  msdyn_latitude?: number;
  msdyn_longitude?: number;
  msdyn_name?: string;
  msdyn_remainingduration?: number;
  msdyn_timefrompromised?: string;
  msdyn_timetopromised?: string;
  msdyn_timewindowend?: string;
  msdyn_timewindowstart?: string;
  msdyn_todate?: string;
  msdyn_version?: string;
  msdyn_worklocation?: number;
  overriddencreatedon?: string;
  partitionid?: string;
  ttlinseconds?: number;
  versionnumber?: number;
}
