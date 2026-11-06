import type { BooleanManagedProperty } from "./BooleanManagedProperty.js";

/**
 * msdyn_slakpi entity type
 */
export interface msdyn_slakpi {
  _createdby_value?: string;
  _createdonbehalfby_value?: string;
  _modifiedby_value?: string;
  _modifiedonbehalfby_value?: string;
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
  msdyn_advancedpauseconfiguration?: boolean;
  msdyn_applicablefromdisplayname?: string;
  msdyn_applicablefromfield?: string;
  msdyn_description?: string;
  msdyn_entitydisplayname?: string;
  msdyn_entityname?: string;
  msdyn_kpifield?: string;
  msdyn_name?: string;
  msdyn_pauseconfigurationxml?: string;
  msdyn_slakpiid?: string;
  msdyn_workflowinfo?: string;
  overriddencreatedon?: string;
  overwritetime?: string;
  solutionid?: string;
  statecode?: number;
  statuscode?: number;
  timezoneruleversionnumber?: number;
  utcconversiontimezonecode?: number;
  versionnumber?: number;
}
