import type { BooleanManagedProperty } from "./BooleanManagedProperty.js";

/**
 * msdyn_casetopicsetting entity type
 */
export interface msdyn_casetopicsetting {
  _organizationid_value: string;
  msdyn_attributeinuse: string;
  overwritetime: string;
  msdyn_topicautomationenabled: boolean;
  msdyn_selectionlocation: number;
  msdyn_delimiters: string;
  versionnumber: number;
  statuscode: number;
  msdyn_name: string;
  timezoneruleversionnumber: number;
  iscustomizable: BooleanManagedProperty;
  msdyn_enabled: boolean;
  msdyn_casetopicsettingid: string;
  _createdby_value: string;
  componentstate: number;
  componentidunique: string;
  solutionid: string;
  overriddencreatedon: string;
  statecode: number;
  _modifiedonbehalfby_value: string;
  ismanaged: boolean;
  modifiedon: string;
  utcconversiontimezonecode: number;
  _modifiedby_value: string;
  createdon: string;
  _createdonbehalfby_value: string;
  importsequencenumber: number;
  msdyn_ignorelist: string;
}
