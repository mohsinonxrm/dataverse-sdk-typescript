import type { BooleanManagedProperty } from "./BooleanManagedProperty.js";

/**
 * msdyn_knowledgesearchfilter entity type
 */
export interface msdyn_knowledgesearchfilter {
  msdyn_entityname: string;
  msdyn_enabled: boolean;
  ismanaged: boolean;
  _modifiedby_value: string;
  versionnumber: number;
  overriddencreatedon: string;
  msdyn_name: string;
  solutionid: string;
  importsequencenumber: number;
  _ownerid_value: string;
  _owningteam_value: string;
  msdyn_knowledgesearchfilterid: string;
  modifiedon: string;
  utcconversiontimezonecode: number;
  msdyn_uniquename: string;
  componentidunique: string;
  msdyn_orderid: number;
  iscustomizable: BooleanManagedProperty;
  msdyn_iscustom: boolean;
  timezoneruleversionnumber: number;
  _createdonbehalfby_value: string;
  msdyn_attributename: string;
  overwritetime: string;
  createdon: string;
  componentstate: number;
  _modifiedonbehalfby_value: string;
  _owningbusinessunit_value: string;
  msdyn_selectedvalues: string;
  statuscode: number;
  _owninguser_value: string;
  _createdby_value: string;
  statecode: number;
  msdyn_defaultvalues: string;
}
