/**
 * msdyn_inputschedule entity type
 */
export interface msdyn_inputschedule {
  _createdby_value?: string;
  _createdonbehalfby_value?: string;
  _modifiedby_value?: string;
  _modifiedonbehalfby_value?: string;
  _msdyn_resourceid_value?: string;
  _ownerid_value?: string;
  _owningbusinessunit_value?: string;
  _owningteam_value?: string;
  _owninguser_value?: string;
  createdon?: string;
  importsequencenumber?: number;
  modifiedon?: string;
  msdyn_bookings?: string;
  msdyn_characteristics?: string;
  msdyn_exclusionreasons?: string;
  msdyn_fromuserquery?: boolean;
  msdyn_inputscheduleid?: string;
  msdyn_name?: string;
  msdyn_territory?: string;
  msdyn_version?: string;
  msdyn_workhours?: string;
  overriddencreatedon?: string;
  partitionid?: string;
  ttlinseconds?: number;
  versionnumber?: number;
}
