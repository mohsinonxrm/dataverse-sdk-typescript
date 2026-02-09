import type { BooleanManagedProperty } from "./BooleanManagedProperty.js";

/**
 * msdyn_analyticsadminsettings entity type
 */
export interface msdyn_analyticsadminsettings {
  _modifiedonbehalfby_value: string;
  componentstate: number;
  statecode: number;
  msdyn_enableanalytics: boolean;
  _owninguser_value: string;
  importsequencenumber: number;
  msdyn_reportgroup: string;
  msdyn_name: string;
  versionnumber: number;
  timezoneruleversionnumber: number;
  _modifiedby_value: string;
  _owningteam_value: string;
  solutionid: string;
  _ownerid_value: string;
  _createdonbehalfby_value: string;
  ismanaged: boolean;
  overriddencreatedon: string;
  modifiedon: string;
  utcconversiontimezonecode: number;
  iscustomizable: BooleanManagedProperty;
  statuscode: number;
  componentidunique: string;
  _createdby_value: string;
  msdyn_analyticsadminsettingsid: string;
  _owningbusinessunit_value: string;
  createdon: string;
  overwritetime: string;
}
