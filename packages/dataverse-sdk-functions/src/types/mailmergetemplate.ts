import type { BooleanManagedProperty } from "./BooleanManagedProperty.js";

/**
 * mailmergetemplate entity type
 */
export interface mailmergetemplate {
  timezoneruleversionnumber: number;
  componentstate: number;
  languagecode: number;
  _modifiedonbehalfby_value: string;
  _owningbusinessunit_value: string;
  name: string;
  _transactioncurrencyid_value: string;
  ismanaged: boolean;
  filesize: number;
  mailmergetemplateidunique: string;
  _owningteam_value: string;
  statuscode: number;
  versionnumber: number;
  mimetype: string;
  mailmergetype: number;
  iscustomizable: BooleanManagedProperty;
  _owninguser_value: string;
  _modifiedby_value: string;
  _createdonbehalfby_value: string;
  body: string;
  modifiedon: string;
  filename: string;
  documentformat: number;
  overwritetime: string;
  statecode: number;
  solutionid: string;
  exchangerate: number;
  introducedversion: string;
  ispersonal: boolean;
  description: string;
  mailmergetemplateid: string;
  utcconversiontimezonecode: number;
  createdon: string;
  defaultfilter: string;
  _ownerid_value: string;
  _createdby_value: string;
  templatetypecode: string;
  parameterxml: string;
}
