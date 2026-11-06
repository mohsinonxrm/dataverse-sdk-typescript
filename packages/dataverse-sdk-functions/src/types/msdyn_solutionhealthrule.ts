/**
 * msdyn_solutionhealthrule entity type
 */
export interface msdyn_solutionhealthrule {
  _createdby_value?: string;
  _createdonbehalfby_value?: string;
  _modifiedby_value?: string;
  _modifiedonbehalfby_value?: string;
  _msdyn_resolutionaction_value?: string;
  _msdyn_solutionhealthrulesetid_value?: string;
  _msdyn_workflow_value?: string;
  _ownerid_value?: string;
  _owningbusinessunit_value?: string;
  _owningteam_value?: string;
  _owninguser_value?: string;
  createdon?: string;
  importsequencenumber?: number;
  modifiedon?: string;
  msdyn_componenttype?: string;
  msdyn_description?: string;
  msdyn_name?: string;
  msdyn_owningsolutionid?: string;
  msdyn_resolutionmessage?: string;
  msdyn_resolutiontype?: number;
  msdyn_solutionhealthruleid?: string;
  msdyn_uniquename?: string;
  overriddencreatedon?: string;
  statecode?: number;
  statuscode?: number;
  timezoneruleversionnumber?: number;
  utcconversiontimezonecode?: number;
  versionnumber?: number;
}
