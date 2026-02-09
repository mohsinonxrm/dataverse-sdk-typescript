import type { BooleanManagedProperty } from "./BooleanManagedProperty.js";

/**
 * serviceplan entity type
 */
export interface serviceplan {
  _modifiedby_value: string;
  componentidunique: string;
  overriddencreatedon: string;
  iscustomizable: BooleanManagedProperty;
  timezoneruleversionnumber: number;
  serviceplanid: string;
  importsequencenumber: number;
  _modifiedonbehalfby_value: string;
  ismanaged: boolean;
  solutionid: string;
  name: string;
  modifiedon: string;
  componentstate: number;
  displayname: string;
  utcconversiontimezonecode: number;
  moreinfourl: string;
  _createdby_value: string;
  createdon: string;
  _createdonbehalfby_value: string;
  overwritetime: string;
  accessmode: number;
  versionnumber: number;
}
