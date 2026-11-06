import type { BooleanManagedProperty } from "./BooleanManagedProperty.js";

/**
 * msdyn_modulerundetail entity type
 */
export interface msdyn_modulerundetail {
  createdon?: string;
  msdyn_moduleendpointresults?: string;
  msdyn_modulerundetailid?: string;
  statecode?: number;
  msdyn_version?: number;
  componentidunique?: string;
  _createdby_value?: string;
  msdyn_moduleconfigid?: string;
  utcconversiontimezonecode?: number;
  msdyn_synapseschemasyncjobid?: string;
  versionnumber?: number;
  overwritetime?: string;
  modifiedon?: string;
  msdyn_moduleresultcodes?: string;
  iscustomizable?: BooleanManagedProperty;
  msdyn_queuedtime?: string;
  msdyn_moduleconfigidversion?: number;
  importsequencenumber?: number;
  statuscode?: number;
  _modifiedby_value?: string;
  msdyn_endtime?: string;
  msdyn_starttime?: string;
  _modifiedonbehalfby_value?: string;
  msdyn_outputmodeljsonpath?: string;
  _organizationid_value?: string;
  timezoneruleversionnumber?: number;
  solutionid?: string;
  componentstate?: number;
  _createdonbehalfby_value?: string;
  overriddencreatedon?: string;
  msdyn_iscompleted?: boolean;
  msdyn_modelrunid?: string;
  ismanaged?: boolean;
}
