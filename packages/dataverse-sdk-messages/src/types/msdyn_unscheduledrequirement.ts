/**
 * msdyn_unscheduledrequirement entity type
 */
export interface msdyn_unscheduledrequirement {
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
  msdyn_name?: string;
  msdyn_remainingduration?: number;
  msdyn_timefrom?: string;
  msdyn_timeto?: string;
  msdyn_todate?: string;
  msdyn_unscheduledrequirementid?: string;
  msdyn_version?: string;
  overriddencreatedon?: string;
  partitionid?: string;
  ttlinseconds?: number;
  versionnumber?: number;
}
