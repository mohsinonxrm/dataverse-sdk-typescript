/**
 * msdyn_requirementdependency entity type
 */
export interface msdyn_requirementdependency {
  _createdby_value?: string;
  _createdonbehalfby_value?: string;
  _modifiedby_value?: string;
  _modifiedonbehalfby_value?: string;
  _msdyn_dependentrequirement_value?: string;
  _msdyn_requirement_value?: string;
  _ownerid_value?: string;
  _owningbusinessunit_value?: string;
  _owningteam_value?: string;
  _owninguser_value?: string;
  createdon?: string;
  importsequencenumber?: number;
  modifiedon?: string;
  msdyn_dependencytype?: number;
  msdyn_name?: string;
  msdyn_requirementdependencyid?: string;
  msdyn_requiresameresource?: boolean;
  overriddencreatedon?: string;
  statecode?: number;
  statuscode?: number;
  timezoneruleversionnumber?: number;
  utcconversiontimezonecode?: number;
  versionnumber?: number;
}
