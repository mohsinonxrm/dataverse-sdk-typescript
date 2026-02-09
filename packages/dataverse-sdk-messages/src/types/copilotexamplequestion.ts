import type { BooleanManagedProperty } from "./BooleanManagedProperty.js";

/**
 * copilotexamplequestion entity type
 */
export interface copilotexamplequestion {
  knowledgetype: number;
  _createdonbehalfby_value: string;
  copilotexamplequestionid: string;
  customfield: string;
  modifiedon: string;
  appcontext: string;
  iscustomizable: BooleanManagedProperty;
  componentidunique: string;
  comment: string;
  ismanaged: boolean;
  knowledge: string;
  _modifiedonbehalfby_value: string;
  createdon: string;
  overriddencreatedon: string;
  timezoneruleversionnumber: number;
  standardsql: string;
  rephrase: string;
  question: string;
  entityscope: string;
  versionnumber: number;
  importsequencenumber: number;
  dynamicknowledge: string;
  _modifiedby_value: string;
  _createdby_value: string;
  solutionid: string;
  statecode: number;
  componentstate: number;
  entityscopecolumn: string;
  utcconversiontimezonecode: number;
  overwritetime: string;
  customdimension: string;
  _skillid_value: string;
  skill: string;
  _owningbusinessunit_value: string;
  _organizationid_value: string;
  sqlcorrectness: number;
  statuscode: number;
}
