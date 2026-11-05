import type { BooleanManagedProperty } from "./BooleanManagedProperty.js";

/**
 * msdyn_aitestcaseinput entity type
 */
export interface msdyn_aitestcaseinput {
  timezoneruleversionnumber?: number;
  _ownerid_value?: string;
  utcconversiontimezonecode?: number;
  createdon?: string;
  _owninguser_value?: string;
  statuscode?: number;
  _createdonbehalfby_value?: string;
  statecode?: number;
  _modifiedby_value?: string;
  msdyn_aitestcaseinputid?: string;
  iscustomizable?: BooleanManagedProperty;
  importsequencenumber?: number;
  ismanaged?: boolean;
  _owningteam_value?: string;
  versionnumber?: number;
  overriddencreatedon?: string;
  componentstate?: number;
  msdyn_inputdata?: string;
  overwritetime?: string;
  modifiedon?: string;
  _modifiedonbehalfby_value?: string;
  _owningbusinessunit_value?: string;
  msdyn_name?: string;
  msdyn_description?: string;
  componentidunique?: string;
  _msdyn_aitestcaseid_value?: string;
  _createdby_value?: string;
  solutionid?: string;
}
