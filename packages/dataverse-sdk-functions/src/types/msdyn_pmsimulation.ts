import type { BooleanManagedProperty } from "./BooleanManagedProperty.js";

/**
 * msdyn_pmsimulation entity type
 */
export interface msdyn_pmsimulation {
  utcconversiontimezonecode: number;
  _createdby_value: string;
  versionnumber: number;
  _owningteam_value: string;
  modifiedon: string;
  overwritetime: string;
  createdon: string;
  msdyn_start: string;
  msdyn_pmsimulationid: string;
  _owningbusinessunit_value: string;
  _createdonbehalfby_value: string;
  _modifiedby_value: string;
  msdyn_result: string;
  _msdyn_pmviewid_value: string;
  timezoneruleversionnumber: number;
  msdyn_setting: string;
  _modifiedonbehalfby_value: string;
  componentstate: number;
  statecode: number;
  msdyn_name: string;
  _msdyn_pminferredtaskid_value: string;
  _ownerid_value: string;
  _owninguser_value: string;
  ismanaged: boolean;
  componentidunique: string;
  solutionid: string;
  msdyn_psesimulationid: string;
  iscustomizable: BooleanManagedProperty;
  statuscode: number;
  msdyn_version: number;
  msdyn_end: string;
  msdyn_state: number;
  overriddencreatedon: string;
  msdyn_description: string;
  msdyn_generatelog: boolean;
  importsequencenumber: number;
}
