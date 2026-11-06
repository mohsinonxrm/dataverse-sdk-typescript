import type { BooleanManagedProperty } from "./BooleanManagedProperty.js";

/**
 * botcomponent entity type
 */
export interface botcomponent {
  _createdby_value?: string;
  _createdonbehalfby_value?: string;
  _modifiedby_value?: string;
  _modifiedonbehalfby_value?: string;
  _ownerid_value?: string;
  _owningbusinessunit_value?: string;
  _owningteam_value?: string;
  _owninguser_value?: string;
  _parentbotcomponentcollectionid_value?: string;
  _parentbotcomponentid_value?: string;
  _parentbotid_value?: string;
  accentcolor?: string;
  botcomponentid?: string;
  canmodifystate?: boolean;
  category?: string;
  componentidunique?: string;
  componentstate?: number;
  componenttype?: number;
  content?: string;
  createdon?: string;
  data?: string;
  dependencies?: string;
  description?: string;
  filedata?: string;
  filedata_name?: string;
  helplink?: string;
  iconurl?: string;
  importsequencenumber?: number;
  iscustomizable?: BooleanManagedProperty;
  ismanaged?: boolean;
  language?: number;
  modifiedon?: string;
  name?: string;
  overriddencreatedon?: string;
  overwritetime?: string;
  reusepolicy?: number;
  schemaname?: string;
  solutionid?: string;
  statecode?: number;
  statuscode?: number;
  timezoneruleversionnumber?: number;
  utcconversiontimezonecode?: number;
  versionnumber?: number;
}
