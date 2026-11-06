import type { BooleanManagedProperty } from "./BooleanManagedProperty.js";

/**
 * msdyn_ocsimltraining entity type
 */
export interface msdyn_ocsimltraining {
  _createdby_value?: string;
  _createdonbehalfby_value?: string;
  _modifiedby_value?: string;
  _modifiedonbehalfby_value?: string;
  _msdyn_ocskillidentmlmodelid_value?: string;
  _msdyn_publishaiconfiguration_value?: string;
  _msdyn_trainaiconfiguration_value?: string;
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
  msdyn_errordetails?: string;
  msdyn_mltrainingstatus?: number;
  msdyn_name?: string;
  msdyn_ocsimltrainingid?: string;
  msdyn_publishedon?: string;
  msdyn_trainedon?: string;
  msdyn_trainingdatacount?: number;
  msdyn_uniquename?: string;
  overriddencreatedon?: string;
  overwritetime?: string;
  solutionid?: string;
  statecode?: number;
  statuscode?: number;
  timezoneruleversionnumber?: number;
  utcconversiontimezonecode?: number;
  versionnumber?: number;
}
