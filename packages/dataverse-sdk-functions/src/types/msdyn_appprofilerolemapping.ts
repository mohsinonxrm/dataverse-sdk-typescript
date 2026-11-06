import type { BooleanManagedProperty } from "./BooleanManagedProperty.js";

/**
 * msdyn_appprofilerolemapping entity type
 */
export interface msdyn_appprofilerolemapping {
  _owningteam_value?: string;
  overwritetime?: string;
  _createdonbehalfby_value?: string;
  ismanaged?: boolean;
  statecode?: number;
  modifiedon?: string;
  utcconversiontimezonecode?: number;
  versionnumber?: number;
  _msdyn_securityroleid_value?: string;
  _owninguser_value?: string;
  solutionid?: string;
  componentstate?: number;
  statuscode?: number;
  _modifiedonbehalfby_value?: string;
  importsequencenumber?: number;
  msdyn_uniquename?: string;
  msdyn_appprofilerolemappingid?: string;
  componentidunique?: string;
  iscustomizable?: BooleanManagedProperty;
  timezoneruleversionnumber?: number;
  overriddencreatedon?: string;
  _ownerid_value?: string;
  msdyn_name?: string;
  _modifiedby_value?: string;
  createdon?: string;
  _createdby_value?: string;
  _owningbusinessunit_value?: string;
  _msdyn_appprofileid_value?: string;
}
