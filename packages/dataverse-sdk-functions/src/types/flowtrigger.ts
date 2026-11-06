/**
 * flowtrigger entity type
 */
export interface flowtrigger {
  _createdby_value?: string;
  _createdonbehalfby_value?: string;
  _modifiedby_value?: string;
  _modifiedonbehalfby_value?: string;
  _ownerid_value?: string;
  _owningbusinessunit_value?: string;
  _owningteam_value?: string;
  _owninguser_value?: string;
  createdon?: string;
  description?: string;
  flowtriggerid?: string;
  importsequencenumber?: number;
  modifiedon?: string;
  name?: string;
  overriddencreatedon?: string;
  scheduledefinition?: string;
  statecode?: number;
  statuscode?: number;
  timezoneruleversionnumber?: number;
  triggertype?: number;
  utcconversiontimezonecode?: number;
  versionnumber?: number;
}
