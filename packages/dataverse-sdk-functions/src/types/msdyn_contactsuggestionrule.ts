import type { BooleanManagedProperty } from "./BooleanManagedProperty.js";

/**
 * msdyn_contactsuggestionrule entity type
 */
export interface msdyn_contactsuggestionrule {
  overriddencreatedon: string;
  _msdyn_contactsuggestionrulesetid_value: string;
  msdyn_descriptiontemplateplaceholders: string;
  msdyn_customactioninputs: string;
  overwritetime: string;
  solutionid: string;
  modifiedon: string;
  componentstate: number;
  msdyn_ruletype: number;
  _owninguser_value: string;
  msdyn_name: string;
  msdyn_customactionname: string;
  msdyn_contactsuggestionruleid: string;
  ismanaged: boolean;
  statuscode: number;
  msdyn_fetchxml: string;
  utcconversiontimezonecode: number;
  importsequencenumber: number;
  msdyn_descriptiontemplate: string;
  timezoneruleversionnumber: number;
  _owningteam_value: string;
  msdyn_top: number;
  msdyn_pathtotarget: string;
  _createdonbehalfby_value: string;
  _owningbusinessunit_value: string;
  versionnumber: number;
  createdon: string;
  statecode: number;
  _modifiedonbehalfby_value: string;
  msdyn_rank: number;
  componentidunique: string;
  _ownerid_value: string;
  msdyn_uniquename: string;
  _modifiedby_value: string;
  iscustomizable: BooleanManagedProperty;
  _createdby_value: string;
}
