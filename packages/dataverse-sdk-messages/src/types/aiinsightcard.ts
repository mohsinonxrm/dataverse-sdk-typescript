import type { BooleanManagedProperty } from "./BooleanManagedProperty.js";

/**
 * aiinsightcard entity type
 */
export interface aiinsightcard {
  _aiskillid_value?: string;
  _createdby_value?: string;
  _createdonbehalfby_value?: string;
  _entityid_value?: string;
  _modifiedby_value?: string;
  _modifiedonbehalfby_value?: string;
  _ownerid_value?: string;
  _owningbusinessunit_value?: string;
  _owningteam_value?: string;
  _owninguser_value?: string;
  aiinsightcardid?: string;
  componentidunique?: string;
  componentstate?: number;
  controlconfig?: string;
  createdon?: string;
  description?: string;
  importsequencenumber?: number;
  iscustomizable?: BooleanManagedProperty;
  ismanaged?: boolean;
  modifiedon?: string;
  name?: string;
  overriddencreatedon?: string;
  overwritetime?: string;
  solutionid?: string;
  statecode?: number;
  statuscode?: number;
  surface?: string;
  timezoneruleversionnumber?: number;
  uniquename?: string;
  utcconversiontimezonecode?: number;
  versionnumber?: number;
}
