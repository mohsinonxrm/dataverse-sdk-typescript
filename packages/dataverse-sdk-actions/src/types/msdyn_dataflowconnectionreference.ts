import type { BooleanManagedProperty } from "./BooleanManagedProperty.js";

/**
 * msdyn_dataflowconnectionreference entity type
 */
export interface msdyn_dataflowconnectionreference {
  statuscode: number;
  _createdby_value: string;
  msdyn_dataflowconnectiondetails: string;
  _msdyn_connectionreference_value: string;
  overriddencreatedon: string;
  _modifiedonbehalfby_value: string;
  componentstate: number;
  importsequencenumber: number;
  _owningbusinessunit_value: string;
  _msdyn_dataflow_value: string;
  msdyn_dataflowconnectionreferenceid: string;
  msdyn_name: string;
  createdon: string;
  _ownerid_value: string;
  msdyn_connectionreferencedescription: string;
  _modifiedby_value: string;
  modifiedon: string;
  utcconversiontimezonecode: number;
  componentidunique: string;
  versionnumber: number;
  _owningteam_value: string;
  timezoneruleversionnumber: number;
  _createdonbehalfby_value: string;
  iscustomizable: BooleanManagedProperty;
  ismanaged: boolean;
  solutionid: string;
  _owninguser_value: string;
  statecode: number;
  overwritetime: string;
}
