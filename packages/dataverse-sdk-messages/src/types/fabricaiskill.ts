import type { BooleanManagedProperty } from "./BooleanManagedProperty.js";

/**
 * fabricaiskill entity type
 */
export interface fabricaiskill {
  _aipluginoperationid_value?: string;
  _createdby_value?: string;
  _createdonbehalfby_value?: string;
  _customapiid_value?: string;
  _modifiedby_value?: string;
  _modifiedonbehalfby_value?: string;
  _ownerid_value?: string;
  _owningbusinessunit_value?: string;
  _owningteam_value?: string;
  _owninguser_value?: string;
  componentidunique?: string;
  componentstate?: number;
  context?: string;
  createdon?: string;
  description?: string;
  fabricaiskillid?: string;
  importsequencenumber?: number;
  iscustomizable?: BooleanManagedProperty;
  ismanaged?: boolean;
  keywords?: string;
  modifiedon?: string;
  name?: string;
  overriddencreatedon?: string;
  overwritetime?: string;
  solutionid?: string;
  statecode?: number;
  statuscode?: number;
  timezoneruleversionnumber?: number;
  uri?: string;
  utcconversiontimezonecode?: number;
  versionnumber?: number;
  workspaceid?: string;
}
