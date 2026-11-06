import type { BooleanManagedProperty } from "./BooleanManagedProperty.js";

/**
 * pluginpackage entity type
 */
export interface pluginpackage {
  _createdby_value?: string;
  _createdonbehalfby_value?: string;
  _managedidentityid_value?: string;
  _modifiedby_value?: string;
  _modifiedonbehalfby_value?: string;
  _organizationid_value?: string;
  componentidunique?: string;
  componentstate?: number;
  content?: string;
  createdon?: string;
  exportkeyversion?: number;
  fileid?: string;
  fileid_name?: string;
  importsequencenumber?: number;
  iscustomizable?: BooleanManagedProperty;
  ismanaged?: boolean;
  modifiedon?: string;
  name?: string;
  overriddencreatedon?: string;
  overwritetime?: string;
  package?: string;
  package_name?: string;
  pluginpackageid?: string;
  solutionid?: string;
  statecode?: number;
  statuscode?: number;
  timezoneruleversionnumber?: number;
  uniquename?: string;
  utcconversiontimezonecode?: number;
  version?: string;
  versionnumber?: number;
}
