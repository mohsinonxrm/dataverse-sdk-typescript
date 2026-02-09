import type { BooleanManagedProperty } from "./BooleanManagedProperty.js";

/**
 * msdyn_panetoolconfiguration entity type
 */
export interface msdyn_panetoolconfiguration {
  ismanaged: boolean;
  msdyn_uniquename: string;
  versionnumber: number;
  msdyn_isconfigurable: boolean;
  _organizationid_value: string;
  msdyn_controlname: string;
  _modifiedonbehalfby_value: string;
  solutionid: string;
  modifiedon: string;
  msdyn_category: number;
  msdyn_learnmorelink: string;
  _modifiedby_value: string;
  msdyn_type: number;
  componentidunique: string;
  statuscode: number;
  overwritetime: string;
  importsequencenumber: number;
  statecode: number;
  utcconversiontimezonecode: number;
  _msdyn_icon_value: string;
  _createdby_value: string;
  _createdonbehalfby_value: string;
  overriddencreatedon: string;
  msdyn_isglobal: boolean;
  msdyn_toolconfigurationentity: string;
  msdyn_panetoolconfigurationid: string;
  msdyn_data: string;
  iscustomizable: BooleanManagedProperty;
  componentstate: number;
  createdon: string;
  msdyn_name: string;
  timezoneruleversionnumber: number;
  msdyn_description: string;
  msdyn_defaulticon: string;
}
