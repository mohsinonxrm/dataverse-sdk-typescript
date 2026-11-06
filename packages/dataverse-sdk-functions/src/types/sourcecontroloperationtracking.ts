/**
 * sourcecontroloperationtracking entity type
 */
export interface sourcecontroloperationtracking {
  _createdby_value?: string;
  _createdonbehalfby_value?: string;
  _modifiedby_value?: string;
  _modifiedonbehalfby_value?: string;
  _organizationid_value?: string;
  additionalinfo?: string;
  asyncoperationid?: string;
  createdon?: string;
  endtime?: string;
  error?: string;
  errordetails?: string;
  importsequencenumber?: number;
  modifiedon?: string;
  name?: string;
  operationname?: number;
  operationtype?: number;
  overriddencreatedon?: string;
  solutionid?: string;
  solutionname?: string;
  sourcecontroloperationtrackingid?: string;
  starttime?: string;
  statecode?: number;
  status?: number;
  statuscode?: number;
  suboperationname?: number;
  timezoneruleversionnumber?: number;
  utcconversiontimezonecode?: number;
  versionnumber?: number;
}
