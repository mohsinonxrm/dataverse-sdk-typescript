/**
 * msdyn_requirementrelationship entity type
 */
export interface msdyn_requirementrelationship {
  _createdby_value?: string;
  _createdonbehalfby_value?: string;
  _modifiedby_value?: string;
  _modifiedonbehalfby_value?: string;
  _msdyn_parentrequirementrelationshipid_value?: string;
  _msdyn_requirementgroupid_value?: string;
  _ownerid_value?: string;
  _owningbusinessunit_value?: string;
  _owningteam_value?: string;
  _owninguser_value?: string;
  createdon?: string;
  importsequencenumber?: number;
  modifiedon?: string;
  msdyn_minconditioncount?: number;
  msdyn_name?: string;
  msdyn_operator?: number;
  msdyn_requirementgroupcontrolviewid?: string;
  msdyn_requirementrelationshipid?: string;
  msdyn_resourcegroupings?: string;
  overriddencreatedon?: string;
  statecode?: number;
  statuscode?: number;
  timezoneruleversionnumber?: number;
  utcconversiontimezonecode?: number;
  versionnumber?: number;
}
