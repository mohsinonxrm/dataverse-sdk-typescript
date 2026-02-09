import type { BooleanManagedProperty } from "./BooleanManagedProperty.js";

/**
 * msdyn_liveconversationcountercondition entity type
 */
export interface msdyn_liveconversationcountercondition {
  msdyn_value: number;
  _msdyn_workstreamid_value: string;
  _modifiedby_value: string;
  _createdonbehalfby_value: string;
  modifiedon: string;
  overriddencreatedon: string;
  solutionid: string;
  iscustomizable: BooleanManagedProperty;
  msdyn_urgencylevel: number;
  utcconversiontimezonecode: number;
  componentstate: number;
  _createdby_value: string;
  statecode: number;
  msdyn_name: string;
  versionnumber: number;
  componentidunique: string;
  _ownerid_value: string;
  _owninguser_value: string;
  msdyn_units: number;
  _owningteam_value: string;
  msdyn_liveconversationcounterconditionid: string;
  createdon: string;
  _owningbusinessunit_value: string;
  timezoneruleversionnumber: number;
  _modifiedonbehalfby_value: string;
  overwritetime: string;
  statuscode: number;
  ismanaged: boolean;
  importsequencenumber: number;
}
