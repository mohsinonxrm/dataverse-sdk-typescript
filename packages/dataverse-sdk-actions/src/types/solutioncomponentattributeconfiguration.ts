import type { BooleanManagedProperty } from "./BooleanManagedProperty.js";

/**
 * solutioncomponentattributeconfiguration entity type
 */
export interface solutioncomponentattributeconfiguration {
  _attributeid_value?: string;
  _createdby_value?: string;
  _createdonbehalfby_value?: string;
  _modifiedby_value?: string;
  _modifiedonbehalfby_value?: string;
  _organizationid_value?: string;
  _solutioncomponentconfigurationid_value?: string;
  componentidunique?: string;
  componentstate?: number;
  createdon?: string;
  custommanagedbehaviortype?: number;
  dependencyremovalcapability?: number;
  encodingformat?: number;
  fileextension?: string;
  importsequencenumber?: number;
  invokesubstitutionforattribute?: boolean;
  iscustomizable?: BooleanManagedProperty;
  isenabledfordependencyextraction?: boolean;
  isexportdisabled?: boolean;
  isexportedasfile?: boolean;
  ismanaged?: boolean;
  isprefixedbytemplate?: boolean;
  modifiedon?: string;
  name?: string;
  overriddencreatedon?: string;
  overwritetime?: string;
  solutioncomponentattributeconfigurationid?: string;
  solutionid?: string;
  statecode?: number;
  statuscode?: number;
  timezoneruleversionnumber?: number;
  utcconversiontimezonecode?: number;
  versionnumber?: number;
}
