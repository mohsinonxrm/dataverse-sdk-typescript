import type { BooleanManagedProperty } from "./BooleanManagedProperty.js";

/**
 * msdyn_capacityprofile entity type
 */
export interface msdyn_capacityprofile {
  componentstate?: number;
  _modifiedby_value?: string;
  msdyn_defaultmaxunits?: number;
  _createdonbehalfby_value?: string;
  timezoneruleversionnumber?: number;
  overriddencreatedon?: string;
  iscustomizable?: BooleanManagedProperty;
  msdyn_blockassignment?: boolean;
  ismanaged?: boolean;
  statecode?: number;
  componentidunique?: string;
  _createdby_value?: string;
  statuscode?: number;
  _owningbusinessunit_value?: string;
  _owninguser_value?: string;
  versionnumber?: number;
  utcconversiontimezonecode?: number;
  _modifiedonbehalfby_value?: string;
  msdyn_resetduration?: number;
  msdyn_name?: string;
  modifiedon?: string;
  _ownerid_value?: string;
  overwritetime?: string;
  _owningteam_value?: string;
  solutionid?: string;
  msdyn_uniquename?: string;
  createdon?: string;
  importsequencenumber?: number;
  msdyn_capacityprofileid?: string;
}
