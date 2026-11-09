/**
 * appconfig entity type
 */
export interface appconfig {
  _appmoduleid_value?: string;
  _createdby_value?: string;
  _createdonbehalfby_value?: string;
  _modifiedby_value?: string;
  _modifiedonbehalfby_value?: string;
  _organizationid_value?: string;
  appconfigid?: string;
  appconfigidunique?: string;
  appconfigimportxml?: string;
  componentstate?: number;
  createdon?: string;
  importsequencenumber?: number;
  introducedversion?: string;
  ismanaged?: boolean;
  modifiedon?: string;
  overriddencreatedon?: string;
  overwritetime?: string;
  solutionid?: string;
  statecode?: number;
  statuscode?: number;
  versionnumber?: number;
}
