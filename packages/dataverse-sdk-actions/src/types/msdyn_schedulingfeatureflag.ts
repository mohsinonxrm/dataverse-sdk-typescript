import type { BooleanManagedProperty } from "./BooleanManagedProperty.js";

/**
 * msdyn_schedulingfeatureflag entity type
 */
export interface msdyn_schedulingfeatureflag {
  _owningbusinessunit_value: string;
  solutionid: string;
  _createdby_value: string;
  _modifiedby_value: string;
  msdyn_enabled: number;
  msdyn_description: string;
  msdyn_name: string;
  _modifiedonbehalfby_value: string;
  importsequencenumber: number;
  componentstate: number;
  _ownerid_value: string;
  modifiedon: string;
  iscustomizable: BooleanManagedProperty;
  utcconversiontimezonecode: number;
  componentidunique: string;
  msdyn_value: string;
  _createdonbehalfby_value: string;
  _owningteam_value: string;
  createdon: string;
  msdyn_schedulingfeatureflagid: string;
  overriddencreatedon: string;
  statecode: number;
  versionnumber: number;
  _owninguser_value: string;
  overwritetime: string;
  ismanaged: boolean;
  timezoneruleversionnumber: number;
  statuscode: number;
}
