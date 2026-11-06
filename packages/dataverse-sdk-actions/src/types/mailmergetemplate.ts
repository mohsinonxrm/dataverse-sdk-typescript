import type { BooleanManagedProperty } from "./BooleanManagedProperty.js";

/**
 * mailmergetemplate entity type
 */
export interface mailmergetemplate {
  _createdby_value?: string;
  _createdonbehalfby_value?: string;
  _modifiedby_value?: string;
  _modifiedonbehalfby_value?: string;
  _ownerid_value?: string;
  _owningbusinessunit_value?: string;
  _owningteam_value?: string;
  _owninguser_value?: string;
  _transactioncurrencyid_value?: string;
  body?: string;
  componentstate?: number;
  createdon?: string;
  defaultfilter?: string;
  description?: string;
  documentformat?: number;
  exchangerate?: number;
  filename?: string;
  filesize?: number;
  introducedversion?: string;
  iscustomizable?: BooleanManagedProperty;
  ismanaged?: boolean;
  ispersonal?: boolean;
  languagecode?: number;
  mailmergetemplateid?: string;
  mailmergetemplateidunique?: string;
  mailmergetype?: number;
  mimetype?: string;
  modifiedon?: string;
  name?: string;
  overwritetime?: string;
  parameterxml?: string;
  solutionid?: string;
  statecode?: number;
  statuscode?: number;
  templatetypecode?: string;
  timezoneruleversionnumber?: number;
  utcconversiontimezonecode?: number;
  versionnumber?: number;
}
