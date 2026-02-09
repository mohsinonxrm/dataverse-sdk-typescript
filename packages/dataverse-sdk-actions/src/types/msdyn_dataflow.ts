import type { BooleanManagedProperty } from "./BooleanManagedProperty.js";

/**
 * msdyn_dataflow entity type
 */
export interface msdyn_dataflow {
  msdyn_emailsettings: string;
  msdyn_refreshhistory: string;
  msdyn_name: string;
  msdyn_destinationadls: string;
  iscustomizable: BooleanManagedProperty;
  _ownerid_value: string;
  _modifiedby_value: string;
  timezoneruleversionnumber: number;
  _owninguser_value: string;
  _owningbusinessunit_value: string;
  ismanaged: boolean;
  createdon: string;
  overwritetime: string;
  _modifiedonbehalfby_value: string;
  msdyn_description: string;
  _createdonbehalfby_value: string;
  msdyn_mashupdocument: string;
  utcconversiontimezonecode: number;
  msdyn_originaldataflowid: string;
  overriddencreatedon: string;
  _createdby_value: string;
  importsequencenumber: number;
  msdyn_refreshsettings: string;
  statuscode: number;
  msdyn_mashupsettings: string;
  statecode: number;
  componentstate: number;
  componentidunique: string;
  msdyn_gatewayobjectid: string;
  modifiedon: string;
  msdyn_internalversion: string;
  _owningteam_value: string;
  versionnumber: number;
  msdyn_dataflowid: string;
  solutionid: string;
}
