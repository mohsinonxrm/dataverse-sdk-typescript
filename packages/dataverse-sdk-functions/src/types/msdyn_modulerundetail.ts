import type { BooleanManagedProperty } from "./BooleanManagedProperty.js";

/**
 * msdyn_modulerundetail entity type
 */
export interface msdyn_modulerundetail {
  _createdby_value?: string;
  _createdonbehalfby_value?: string;
  _modifiedby_value?: string;
  _modifiedonbehalfby_value?: string;
  _organizationid_value?: string;
  componentidunique?: string;
  componentstate?: number;
  createdon?: string;
  importsequencenumber?: number;
  iscustomizable?: BooleanManagedProperty;
  ismanaged?: boolean;
  modifiedon?: string;
  msdyn_endtime?: string;
  msdyn_iscompleted?: boolean;
  msdyn_modelrunid?: string;
  msdyn_moduleconfigid?: string;
  msdyn_moduleconfigidversion?: number;
  msdyn_moduleendpointresults?: string;
  msdyn_moduleresultcodes?: string;
  msdyn_modulerundetailid?: string;
  msdyn_outputmodeljsonpath?: string;
  msdyn_queuedtime?: string;
  msdyn_starttime?: string;
  msdyn_synapseschemasyncjobid?: string;
  msdyn_version?: number;
  overriddencreatedon?: string;
  overwritetime?: string;
  solutionid?: string;
  statecode?: number;
  statuscode?: number;
  timezoneruleversionnumber?: number;
  utcconversiontimezonecode?: number;
  versionnumber?: number;
}
