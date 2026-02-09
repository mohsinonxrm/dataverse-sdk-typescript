import type { BooleanManagedProperty } from "./BooleanManagedProperty.js";

/**
 * msdyn_ocsimltraining entity type
 */
export interface msdyn_ocsimltraining {
  statuscode: number;
  _modifiedby_value: string;
  versionnumber: number;
  msdyn_trainedon: string;
  componentidunique: string;
  _msdyn_publishaiconfiguration_value: string;
  _owninguser_value: string;
  msdyn_ocsimltrainingid: string;
  msdyn_publishedon: string;
  _msdyn_trainaiconfiguration_value: string;
  iscustomizable: BooleanManagedProperty;
  _owningteam_value: string;
  _createdby_value: string;
  msdyn_mltrainingstatus: number;
  componentstate: number;
  msdyn_trainingdatacount: number;
  timezoneruleversionnumber: number;
  statecode: number;
  msdyn_uniquename: string;
  _modifiedonbehalfby_value: string;
  _owningbusinessunit_value: string;
  _createdonbehalfby_value: string;
  _msdyn_ocskillidentmlmodelid_value: string;
  overwritetime: string;
  _ownerid_value: string;
  modifiedon: string;
  createdon: string;
  solutionid: string;
  ismanaged: boolean;
  overriddencreatedon: string;
  msdyn_errordetails: string;
  msdyn_name: string;
  importsequencenumber: number;
  utcconversiontimezonecode: number;
}
