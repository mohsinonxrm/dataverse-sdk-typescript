import type { BooleanManagedProperty } from "./BooleanManagedProperty.js";

/**
 * msdyn_cefinsightdefinition entity type
 */
export interface msdyn_cefinsightdefinition {
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
  msdyn_cefinsightdefinitionid?: string;
  msdyn_cefinsightid?: string;
  msdyn_cefmetadatajson?: string;
  msdyn_defaultvisualizationtype?: number;
  msdyn_deprovisioningerror?: string;
  msdyn_entitylogicalname?: string;
  msdyn_extended_definition?: string;
  msdyn_isenabled?: boolean;
  msdyn_name?: string;
  msdyn_provisioningerror?: string;
  msdyn_provisioningjobid?: string;
  msdyn_provisioningstatus?: number;
  msdyn_scope?: number;
  msdyn_uniquename?: string;
  msdyn_validityduration?: number;
  msdyn_validityunit?: number;
  overriddencreatedon?: string;
  overwritetime?: string;
  solutionid?: string;
  statecode?: number;
  statuscode?: number;
  timezoneruleversionnumber?: number;
  utcconversiontimezonecode?: number;
  versionnumber?: number;
}
