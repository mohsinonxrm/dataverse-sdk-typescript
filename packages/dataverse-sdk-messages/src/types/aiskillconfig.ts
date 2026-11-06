import type { BooleanManagedProperty } from "./BooleanManagedProperty.js";

/**
 * aiskillconfig entity type
 */
export interface aiskillconfig {
  _aimodel_value?: string;
  _attribute_value?: string;
  _createdby_value?: string;
  _createdonbehalfby_value?: string;
  _entity_value?: string;
  _generationapi_value?: string;
  _modifiedby_value?: string;
  _modifiedonbehalfby_value?: string;
  _ownerid_value?: string;
  _owningbusinessunit_value?: string;
  _owningteam_value?: string;
  _owninguser_value?: string;
  _sdkmessageid_value?: string;
  aiskill?: string;
  aiskillconfigid?: string;
  componentidunique?: string;
  componentstate?: number;
  config?: string;
  createdon?: string;
  description?: string;
  importsequencenumber?: number;
  iscustomizable?: BooleanManagedProperty;
  ismanaged?: boolean;
  modifiedon?: string;
  overriddencreatedon?: string;
  overwritetime?: string;
  scope?: number;
  solutionid?: string;
  statecode?: number;
  statuscode?: number;
  timezoneruleversionnumber?: number;
  uniquename?: string;
  utcconversiontimezonecode?: number;
  versionnumber?: number;
}
