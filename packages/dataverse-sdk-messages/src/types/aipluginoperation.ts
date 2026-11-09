import type { BooleanManagedProperty } from "./BooleanManagedProperty.js";

/**
 * aipluginoperation entity type
 */
export interface aipluginoperation {
  _aiplugin_value?: string;
  _aipluginoperationresponsetemplate_value?: string;
  _createdby_value?: string;
  _createdonbehalfby_value?: string;
  _customapi_value?: string;
  _dvfilesearch_value?: string;
  _dvtablesearch_value?: string;
  _entity_value?: string;
  _modifiedby_value?: string;
  _modifiedonbehalfby_value?: string;
  _msdyn_aimodel_value?: string;
  _ownerid_value?: string;
  _owningbusinessunit_value?: string;
  _owningteam_value?: string;
  _owninguser_value?: string;
  _workflow_value?: string;
  aipluginoperationexportkey?: string;
  aipluginoperationid?: string;
  componentidunique?: string;
  componentstate?: number;
  createdon?: string;
  description?: string;
  importsequencenumber?: number;
  isconsequential?: boolean;
  iscustomizable?: BooleanManagedProperty;
  ismanaged?: boolean;
  modifiedon?: string;
  name?: string;
  operationid?: string;
  overriddencreatedon?: string;
  overwritetime?: string;
  referencedoperationid?: string;
  responsesemantics?: string;
  solutionid?: string;
  statecode?: number;
  statuscode?: number;
  timezoneruleversionnumber?: number;
  utcconversiontimezonecode?: number;
  versionnumber?: number;
}
