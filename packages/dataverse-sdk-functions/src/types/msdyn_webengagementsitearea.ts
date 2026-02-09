import type { BooleanManagedProperty } from "./BooleanManagedProperty.js";

/**
 * msdyn_webengagementsitearea entity type
 */
export interface msdyn_webengagementsitearea {
  utcconversiontimezonecode: number;
  timezoneruleversionnumber: number;
  _msdyn_webengagementrulesetrevision_value: string;
  componentidunique: string;
  statuscode: number;
  componentstate: number;
  versionnumber: number;
  _owningteam_value: string;
  _createdby_value: string;
  msdyn_name: string;
  _owninguser_value: string;
  modifiedon: string;
  _owningbusinessunit_value: string;
  ismanaged: boolean;
  _modifiedby_value: string;
  overwritetime: string;
  importsequencenumber: number;
  _createdonbehalfby_value: string;
  _modifiedonbehalfby_value: string;
  msdyn_regularexpression: string;
  statecode: number;
  createdon: string;
  iscustomizable: BooleanManagedProperty;
  overriddencreatedon: string;
  solutionid: string;
  msdyn_webengagementsiteareaid: string;
  _ownerid_value: string;
}
