import type { BooleanManagedProperty } from './BooleanManagedProperty.js';

/**
 * flowmachinenetwork entity type
 */
export interface flowmachinenetwork {
  _createdby_value?: string;
  _createdonbehalfby_value?: string;
  _credentialid_value?: string;
  _domainpassword_value?: string;
  _domainusername_value?: string;
  _modifiedby_value?: string;
  _modifiedonbehalfby_value?: string;
  _ownerid_value?: string;
  _owningbusinessunit_value?: string;
  _owningteam_value?: string;
  _owninguser_value?: string;
  componentidunique?: string;
  componentstate?: number;
  createdon?: string;
  description?: string;
  domainname?: string;
  flowmachinenetworkid?: string;
  importsequencenumber?: number;
  iscustomizable?: BooleanManagedProperty;
  ismanaged?: boolean;
  modifiedon?: string;
  name?: string;
  networkmetadata?: string;
  organizationalunit?: string;
  overriddencreatedon?: string;
  overwritetime?: string;
  provisioningstate?: number;
  solutionid?: string;
  statecode?: number;
  statuscode?: number;
  statuserrormessage?: string;
  subnet?: string;
  supportedscenario?: number;
  timezoneruleversionnumber?: number;
  type?: number;
  utcconversiontimezonecode?: number;
  versionnumber?: number;
}
