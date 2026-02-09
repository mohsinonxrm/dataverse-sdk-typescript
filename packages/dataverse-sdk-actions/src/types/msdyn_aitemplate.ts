import type { BooleanManagedProperty } from "./BooleanManagedProperty.js";

/**
 * msdyn_aitemplate entity type
 */
export interface msdyn_aitemplate {
  _modifiedonbehalfby_value: string;
  _createdonbehalfby_value: string;
  solutionid: string;
  statuscode: number;
  overriddencreatedon: string;
  ismanaged: boolean;
  msdyn_uniquename: string;
  iscustomizable: BooleanManagedProperty;
  statecode: number;
  msdyn_trainingconfigschema: string;
  _owningbusinessunit_value: string;
  utcconversiontimezonecode: number;
  _ownerid_value: string;
  timezoneruleversionnumber: number;
  versionnumber: number;
  msdyn_istrainable: boolean;
  msdyn_rundataspecification: string;
  msdyn_databinding: string;
  msdyn_resourceinfo: string;
  msdyn_uxconfiguration: string;
  _modifiedby_value: string;
  msdyn_defaultrunschedulingoptions: string;
  _owningteam_value: string;
  overwritetime: string;
  msdyn_templateversion: number;
  _owninguser_value: string;
  msdyn_aitemplateidunique: string;
  componentstate: number;
  msdyn_modelaction: string;
  msdyn_aitemplateid: string;
  modifiedon: string;
  msdyn_trainingdataspecification: string;
  introducedversion: string;
  msdyn_runconfigschema: string;
  _createdby_value: string;
  createdon: string;
  importsequencenumber: number;
}
