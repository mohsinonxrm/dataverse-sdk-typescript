import type { BooleanManagedProperty } from "./BooleanManagedProperty.js";

/**
 * msdyn_occommunicationprovidersettingentry entity type
 */
export interface msdyn_occommunicationprovidersettingentry {
  msdyn_occommunicationprovidersettingentryid: string;
  _modifiedonbehalfby_value: string;
  msdyn_value: string;
  statecode: number;
  _owningbusinessunit_value: string;
  iscustomizable: BooleanManagedProperty;
  versionnumber: number;
  _createdonbehalfby_value: string;
  solutionid: string;
  _msdyn_communicationprovidersettingentid_value: string;
  timezoneruleversionnumber: number;
  overwritetime: string;
  createdon: string;
  componentidunique: string;
  _owninguser_value: string;
  _createdby_value: string;
  _modifiedby_value: string;
  _ownerid_value: string;
  ismanaged: boolean;
  importsequencenumber: number;
  msdyn_name: string;
  statuscode: number;
  overriddencreatedon: string;
  componentstate: number;
  _owningteam_value: string;
  utcconversiontimezonecode: number;
  msdyn_key: string;
  modifiedon: string;
}
