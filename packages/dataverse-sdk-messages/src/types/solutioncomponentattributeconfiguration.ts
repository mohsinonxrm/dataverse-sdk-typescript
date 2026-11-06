import type { BooleanManagedProperty } from "./BooleanManagedProperty.js";

/**
 * solutioncomponentattributeconfiguration entity type
 */
export interface solutioncomponentattributeconfiguration {
  _createdonbehalfby_value?: string;
  isprefixedbytemplate?: boolean;
  componentstate?: number;
  modifiedon?: string;
  _solutioncomponentconfigurationid_value?: string;
  iscustomizable?: BooleanManagedProperty;
  statecode?: number;
  statuscode?: number;
  name?: string;
  isenabledfordependencyextraction?: boolean;
  solutionid?: string;
  isexportedasfile?: boolean;
  versionnumber?: number;
  invokesubstitutionforattribute?: boolean;
  fileextension?: string;
  isexportdisabled?: boolean;
  encodingformat?: number;
  createdon?: string;
  timezoneruleversionnumber?: number;
  _createdby_value?: string;
  utcconversiontimezonecode?: number;
  overwritetime?: string;
  _modifiedonbehalfby_value?: string;
  ismanaged?: boolean;
  componentidunique?: string;
  overriddencreatedon?: string;
  custommanagedbehaviortype?: number;
  _attributeid_value?: string;
  dependencyremovalcapability?: number;
  solutioncomponentattributeconfigurationid?: string;
  _modifiedby_value?: string;
  importsequencenumber?: number;
  _organizationid_value?: string;
}
