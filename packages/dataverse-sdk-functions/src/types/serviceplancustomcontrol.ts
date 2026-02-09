import type { BooleanManagedProperty } from "./BooleanManagedProperty.js";

/**
 * serviceplancustomcontrol entity type
 */
export interface serviceplancustomcontrol {
  customcontrolid: string;
  componentstate: number;
  modifiedon: string;
  versionnumber: number;
  componentidunique: string;
  _createdonbehalfby_value: string;
  iscustomizable: BooleanManagedProperty;
  _modifiedby_value: string;
  importsequencenumber: number;
  statecode: number;
  name: string;
  serviceplancustomcontrolid: string;
  featurecontrol: string;
  ismanaged: boolean;
  overwritetime: string;
  _createdby_value: string;
  timezoneruleversionnumber: number;
  serviceplanid: string;
  createdon: string;
  statuscode: number;
  solutionid: string;
  overriddencreatedon: string;
  _modifiedonbehalfby_value: string;
  utcconversiontimezonecode: number;
}
