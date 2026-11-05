import type { BooleanManagedProperty } from "./BooleanManagedProperty.js";

/**
 * msdyn_iermlmodel entity type
 */
export interface msdyn_iermlmodel {
  msdyn_iermlmodelstatus?: number;
  _owningteam_value?: string;
  _createdby_value?: string;
  componentstate?: number;
  _modifiedby_value?: string;
  msdyn_iermlmodelid?: string;
  solutionid?: string;
  msdyn_uniquename?: string;
  versionnumber?: number;
  _createdonbehalfby_value?: string;
  _ownerid_value?: string;
  msdyn_wizarddata?: string;
  importsequencenumber?: number;
  iscustomizable?: BooleanManagedProperty;
  msdyn_iermlmodeltrainingstatus?: number;
  msdyn_name?: string;
  createdon?: string;
  ismanaged?: boolean;
  timezoneruleversionnumber?: number;
  componentidunique?: string;
  _modifiedonbehalfby_value?: string;
  _owninguser_value?: string;
  statuscode?: number;
  modifiedon?: string;
  overriddencreatedon?: string;
  utcconversiontimezonecode?: number;
  statecode?: number;
  msdyn_trainingconfiguration?: string;
  _owningbusinessunit_value?: string;
  overwritetime?: string;
  _msdyn_aimodelid_value?: string;
}
