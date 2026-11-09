import type { BooleanManagedProperty } from "./BooleanManagedProperty.js";

/**
 * aipluginconversationstarter entity type
 */
export interface aipluginconversationstarter {
  _createdby_value?: string;
  _createdonbehalfby_value?: string;
  _modifiedby_value?: string;
  _modifiedonbehalfby_value?: string;
  _ownerid_value?: string;
  _owningbusinessunit_value?: string;
  _owningteam_value?: string;
  _owninguser_value?: string;
  aipluginconversationstarterid?: string;
  componentidunique?: string;
  componentstate?: number;
  content?: string;
  createdon?: string;
  importsequencenumber?: number;
  iscustomizable?: BooleanManagedProperty;
  ismanaged?: boolean;
  modifiedon?: string;
  overriddencreatedon?: string;
  overwritetime?: string;
  solutionid?: string;
  statecode?: number;
  statuscode?: number;
  timezoneruleversionnumber?: number;
  title?: string;
  utcconversiontimezonecode?: number;
  versionnumber?: number;
}
