import type { BooleanManagedProperty } from "./BooleanManagedProperty.js";

/**
 * msdyn_knowledgemanagementsetting entity type
 */
export interface msdyn_knowledgemanagementsetting {
  overwritetime: string;
  msdyn_isautosuggestionsenabled: boolean;
  componentstate: number;
  _ownerid_value: string;
  _createdonbehalfby_value: string;
  _owninguser_value: string;
  utcconversiontimezonecode: number;
  _createdby_value: string;
  msdyn_entityname: string;
  timezoneruleversionnumber: number;
  msdyn_actionlist: string;
  msdyn_uniquename: string;
  modifiedon: string;
  msdyn_defaultemailrecipient: string;
  statuscode: number;
  solutionid: string;
  _owningbusinessunit_value: string;
  importsequencenumber: number;
  overriddencreatedon: string;
  statecode: number;
  _owningteam_value: string;
  msdyn_showcontextualactions: boolean;
  msdyn_status: number;
  msdyn_knowledgemanagementsettingid: string;
  componentidunique: string;
  ismanaged: boolean;
  iscustomizable: BooleanManagedProperty;
  _modifiedonbehalfby_value: string;
  versionnumber: number;
  _modifiedby_value: string;
  createdon: string;
  msdyn_autosuggestionfield: string;
}
