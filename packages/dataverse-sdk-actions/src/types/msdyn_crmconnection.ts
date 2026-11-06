/**
 * msdyn_crmconnection entity type
 */
export interface msdyn_crmconnection {
  _createdby_value?: string;
  _createdonbehalfby_value?: string;
  _modifiedby_value?: string;
  _modifiedonbehalfby_value?: string;
  _ownerid_value?: string;
  _owningbusinessunit_value?: string;
  _owningteam_value?: string;
  _owninguser_value?: string;
  createdon?: string;
  importsequencenumber?: number;
  modifiedon?: string;
  msdyn_apimuri?: string;
  msdyn_connectionstate?: number;
  msdyn_connectorid?: string;
  msdyn_connectoruri?: string;
  msdyn_crmconnectionid?: string;
  msdyn_crmtype?: string;
  msdyn_crmurl?: string;
  msdyn_crmuserid?: string;
  msdyn_environmentid?: string;
  msdyn_name?: string;
  msdyn_producttype?: number;
  msdyn_sfenvironmenttype?: number;
  overriddencreatedon?: string;
  statecode?: number;
  statuscode?: number;
  timezoneruleversionnumber?: number;
  utcconversiontimezonecode?: number;
  versionnumber?: number;
}
