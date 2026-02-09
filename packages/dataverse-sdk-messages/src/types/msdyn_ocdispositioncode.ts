import type { BooleanManagedProperty } from "./BooleanManagedProperty.js";

/**
 * msdyn_ocdispositioncode entity type
 */
export interface msdyn_ocdispositioncode {
  _owninguser_value: string;
  _owningbusinessunit_value: string;
  timezoneruleversionnumber: number;
  msdyn_ocdispositioncodeid: string;
  utcconversiontimezonecode: number;
  overriddencreatedon: string;
  _msdyn_dispositioncodecategoryid_value: string;
  msdyn_dispositioncodevalue: string;
  iscustomizable: BooleanManagedProperty;
  _ownerid_value: string;
  msdyn_appliestoallworkstreams: boolean;
  modifiedon: string;
  _msdyn_languageid_value: string;
  componentidunique: string;
  _owningteam_value: string;
  _createdby_value: string;
  _createdonbehalfby_value: string;
  _modifiedonbehalfby_value: string;
  importsequencenumber: number;
  ismanaged: boolean;
  statecode: number;
  statuscode: number;
  _modifiedby_value: string;
  componentstate: number;
  overwritetime: string;
  createdon: string;
  msdyn_name: string;
  solutionid: string;
  versionnumber: number;
}
