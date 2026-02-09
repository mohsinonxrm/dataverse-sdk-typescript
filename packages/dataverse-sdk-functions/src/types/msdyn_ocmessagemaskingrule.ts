import type { BooleanManagedProperty } from "./BooleanManagedProperty.js";

/**
 * msdyn_ocmessagemaskingrule entity type
 */
export interface msdyn_ocmessagemaskingrule {
  timezoneruleversionnumber: number;
  _msdyn_oclanguageid_value: string;
  _owninguser_value: string;
  importsequencenumber: number;
  ismanaged: boolean;
  msdyn_name: string;
  _ownerid_value: string;
  _createdonbehalfby_value: string;
  componentstate: number;
  iscustomizable: BooleanManagedProperty;
  versionnumber: number;
  modifiedon: string;
  overriddencreatedon: string;
  msdyn_redactedmessagetext: string;
  statecode: number;
  componentidunique: string;
  _modifiedonbehalfby_value: string;
  _owningteam_value: string;
  _createdby_value: string;
  utcconversiontimezonecode: number;
  _modifiedby_value: string;
  msdyn_ocmessagemaskingruleid: string;
  _msdyn_liveworkstreamid_value: string;
  createdon: string;
  _owningbusinessunit_value: string;
  statuscode: number;
  solutionid: string;
  overwritetime: string;
}
