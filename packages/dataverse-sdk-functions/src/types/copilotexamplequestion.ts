import type { BooleanManagedProperty } from "./BooleanManagedProperty.js";

/**
 * copilotexamplequestion entity type
 */
export interface copilotexamplequestion {
  _createdby_value?: string;
  _createdonbehalfby_value?: string;
  _modifiedby_value?: string;
  _modifiedonbehalfby_value?: string;
  _organizationid_value?: string;
  _owningbusinessunit_value?: string;
  _skillid_value?: string;
  appcontext?: string;
  comment?: string;
  componentidunique?: string;
  componentstate?: number;
  copilotexamplequestionid?: string;
  createdon?: string;
  customdimension?: string;
  customfield?: string;
  dynamicknowledge?: string;
  entityscope?: string;
  entityscopecolumn?: string;
  importsequencenumber?: number;
  iscustomizable?: BooleanManagedProperty;
  ismanaged?: boolean;
  knowledge?: string;
  knowledgetype?: number;
  modifiedon?: string;
  overriddencreatedon?: string;
  overwritetime?: string;
  question?: string;
  rephrase?: string;
  skill?: string;
  solutionid?: string;
  sqlcorrectness?: number;
  standardsql?: string;
  statecode?: number;
  statuscode?: number;
  timezoneruleversionnumber?: number;
  utcconversiontimezonecode?: number;
  versionnumber?: number;
}
