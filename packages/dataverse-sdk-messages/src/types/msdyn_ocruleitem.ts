import type { BooleanManagedProperty } from "./BooleanManagedProperty.js";

/**
 * msdyn_ocruleitem entity type
 */
export interface msdyn_ocruleitem {
  statuscode: number;
  _owningbusinessunit_value: string;
  _modifiedby_value: string;
  _createdby_value: string;
  componentstate: number;
  solutionid: string;
  msdyn_action: string;
  msdyn_expression: string;
  _msdyn_userassignid_value: string;
  iscustomizable: BooleanManagedProperty;
  description: string;
  _createdonbehalfby_value: string;
  statecode: number;
  ismanaged: boolean;
  _ownerid_value: string;
  modifiedon: string;
  msdyn_condition: string;
  msdyn_ocruleitemid: string;
  utcconversiontimezonecode: number;
  _msdyn_liveworkstream_value: string;
  componentidunique: string;
  _msdyn_cdsqueueassignid_value: string;
  _owningteam_value: string;
  timezoneruleversionnumber: number;
  msdyn_priority: string;
  createdon: string;
  _msdyn_queueassignid_value: string;
  msdyn_assignedto: number;
  overwritetime: string;
  overriddencreatedon: string;
  versionnumber: number;
  importsequencenumber: number;
  _modifiedonbehalfby_value: string;
  msdyn_name: string;
  msdyn_rulejson: string;
  _owninguser_value: string;
}
