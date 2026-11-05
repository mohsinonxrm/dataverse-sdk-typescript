import type { BooleanManagedProperty } from "./BooleanManagedProperty.js";

/**
 * msdyn_aitestcasedocument entity type
 */
export interface msdyn_aitestcasedocument {
  msdyn_aitestcasedocumentid?: string;
  overriddencreatedon?: string;
  _owningbusinessunit_value?: string;
  componentidunique?: string;
  msdyn_name?: string;
  statuscode?: number;
  msdyn_inputfile?: string;
  _msdyn_aitestcaseinputid_value?: string;
  _createdby_value?: string;
  modifiedon?: string;
  statecode?: number;
  overwritetime?: string;
  _owningteam_value?: string;
  componentstate?: number;
  msdyn_inputfile_name?: string;
  _ownerid_value?: string;
  importsequencenumber?: number;
  msdyn_inputid?: string;
  timezoneruleversionnumber?: number;
  _modifiedby_value?: string;
  _modifiedonbehalfby_value?: string;
  versionnumber?: number;
  _owninguser_value?: string;
  utcconversiontimezonecode?: number;
  createdon?: string;
  _createdonbehalfby_value?: string;
  solutionid?: string;
  msdyn_description?: string;
  iscustomizable?: BooleanManagedProperty;
  ismanaged?: boolean;
}
