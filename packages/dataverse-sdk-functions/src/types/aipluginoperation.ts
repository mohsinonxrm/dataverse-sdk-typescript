import type { BooleanManagedProperty } from "./BooleanManagedProperty.js";

/**
 * aipluginoperation entity type
 */
export interface aipluginoperation {
  _owningbusinessunit_value?: string;
  _dvtablesearch_value?: string;
  aipluginoperationid?: string;
  componentidunique?: string;
  createdon?: string;
  overriddencreatedon?: string;
  _entity_value?: string;
  aipluginoperationexportkey?: string;
  _customapi_value?: string;
  isconsequential?: boolean;
  name?: string;
  componentstate?: number;
  responsesemantics?: string;
  _dvfilesearch_value?: string;
  _createdby_value?: string;
  _aipluginoperationresponsetemplate_value?: string;
  versionnumber?: number;
  utcconversiontimezonecode?: number;
  _aiplugin_value?: string;
  solutionid?: string;
  _workflow_value?: string;
  statuscode?: number;
  _ownerid_value?: string;
  iscustomizable?: BooleanManagedProperty;
  referencedoperationid?: string;
  _modifiedby_value?: string;
  description?: string;
  timezoneruleversionnumber?: number;
  _msdyn_aimodel_value?: string;
  overwritetime?: string;
  ismanaged?: boolean;
  importsequencenumber?: number;
  statecode?: number;
  _createdonbehalfby_value?: string;
  _owninguser_value?: string;
  _modifiedonbehalfby_value?: string;
  _owningteam_value?: string;
  modifiedon?: string;
  operationid?: string;
}
