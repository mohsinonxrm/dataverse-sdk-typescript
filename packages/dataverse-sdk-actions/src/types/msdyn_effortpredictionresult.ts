import type { BooleanManagedProperty } from "./BooleanManagedProperty.js";

/**
 * msdyn_effortpredictionresult entity type
 */
export interface msdyn_effortpredictionresult {
  utcconversiontimezonecode: number;
  statuscode: number;
  _ownerid_value: string;
  msdyn_predictedeffort: number;
  versionnumber: number;
  componentstate: number;
  overwritetime: string;
  _createdby_value: string;
  importsequencenumber: number;
  msdyn_effortconfidencescore: number;
  msdyn_effortpredictionresultid: string;
  _msdyn_liveworkitemid_value: string;
  ismanaged: boolean;
  _modifiedby_value: string;
  componentidunique: string;
  _msdyn_aimodelid_value: string;
  statecode: number;
  _owninguser_value: string;
  msdyn_name: string;
  _owningteam_value: string;
  overriddencreatedon: string;
  iscustomizable: BooleanManagedProperty;
  timezoneruleversionnumber: number;
  solutionid: string;
  _createdonbehalfby_value: string;
  _modifiedonbehalfby_value: string;
  modifiedon: string;
  createdon: string;
  _owningbusinessunit_value: string;
}
