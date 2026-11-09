/**
 * appconfiginstance entity type
 */
export interface appconfiginstance {
  _appconfigid_value?: string;
  _appconfigmasterid_value?: string;
  _createdby_value?: string;
  _createdonbehalfby_value?: string;
  _modifiedby_value?: string;
  _modifiedonbehalfby_value?: string;
  _organizationid_value?: string;
  appconfigidunique?: string;
  appconfiginstanceid?: string;
  appconfiginstanceidunique?: string;
  componentstate?: number;
  componenttype?: string;
  createdon?: string;
  importsequencenumber?: number;
  introducedversion?: string;
  ismanaged?: boolean;
  modifiedon?: string;
  objectid?: string;
  overriddencreatedon?: string;
  overwritetime?: string;
  solutionid?: string;
  value?: string;
  versionnumber?: number;
}
