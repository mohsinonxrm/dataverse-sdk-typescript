import type { BooleanManagedProperty } from "./BooleanManagedProperty.js";

/**
 * processtrigger entity type
 */
export interface processtrigger {
  processtriggerid?: string;
  _formid_value?: string;
  methodid?: string;
  _ownerid_value?: string;
  scope?: number;
  componentstate?: number;
  _modifiedonbehalfby_value?: string;
  owninguser?: string;
  pipelinestage?: number;
  processtriggeridunique?: string;
  _processid_value?: string;
  primaryentitytypecode?: string;
  modifiedon?: string;
  _createdonbehalfby_value?: string;
  iscustomizable?: BooleanManagedProperty;
  ismanaged?: boolean;
  owningbusinessunit?: string;
  controltype?: number;
  versionnumber?: number;
  event?: string;
  controlname?: string;
  overwritetime?: string;
  solutionid?: string;
  _modifiedby_value?: string;
  createdon?: string;
  _createdby_value?: string;
}
