import type { BooleanManagedProperty } from "./BooleanManagedProperty.js";

/**
 * msdyn_templateparameter entity type
 */
export interface msdyn_templateparameter {
  _ownerid_value: string;
  solutionid: string;
  msdyn_value: string;
  overriddencreatedon: string;
  utcconversiontimezonecode: number;
  _modifiedonbehalfby_value: string;
  modifiedon: string;
  msdyn_templateparameterid: string;
  componentstate: number;
  overwritetime: string;
  _owningbusinessunit_value: string;
  iscustomizable: BooleanManagedProperty;
  _createdby_value: string;
  msdyn_name: string;
  importsequencenumber: number;
  versionnumber: number;
  _createdonbehalfby_value: string;
  createdon: string;
  statuscode: number;
  msdyn_uniquename: string;
  _msdyn_applicationtabtemplateid_value: string;
  timezoneruleversionnumber: number;
  ismanaged: boolean;
  _modifiedby_value: string;
  componentidunique: string;
  _owningteam_value: string;
  statecode: number;
  _owninguser_value: string;
}
