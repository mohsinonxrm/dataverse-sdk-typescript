import type { BooleanManagedProperty } from "./BooleanManagedProperty.js";

/**
 * managedidentity entity type
 */
export interface managedidentity {
  _ownerid_value?: string;
  componentstate?: number;
  applicationid?: string;
  _modifiedonbehalfby_value?: string;
  _createdby_value?: string;
  statuscode?: number;
  iscustomizable?: BooleanManagedProperty;
  overwritetime?: string;
  utcconversiontimezonecode?: number;
  managedidentityid?: string;
  componentidunique?: string;
  _keyvaultreferenceid_value?: string;
  versionnumber?: number;
  createdon?: string;
  tenantid?: string;
  statecode?: number;
  ismanaged?: boolean;
  _owninguser_value?: string;
  _owningbusinessunit_value?: string;
  identitytype?: number;
  name?: string;
  _createdonbehalfby_value?: string;
  clientsecret?: string;
  solutionid?: string;
  objectid?: string;
  _modifiedby_value?: string;
  _owningteam_value?: string;
  subjectscope?: number;
  overriddencreatedon?: string;
  importsequencenumber?: number;
  timezoneruleversionnumber?: number;
  credentialsource?: number;
  modifiedon?: string;
  version?: number;
}
