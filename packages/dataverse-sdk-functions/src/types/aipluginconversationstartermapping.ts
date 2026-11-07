import type { BooleanManagedProperty } from "./BooleanManagedProperty.js";

/**
 * aipluginconversationstartermapping entity type
 */
export interface aipluginconversationstartermapping {
  _aiplugin_value?: string;
  _aipluginconversationstarter_value?: string;
  _createdby_value?: string;
  _createdonbehalfby_value?: string;
  _modifiedby_value?: string;
  _modifiedonbehalfby_value?: string;
  _ownerid_value?: string;
  _owningbusinessunit_value?: string;
  _owningteam_value?: string;
  _owninguser_value?: string;
  aipluginconversationstartermappingid?: string;
  componentidunique?: string;
  componentstate?: number;
  createdon?: string;
  displayorder?: number;
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
  timezoneruleversionnumber?: number;
  utcconversiontimezonecode?: number;
  versionnumber?: number;
}
