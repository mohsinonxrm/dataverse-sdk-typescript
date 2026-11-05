import type { BooleanManagedProperty } from "./BooleanManagedProperty.js";

/**
 * dvtablesearch entity type
 */
export interface dvtablesearch {
  statuscode?: number;
  ismanaged?: boolean;
  _connectionreference_value?: string;
  utcconversiontimezonecode?: number;
  searchtype?: number;
  statecode?: number;
  _createdby_value?: string;
  overriddencreatedon?: string;
  versionnumber?: number;
  _modifiedby_value?: string;
  solutionid?: string;
  appmoduleid?: string;
  _ownerid_value?: string;
  _modifiedonbehalfby_value?: string;
  _knowledgesourceprofileid_value?: string;
  componentstate?: number;
  _owningteam_value?: string;
  timezoneruleversionnumber?: number;
  name?: string;
  dvtablesearchid?: string;
  iscustomizable?: BooleanManagedProperty;
  modifiedon?: string;
  _owninguser_value?: string;
  _owningbusinessunit_value?: string;
  overwritetime?: string;
  appid?: string;
  apptype?: string;
  componentidunique?: string;
  importsequencenumber?: number;
  _knowledgesourceconsumerid_value?: string;
  knowledgeconfig?: string;
  createdon?: string;
  _createdonbehalfby_value?: string;
  appmoduleuniquename?: string;
}
