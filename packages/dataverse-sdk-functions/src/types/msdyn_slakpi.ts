import type { BooleanManagedProperty } from "./BooleanManagedProperty.js";

/**
 * msdyn_slakpi entity type
 */
export interface msdyn_slakpi {
  statecode?: number;
  msdyn_slakpiid?: string;
  _owninguser_value?: string;
  msdyn_description?: string;
  msdyn_pauseconfigurationxml?: string;
  versionnumber?: number;
  msdyn_entityname?: string;
  overriddencreatedon?: string;
  ismanaged?: boolean;
  _modifiedby_value?: string;
  msdyn_kpifield?: string;
  componentidunique?: string;
  _owningteam_value?: string;
  msdyn_workflowinfo?: string;
  createdon?: string;
  componentstate?: number;
  msdyn_applicablefromfield?: string;
  _createdonbehalfby_value?: string;
  timezoneruleversionnumber?: number;
  solutionid?: string;
  overwritetime?: string;
  _modifiedonbehalfby_value?: string;
  msdyn_advancedpauseconfiguration?: boolean;
  iscustomizable?: BooleanManagedProperty;
  importsequencenumber?: number;
  statuscode?: number;
  modifiedon?: string;
  _owningbusinessunit_value?: string;
  msdyn_entitydisplayname?: string;
  msdyn_name?: string;
  utcconversiontimezonecode?: number;
  msdyn_applicablefromdisplayname?: string;
  _createdby_value?: string;
  _ownerid_value?: string;
}
