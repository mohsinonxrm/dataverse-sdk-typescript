import type { BooleanManagedProperty } from "./BooleanManagedProperty.js";

/**
 * msdyn_salesforcestructuredqnaconfig entity type
 */
export interface msdyn_salesforcestructuredqnaconfig {
  importsequencenumber?: number;
  msdyn_salesforceinstanceurl?: string;
  _ownerid_value?: string;
  statecode?: number;
  versionnumber?: number;
  msdyn_powerappsconnectionid?: string;
  componentstate?: number;
  timezoneruleversionnumber?: number;
  modifiedon?: string;
  statuscode?: number;
  solutionid?: string;
  ismanaged?: boolean;
  utcconversiontimezonecode?: number;
  _owningbusinessunit_value?: string;
  uniquename?: string;
  componentidunique?: string;
  msdyn_salesforcestructuredqnaconfigid?: string;
  overwritetime?: string;
  overriddencreatedon?: string;
  createdon?: string;
  _owningteam_value?: string;
  _createdonbehalfby_value?: string;
  name?: string;
  _owninguser_value?: string;
  iscustomizable?: BooleanManagedProperty;
  _modifiedby_value?: string;
  _modifiedonbehalfby_value?: string;
  _createdby_value?: string;
}
