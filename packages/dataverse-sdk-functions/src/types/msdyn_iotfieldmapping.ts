import type { BooleanManagedProperty } from "./BooleanManagedProperty.js";

/**
 * msdyn_iotfieldmapping entity type
 */
export interface msdyn_iotfieldmapping {
  _modifiedby_value?: string;
  msdyn_fielddataformat?: number;
  _owningbusinessunit_value?: string;
  overwritetime?: string;
  overriddencreatedon?: string;
  _modifiedonbehalfby_value?: string;
  ismanaged?: boolean;
  solutionid?: string;
  versionnumber?: number;
  msdyn_mappingtype?: number;
  _createdonbehalfby_value?: string;
  componentstate?: number;
  modifiedon?: string;
  msdyn_modelinputfieldname?: string;
  componentidunique?: string;
  msdyn_searchtype?: number;
  importsequencenumber?: number;
  msdyn_directpathorkeypath?: string;
  statecode?: number;
  timezoneruleversionnumber?: number;
  _createdby_value?: string;
  msdyn_valuepath?: string;
  statuscode?: number;
  _owninguser_value?: string;
  utcconversiontimezonecode?: number;
  createdon?: string;
  msdyn_iotfieldmappingid?: string;
  iscustomizable?: BooleanManagedProperty;
  _ownerid_value?: string;
  msdyn_fieldname?: string;
  _owningteam_value?: string;
}
