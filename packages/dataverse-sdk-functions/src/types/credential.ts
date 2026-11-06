import type { BooleanManagedProperty } from "./BooleanManagedProperty.js";

/**
 * credential entity type
 */
export interface credential {
  _certificate_value?: string;
  _connectionreference_value?: string;
  _createdby_value?: string;
  _createdonbehalfby_value?: string;
  _cyberarkobject_value?: string;
  _cyberarksafe_value?: string;
  _cyberarkusername_value?: string;
  _defaultcredential_value?: string;
  _modifiedby_value?: string;
  _modifiedonbehalfby_value?: string;
  _ownerid_value?: string;
  _owningbusinessunit_value?: string;
  _owningteam_value?: string;
  _owninguser_value?: string;
  _password_value?: string;
  _username_value?: string;
  componentidunique?: string;
  componentstate?: number;
  connectiontype?: number;
  createdon?: string;
  credentialid?: string;
  credentials?: string;
  credentialtype?: number;
  cyberarkapplicationid?: string;
  description?: string;
  groupmapping?: string;
  importsequencenumber?: number;
  iscustomizable?: BooleanManagedProperty;
  ismanaged?: boolean;
  logincontext?: string;
  modifiedon?: string;
  name?: string;
  overriddencreatedon?: string;
  overwritetime?: string;
  solutionid?: string;
  statecode?: number;
  statuscode?: number;
  timezoneruleversionnumber?: number;
  usagetype?: string;
  utcconversiontimezonecode?: number;
  versionnumber?: number;
}
