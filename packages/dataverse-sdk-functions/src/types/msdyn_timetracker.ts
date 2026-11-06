/**
 * msdyn_timetracker entity type
 */
export interface msdyn_timetracker {
  _createdby_value?: string;
  _createdonbehalfby_value?: string;
  _modifiedby_value?: string;
  _modifiedonbehalfby_value?: string;
  _msdyn_regardingentity_value?: string;
  _ownerid_value?: string;
  _owningbusinessunit_value?: string;
  _owningteam_value?: string;
  _owninguser_value?: string;
  createdon?: string;
  importsequencenumber?: number;
  modifiedon?: string;
  msdyn_category?: number;
  msdyn_duration?: number;
  msdyn_name?: string;
  msdyn_reasoncategoryfortimelog?: number;
  msdyn_reasonfortimelog?: string;
  msdyn_starttime?: string;
  msdyn_timetrackerid?: string;
  msdyn_timevaluepercategory?: string;
  overriddencreatedon?: string;
  partitionid?: string;
  ttlinseconds?: number;
  versionnumber?: number;
}
