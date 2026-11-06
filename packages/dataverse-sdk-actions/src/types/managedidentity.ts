import type { BooleanManagedProperty } from "./BooleanManagedProperty.js";

/**
 * managedidentity entity type
 */
export interface managedidentity {
  _createdby_value?: string;
  _createdonbehalfby_value?: string;
  _keyvaultreferenceid_value?: string;
  _modifiedby_value?: string;
  _modifiedonbehalfby_value?: string;
  _ownerid_value?: string;
  _owningbusinessunit_value?: string;
  _owningteam_value?: string;
  _owninguser_value?: string;
  applicationid?: string;
  clientsecret?: string;
  componentidunique?: string;
  componentstate?: number;
  createdon?: string;
  credentialsource?: number;
  identitytype?: number;
  importsequencenumber?: number;
  iscustomizable?: BooleanManagedProperty;
  ismanaged?: boolean;
  managedidentityid?: string;
  modifiedon?: string;
  name?: string;
  objectid?: string;
  overriddencreatedon?: string;
  overwritetime?: string;
  parentagentblueprintid?: string;
  parentagentidentityid?: string;
  solutionid?: string;
  statecode?: number;
  statuscode?: number;
  subjectscope?: number;
  tenantid?: string;
  timezoneruleversionnumber?: number;
  utcconversiontimezonecode?: number;
  version?: number;
  versionnumber?: number;
}
