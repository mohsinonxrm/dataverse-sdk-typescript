import type { BooleanManagedProperty } from "./BooleanManagedProperty.js";

/**
 * msdyn_aitemplate entity type
 */
export interface msdyn_aitemplate {
  _createdby_value?: string;
  _createdonbehalfby_value?: string;
  _modifiedby_value?: string;
  _modifiedonbehalfby_value?: string;
  _ownerid_value?: string;
  _owningbusinessunit_value?: string;
  _owningteam_value?: string;
  _owninguser_value?: string;
  componentstate?: number;
  createdon?: string;
  importsequencenumber?: number;
  introducedversion?: string;
  iscustomizable?: BooleanManagedProperty;
  ismanaged?: boolean;
  modifiedon?: string;
  msdyn_aitemplateid?: string;
  msdyn_aitemplateidunique?: string;
  msdyn_databinding?: string;
  msdyn_defaultrunschedulingoptions?: string;
  msdyn_istrainable?: boolean;
  msdyn_modelaction?: string;
  msdyn_resourceinfo?: string;
  msdyn_runconfigschema?: string;
  msdyn_rundataspecification?: string;
  msdyn_templateversion?: number;
  msdyn_trainingconfigschema?: string;
  msdyn_trainingdataspecification?: string;
  msdyn_uniquename?: string;
  msdyn_uxconfiguration?: string;
  overriddencreatedon?: string;
  overwritetime?: string;
  solutionid?: string;
  statecode?: number;
  statuscode?: number;
  timezoneruleversionnumber?: number;
  utcconversiontimezonecode?: number;
  versionnumber?: number;
}
