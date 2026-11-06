import type { BooleanManagedProperty } from "./BooleanManagedProperty.js";

/**
 * duplicaterulecondition entity type
 */
export interface duplicaterulecondition {
  _createdby_value?: string;
  _createdonbehalfby_value?: string;
  _modifiedby_value?: string;
  _modifiedonbehalfby_value?: string;
  _ownerid_value?: string;
  _regardingobjectid_value?: string;
  baseattributename?: string;
  componentidunique?: string;
  componentstate?: number;
  createdon?: string;
  duplicateruleconditionid?: string;
  ignoreblankvalues?: boolean;
  iscustomizable?: BooleanManagedProperty;
  ismanaged?: boolean;
  matchingattributename?: string;
  modifiedon?: string;
  operatorcode?: number;
  operatorparam?: number;
  overwritetime?: string;
  owningbusinessunit?: string;
  owninguser?: string;
  solutionid?: string;
  uniquerulename?: string;
}
