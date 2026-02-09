import type { BooleanManagedProperty } from "./BooleanManagedProperty.js";

/**
 * msdyn_dataflow_datalakefolder entity type
 */
export interface msdyn_dataflow_datalakefolder {
  timezoneruleversionnumber: number;
  dataflowid: string;
  overwritetime: string;
  _createdonbehalfby_value: string;
  _ownerid_value: string;
  ismanaged: boolean;
  _msdyn_datalakefolder_value: string;
  _owningbusinessunit_value: string;
  _owninguser_value: string;
  _modifiedonbehalfby_value: string;
  componentidunique: string;
  overriddencreatedon: string;
  iscustomizable: BooleanManagedProperty;
  _modifiedby_value: string;
  datalakefolderid: string;
  componentstate: number;
  importsequencenumber: number;
  msdyn_dataflow_datalakefolder: string;
  statecode: number;
  modifiedon: string;
  _owningteam_value: string;
  _createdby_value: string;
  createdon: string;
  statuscode: number;
  versionnumber: number;
  msdyn_dataflow_datalakefolderid: string;
  solutionid: string;
  originaldataflowid: string;
  utcconversiontimezonecode: number;
}
