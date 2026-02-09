import type { BooleanManagedProperty } from "./BooleanManagedProperty.js";

/**
 * msdyn_decisionruleset entity type
 */
export interface msdyn_decisionruleset {
  _msdyn_aibmodelid_value: string;
  _msdyn_inputcontractid_value: string;
  modifiedon: string;
  _createdonbehalfby_value: string;
  componentidunique: string;
  msdyn_rulesetdefinition: string;
  msdyn_refreshinputdata: boolean;
  overriddencreatedon: string;
  ismanaged: boolean;
  msdyn_rulesettype: number;
  _modifiedby_value: string;
  utcconversiontimezonecode: number;
  _owningbusinessunit_value: string;
  msdyn_description: string;
  statecode: number;
  overwritetime: string;
  msdyn_dataversecomponenttype: number;
  _createdby_value: string;
  msdyn_uniquename: string;
  createdon: string;
  _owninguser_value: string;
  msdyn_decisionrulesetid: string;
  _ownerid_value: string;
  _msdyn_outputcontractid_value: string;
  componentstate: number;
  msdyn_name: string;
  msdyn_persistoutputdata: boolean;
  timezoneruleversionnumber: number;
  iscustomizable: BooleanManagedProperty;
  msdyn_fetchxml: string;
  versionnumber: number;
  msdyn_mlmodeltype: number;
  statuscode: number;
  _owningteam_value: string;
  solutionid: string;
  _modifiedonbehalfby_value: string;
  importsequencenumber: number;
  msdyn_isinputcollection: boolean;
  msdyn_authoringmode: number;
}
