import type { BooleanManagedProperty } from "./BooleanManagedProperty.js";

/**
 * dvtablesearch entity type
 */
export interface dvtablesearch {
  _connectionreference_value?: string;
  _createdby_value?: string;
  _createdonbehalfby_value?: string;
  _knowledgesourceconsumerid_value?: string;
  _knowledgesourceprofileid_value?: string;
  _m365appmoduleid_value?: string;
  _modifiedby_value?: string;
  _modifiedonbehalfby_value?: string;
  _ownerid_value?: string;
  _owningbusinessunit_value?: string;
  _owningteam_value?: string;
  _owninguser_value?: string;
  appid?: string;
  appmoduleid?: string;
  appmoduleuniquename?: string;
  apptype?: string;
  componentidunique?: string;
  componentstate?: number;
  createdon?: string;
  description?: string;
  dvtablesearchid?: string;
  importsequencenumber?: number;
  iscustomizable?: BooleanManagedProperty;
  ismanaged?: boolean;
  knowledgeconfig?: string;
  m365appmoduleidsecondary?: string;
  modifiedon?: string;
  name?: string;
  overriddencreatedon?: string;
  overwritetime?: string;
  searchtype?: number;
  solutionid?: string;
  source?: string;
  statecode?: number;
  statuscode?: number;
  timezoneruleversionnumber?: number;
  utcconversiontimezonecode?: number;
  versionnumber?: number;
}
