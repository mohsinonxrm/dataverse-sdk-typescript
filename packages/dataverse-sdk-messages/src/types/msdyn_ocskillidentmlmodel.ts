import type { BooleanManagedProperty } from "./BooleanManagedProperty.js";

/**
 * msdyn_ocskillidentmlmodel entity type
 */
export interface msdyn_ocskillidentmlmodel {
  _createdby_value?: string;
  _createdonbehalfby_value?: string;
  _modifiedby_value?: string;
  _modifiedonbehalfby_value?: string;
  _msdyn_aimodelid_value?: string;
  _ownerid_value?: string;
  _owningbusinessunit_value?: string;
  _owningteam_value?: string;
  _owninguser_value?: string;
  componentidunique?: string;
  componentstate?: number;
  createdon?: string;
  importsequencenumber?: number;
  iscustomizable?: BooleanManagedProperty;
  ismanaged?: boolean;
  modifiedon?: string;
  msdyn_name?: string;
  msdyn_ocskillidentmlmodelid?: string;
  msdyn_ocskillidentmlmodelstatus?: number;
  msdyn_ocskillidentmlmodeltrainingstatus?: number;
  msdyn_trainingconfiguration?: string;
  msdyn_uniquename?: string;
  msdyn_wizzarddata?: string;
  overriddencreatedon?: string;
  overwritetime?: string;
  solutionid?: string;
  statecode?: number;
  statuscode?: number;
  timezoneruleversionnumber?: number;
  utcconversiontimezonecode?: number;
  versionnumber?: number;
}
