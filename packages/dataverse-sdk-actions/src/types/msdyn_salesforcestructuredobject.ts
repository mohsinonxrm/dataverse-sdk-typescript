import type { BooleanManagedProperty } from "./BooleanManagedProperty.js";

/**
 * msdyn_salesforcestructuredobject entity type
 */
export interface msdyn_salesforcestructuredobject {
  msdyn_salesforcestructuredobjectid?: string;
  timezoneruleversionnumber?: number;
  _createdonbehalfby_value?: string;
  _ownerid_value?: string;
  overwritetime?: string;
  name?: string;
  _msdyn_salesforcestructuredqnaconfigid_value?: string;
  versionnumber?: number;
  modifiedon?: string;
  solutionid?: string;
  utcconversiontimezonecode?: number;
  iscustomizable?: BooleanManagedProperty;
  importsequencenumber?: number;
  _modifiedby_value?: string;
  _owningteam_value?: string;
  componentidunique?: string;
  msdyn_salesforcestructuredobjectname?: string;
  statecode?: number;
  statuscode?: number;
  _owningbusinessunit_value?: string;
  createdon?: string;
  ismanaged?: boolean;
  overriddencreatedon?: string;
  _modifiedonbehalfby_value?: string;
  componentstate?: number;
  _createdby_value?: string;
  _owninguser_value?: string;
}
