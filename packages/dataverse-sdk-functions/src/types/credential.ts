import type { BooleanManagedProperty } from "./BooleanManagedProperty.js";

/**
 * credential entity type
 */
export interface credential {
  utcconversiontimezonecode?: number;
  _owningbusinessunit_value?: string;
  name?: string;
  modifiedon?: string;
  _cyberarkusername_value?: string;
  _cyberarksafe_value?: string;
  statuscode?: number;
  createdon?: string;
  timezoneruleversionnumber?: number;
  _createdby_value?: string;
  _ownerid_value?: string;
  _password_value?: string;
  _modifiedonbehalfby_value?: string;
  connectiontype?: number;
  groupmapping?: string;
  credentialid?: string;
  _createdonbehalfby_value?: string;
  _cyberarkobject_value?: string;
  importsequencenumber?: number;
  componentidunique?: string;
  ismanaged?: boolean;
  versionnumber?: number;
  solutionid?: string;
  _connectionreference_value?: string;
  _owninguser_value?: string;
  componentstate?: number;
  _defaultcredential_value?: string;
  logincontext?: string;
  usagetype?: string;
  overwritetime?: string;
  _certificate_value?: string;
  _modifiedby_value?: string;
  iscustomizable?: BooleanManagedProperty;
  credentialtype?: number;
  description?: string;
  _owningteam_value?: string;
  overriddencreatedon?: string;
  _username_value?: string;
  credentials?: string;
  cyberarkapplicationid?: string;
  statecode?: number;
}
