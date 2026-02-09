import type { BooleanManagedProperty } from "./BooleanManagedProperty.js";

/**
 * solutioncomponentconfiguration entity type
 */
export interface solutioncomponentconfiguration {
  componentidunique: string;
  importsequencenumber: number;
  versionnumber: number;
  iscustomizable: BooleanManagedProperty;
  createdon: string;
  keepactivecustomizationafterconversion: boolean;
  fileformat: number;
  overwritetime: string;
  statecode: number;
  solutioncomponentconfigurationid: string;
  ismanaged: boolean;
  isversioningenabled: boolean;
  overriddencreatedon: string;
  dependencyremovaldisabledforcomponents: string;
  _createdby_value: string;
  filescope: number;
  isdisplayable: boolean;
  invokesubstitution: boolean;
  componentstate: number;
  _modifiedonbehalfby_value: string;
  modifiedon: string;
  _createdonbehalfby_value: string;
  name: string;
  isonetoonechildcomponent: boolean;
  timezoneruleversionnumber: number;
  _modifiedby_value: string;
  _entityid_value: string;
  utcconversiontimezonecode: number;
  solutionid: string;
  statuscode: number;
  issoftdeleteenabled: boolean;
  _organizationid_value: string;
  allowexportkeywithoutprefix: boolean;
}
