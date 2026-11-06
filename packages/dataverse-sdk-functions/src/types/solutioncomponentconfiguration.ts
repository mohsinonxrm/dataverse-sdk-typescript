import type { BooleanManagedProperty } from "./BooleanManagedProperty.js";

/**
 * solutioncomponentconfiguration entity type
 */
export interface solutioncomponentconfiguration {
  _createdby_value?: string;
  _createdonbehalfby_value?: string;
  _entityid_value?: string;
  _modifiedby_value?: string;
  _modifiedonbehalfby_value?: string;
  _organizationid_value?: string;
  allowexportkeywithoutprefix?: boolean;
  componentidunique?: string;
  componentstate?: number;
  createdon?: string;
  dependencyremovaldisabledforcomponents?: string;
  fileformat?: number;
  filescope?: number;
  importsequencenumber?: number;
  invokesubstitution?: boolean;
  iscustomizable?: BooleanManagedProperty;
  isdisplayable?: boolean;
  ismanaged?: boolean;
  isonetoonechildcomponent?: boolean;
  issoftdeleteenabled?: boolean;
  isversioningenabled?: boolean;
  keepactivecustomizationafterconversion?: boolean;
  modifiedon?: string;
  name?: string;
  overriddencreatedon?: string;
  overwritetime?: string;
  solutioncomponentconfigurationid?: string;
  solutionid?: string;
  statecode?: number;
  statuscode?: number;
  timezoneruleversionnumber?: number;
  utcconversiontimezonecode?: number;
  versionnumber?: number;
}
