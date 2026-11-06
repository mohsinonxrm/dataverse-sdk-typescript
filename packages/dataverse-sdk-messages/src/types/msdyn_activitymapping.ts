/**
 * msdyn_activitymapping entity type
 */
export interface msdyn_activitymapping {
  _createdby_value?: string;
  _createdonbehalfby_value?: string;
  _modifiedby_value?: string;
  _modifiedonbehalfby_value?: string;
  _msdyn_regardingobjectid_value?: string;
  _ownerid_value?: string;
  _owningbusinessunit_value?: string;
  _owningteam_value?: string;
  _owninguser_value?: string;
  createdon?: string;
  importsequencenumber?: number;
  modifiedon?: string;
  msdyn_activitycontent?: string;
  msdyn_activityid?: string;
  msdyn_activitymappingid?: string;
  msdyn_activitytype?: number;
  msdyn_conversationid?: string;
  msdyn_internetmessageid?: string;
  msdyn_name?: string;
  overriddencreatedon?: string;
  statecode?: number;
  statuscode?: number;
  timezoneruleversionnumber?: number;
  utcconversiontimezonecode?: number;
  versionnumber?: number;
}
