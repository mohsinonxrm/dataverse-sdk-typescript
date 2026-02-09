import type { BooleanManagedProperty } from "./BooleanManagedProperty.js";

/**
 * msdyn_productivityactioninputparameter entity type
 */
export interface msdyn_productivityactioninputparameter {
  timezoneruleversionnumber: number;
  msdyn_uniquename: string;
  modifiedon: string;
  utcconversiontimezonecode: number;
  _msdyn_actiontemplateinputparameterid_value: string;
  msdyn_name: string;
  componentidunique: string;
  statecode: number;
  iscustomizable: BooleanManagedProperty;
  _ownerid_value: string;
  versionnumber: number;
  _owningteam_value: string;
  msdyn_parametertype: boolean;
  _owningbusinessunit_value: string;
  createdon: string;
  msdyn_productivityactioninputparameterid: string;
  importsequencenumber: number;
  _createdby_value: string;
  _owninguser_value: string;
  overwritetime: string;
  overriddencreatedon: string;
  _modifiedonbehalfby_value: string;
  statuscode: number;
  solutionid: string;
  msdyn_visibility: string;
  ismanaged: boolean;
  componentstate: number;
  _createdonbehalfby_value: string;
  _modifiedby_value: string;
}
