import type { BooleanManagedProperty } from "./BooleanManagedProperty.js";

/**
 * msdyn_pmtemplate entity type
 */
export interface msdyn_pmtemplate {
  ismanaged: boolean;
  msdyn_configuration: string;
  _ownerid_value: string;
  msdyn_subcategory: string;
  _modifiedby_value: string;
  _owningbusinessunit_value: string;
  msdyn_name: string;
  msdyn_type: string;
  _createdby_value: string;
  msdyn_templateversion: string;
  createdon: string;
  _modifiedonbehalfby_value: string;
  msdyn_iconname: string;
  utcconversiontimezonecode: number;
  msdyn_uniquename: string;
  msdyn_description: string;
  modifiedon: string;
  msdyn_templategroupid: string;
  timezoneruleversionnumber: number;
  msdyn_mashupscript: string;
  statecode: number;
  versionnumber: number;
  solutionid: string;
  iscustomizable: BooleanManagedProperty;
  componentstate: number;
  msdyn_locale: string;
  msdyn_pmtemplateid: string;
  _owningteam_value: string;
  msdyn_author: string;
  overriddencreatedon: string;
  msdyn_category: string;
  _createdonbehalfby_value: string;
  msdyn_isprivatetemplate: boolean;
  overwritetime: string;
  msdyn_icon: string;
  importsequencenumber: number;
  statuscode: number;
  _owninguser_value: string;
  componentidunique: string;
}
