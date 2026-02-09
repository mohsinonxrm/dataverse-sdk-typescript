import type { BooleanManagedProperty } from "./BooleanManagedProperty.js";

/**
 * msdyn_occhannelstateconfiguration entity type
 */
export interface msdyn_occhannelstateconfiguration {
  _modifiedonbehalfby_value: string;
  utcconversiontimezonecode: number;
  msdyn_occhannelstateconfigurationid: string;
  msdyn_name: string;
  msdyn_ocliveworkitemstate: number;
  statecode: number;
  componentidunique: string;
  componentstate: number;
  timezoneruleversionnumber: number;
  createdon: string;
  msdyn_showconfirmationonsessionclose: boolean;
  solutionid: string;
  statuscode: number;
  overriddencreatedon: string;
  _modifiedby_value: string;
  _createdby_value: string;
  importsequencenumber: number;
  iscustomizable: BooleanManagedProperty;
  modifiedon: string;
  _organizationid_value: string;
  _createdonbehalfby_value: string;
  ismanaged: boolean;
  overwritetime: string;
  _msdyn_occhannelconfigurationid_value: string;
  msdyn_autocloseliveworkitemafter: number;
  versionnumber: number;
}
