import type { BooleanManagedProperty } from "./BooleanManagedProperty.js";

/**
 * msdyn_aimodel entity type
 */
export interface msdyn_aimodel {
  statecode: number;
  timezoneruleversionnumber: number;
  importsequencenumber: number;
  modifiedon: string;
  msdyn_aimodelid: string;
  _owningbusinessunit_value: string;
  _createdby_value: string;
  versionnumber: number;
  msdyn_name: string;
  _owningteam_value: string;
  msdyn_sharewithorganizationoncreate: boolean;
  _msdyn_retrainworkflowid_value: string;
  _msdyn_templateid_value: string;
  statuscode: number;
  _owninguser_value: string;
  solutionid: string;
  componentstate: number;
  ismanaged: boolean;
  _msdyn_aimodelcatalog_value: string;
  _msdyn_activerunconfigurationid_value: string;
  _modifiedby_value: string;
  _modifiedonbehalfby_value: string;
  _createdonbehalfby_value: string;
  msdyn_aimodelidunique: string;
  msdyn_modelcreationcontext: string;
  overriddencreatedon: string;
  iscustomizable: BooleanManagedProperty;
  _msdyn_scheduleinferenceworkflowid_value: string;
  overwritetime: string;
  _ownerid_value: string;
  utcconversiontimezonecode: number;
  createdon: string;
  introducedversion: string;
}
