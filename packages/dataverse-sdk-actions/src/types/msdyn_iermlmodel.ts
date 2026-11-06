import type { BooleanManagedProperty } from "./BooleanManagedProperty.js";

/**
 * msdyn_iermlmodel entity type
 */
export interface msdyn_iermlmodel {
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
  msdyn_iermlmodelid?: string;
  msdyn_iermlmodelstatus?: number;
  msdyn_iermlmodeltrainingstatus?: number;
  msdyn_name?: string;
  msdyn_trainingconfiguration?: string;
  msdyn_uniquename?: string;
  msdyn_wizarddata?: string;
  overriddencreatedon?: string;
  overwritetime?: string;
  solutionid?: string;
  statecode?: number;
  statuscode?: number;
  timezoneruleversionnumber?: number;
  utcconversiontimezonecode?: number;
  versionnumber?: number;
}
