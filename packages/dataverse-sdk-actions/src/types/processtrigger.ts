import type { BooleanManagedProperty } from "./BooleanManagedProperty.js";

/**
 * processtrigger entity type
 */
export interface processtrigger {
  _createdby_value?: string;
  _createdonbehalfby_value?: string;
  _formid_value?: string;
  _modifiedby_value?: string;
  _modifiedonbehalfby_value?: string;
  _ownerid_value?: string;
  _processid_value?: string;
  componentstate?: number;
  controlname?: string;
  controltype?: number;
  createdon?: string;
  event?: string;
  iscustomizable?: BooleanManagedProperty;
  ismanaged?: boolean;
  methodid?: string;
  modifiedon?: string;
  overwritetime?: string;
  owningbusinessunit?: string;
  owninguser?: string;
  pipelinestage?: number;
  primaryentitytypecode?: string;
  processtriggerid?: string;
  processtriggeridunique?: string;
  scope?: number;
  solutionid?: string;
  versionnumber?: number;
}
