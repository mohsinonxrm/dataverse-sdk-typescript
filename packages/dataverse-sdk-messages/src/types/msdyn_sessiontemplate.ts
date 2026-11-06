import type { BooleanManagedProperty } from "./BooleanManagedProperty.js";

/**
 * msdyn_sessiontemplate entity type
 */
export interface msdyn_sessiontemplate {
  _createdby_value?: string;
  _createdonbehalfby_value?: string;
  _modifiedby_value?: string;
  _modifiedonbehalfby_value?: string;
  _msdyn_anchortab_value?: string;
  _msdyn_sessionicon_value?: string;
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
  msdyn_description?: string;
  msdyn_enablebuildexpression?: boolean;
  msdyn_enabletitlesync?: boolean;
  msdyn_entity?: string;
  msdyn_expressiondata?: string;
  msdyn_name?: string;
  msdyn_panelstate?: number;
  msdyn_sessiontemplateid?: string;
  msdyn_sessiontype?: number;
  msdyn_title?: string;
  msdyn_type?: boolean;
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
