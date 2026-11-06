/**
 * flowtestsession entity type
 */
export interface flowtestsession {
  _createdby_value?: string;
  _createdonbehalfby_value?: string;
  _modifiedby_value?: string;
  _modifiedonbehalfby_value?: string;
  _ownerid_value?: string;
  _owningbusinessunit_value?: string;
  _owningteam_value?: string;
  _owninguser_value?: string;
  completedon?: string;
  correlationid?: string;
  createdon?: string;
  durationinseconds?: number;
  flowtestsessionid?: string;
  importsequencenumber?: number;
  modifiedon?: string;
  name?: string;
  overriddencreatedon?: string;
  parentcloudflowrunsequenceid?: string;
  parentworkflowid?: string;
  runmode?: number;
  startedon?: string;
  statecode?: number;
  statuscode?: number;
  timezoneruleversionnumber?: number;
  utcconversiontimezonecode?: number;
  versionnumber?: number;
}
