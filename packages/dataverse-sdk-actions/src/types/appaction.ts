import type { BooleanManagedProperty } from "./BooleanManagedProperty.js";

/**
 * appaction entity type
 */
export interface appaction {
  _appmoduleid_value?: string;
  _contextentity_value?: string;
  _createdby_value?: string;
  _createdonbehalfby_value?: string;
  _iconwebresourceid_value?: string;
  _modifiedby_value?: string;
  _modifiedonbehalfby_value?: string;
  _onclickeventformulacomponentlibraryid_value?: string;
  _onclickeventjavascriptwebresourceid_value?: string;
  _organizationid_value?: string;
  _parentappactionid_value?: string;
  _visibilityformulacomponentlibraryid_value?: string;
  appactionid?: string;
  buttonaccessibilitytext?: string;
  buttonlabeltext?: string;
  buttonsequencepriority?: number;
  buttontooltipdescription?: string;
  buttontooltiptitle?: string;
  clienttype?: string;
  componentidunique?: string;
  componentstate?: number;
  context?: number;
  contextvalue?: string;
  createdon?: string;
  fonticon?: string;
  grouptitle?: string;
  hidden?: boolean;
  importsequencenumber?: number;
  iscustomizable?: BooleanManagedProperty;
  isdisabled?: boolean;
  isgrouptitlehidden?: boolean;
  ismanaged?: boolean;
  location?: number;
  modifiedon?: string;
  name?: string;
  onclickeventformulacomponentlibrary?: string;
  onclickeventformulacomponentname?: string;
  onclickeventformulafunctionname?: string;
  onclickeventjavascriptfunctionname?: string;
  onclickeventjavascriptparameters?: string;
  onclickeventtype?: number;
  origin?: number;
  overriddencreatedon?: string;
  overwritetime?: string;
  sequence?: number;
  solutionid?: string;
  statecode?: number;
  statuscode?: number;
  timezoneruleversionnumber?: number;
  type?: number;
  uniquename?: string;
  utcconversiontimezonecode?: number;
  versionnumber?: number;
  visibilityformulacomponentlibrary?: string;
  visibilityformulacomponentname?: string;
  visibilityformulafunctionname?: string;
  visibilitytype?: number;
}
