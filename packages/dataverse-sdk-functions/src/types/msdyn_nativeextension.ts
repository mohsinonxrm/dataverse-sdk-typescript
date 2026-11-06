import type { BooleanManagedProperty } from "./BooleanManagedProperty.js";

/**
 * msdyn_nativeextension entity type
 */
export interface msdyn_nativeextension {
  _createdby_value?: string;
  _createdonbehalfby_value?: string;
  _modifiedby_value?: string;
  _modifiedonbehalfby_value?: string;
  _msdyn_mobileappid_value?: string;
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
  msdyn_nativeextensionid?: string;
  msdyn_package?: string;
  msdyn_package_name?: string;
  msdyn_targetplatform?: number;
  name?: string;
  overwritetime?: string;
  solutionid?: string;
  versionnumber?: number;
}
