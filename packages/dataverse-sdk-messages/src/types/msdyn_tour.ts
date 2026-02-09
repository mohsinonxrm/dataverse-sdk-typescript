import type { BooleanManagedProperty } from "./BooleanManagedProperty.js";

/**
 * msdyn_tour entity type
 */
export interface msdyn_tour {
  _createdby_value: string;
  solutionid: string;
  statuscode: number;
  ismanaged: boolean;
  timezoneruleversionnumber: number;
  msdyn_path: string;
  modifiedon: string;
  iscustomizable: BooleanManagedProperty;
  createdon: string;
  versionnumber: number;
  _createdonbehalfby_value: string;
  utcconversiontimezonecode: number;
  _modifiedonbehalfby_value: string;
  statecode: number;
  overwritetime: string;
  msdyn_displayname: string;
  componentidunique: string;
  importsequencenumber: number;
  componentstate: number;
  _organizationid_value: string;
  msdyn_tourid: string;
  _modifiedby_value: string;
  msdyn_tourdefinition: string;
  msdyn_labelsresource: string;
  overriddencreatedon: string;
}
