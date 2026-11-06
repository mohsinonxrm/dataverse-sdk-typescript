/**
 * importjob entity type
 */
export interface importjob {
  _createdby_value?: string;
  _createdonbehalfby_value?: string;
  _modifiedby_value?: string;
  _modifiedonbehalfby_value?: string;
  _organizationid_value?: string;
  completedon?: string;
  createdon?: string;
  data?: string;
  importcontext?: string;
  importjobid?: string;
  modifiedon?: string;
  name?: string;
  operationcontext?: string;
  progress?: number;
  solutionid?: string;
  solutionname?: string;
  startedon?: string;
  timezoneruleversionnumber?: number;
  utcconversiontimezonecode?: number;
}
