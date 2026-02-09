import type { BooleanManagedProperty } from "./BooleanManagedProperty.js";

/**
 * flowmachinenetwork entity type
 */
export interface flowmachinenetwork {
  versionnumber: number;
  _credentialid_value: string;
  flowmachinenetworkid: string;
  description: string;
  createdon: string;
  overwritetime: string;
  _modifiedby_value: string;
  _owninguser_value: string;
  _createdonbehalfby_value: string;
  _domainusername_value: string;
  _domainpassword_value: string;
  iscustomizable: BooleanManagedProperty;
  timezoneruleversionnumber: number;
  _owningteam_value: string;
  organizationalunit: string;
  networkmetadata: string;
  componentstate: number;
  statecode: number;
  name: string;
  domainname: string;
  modifiedon: string;
  ismanaged: boolean;
  importsequencenumber: number;
  utcconversiontimezonecode: number;
  overriddencreatedon: string;
  subnet: string;
  statuserrormessage: string;
  statuscode: number;
  _ownerid_value: string;
  _modifiedonbehalfby_value: string;
  supportedscenario: number;
  type: number;
  componentidunique: string;
  provisioningstate: number;
  _owningbusinessunit_value: string;
  _createdby_value: string;
  solutionid: string;
}
