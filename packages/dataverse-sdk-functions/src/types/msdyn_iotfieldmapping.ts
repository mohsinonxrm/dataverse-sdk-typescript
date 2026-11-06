import type { BooleanManagedProperty } from "./BooleanManagedProperty.js";

/**
 * msdyn_iotfieldmapping entity type
 */
export interface msdyn_iotfieldmapping {
  _createdby_value?: string;
  _createdonbehalfby_value?: string;
  _modifiedby_value?: string;
  _modifiedonbehalfby_value?: string;
  _ownerid_value?: string;
  _owningbusinessunit_value?: string;
  _owningteam_value?: string;
  _owninguser_value?: string;
  componentidunique?: string;
  componentstate?: number;
  createdon?: string;
  importsequencenumber?: number;
  iscustomizable?: BooleanManagedProperty;
  ismanaged?: boolean;
  modifiedon?: string;
  msdyn_directpathorkeypath?: string;
  msdyn_fielddataformat?: number;
  msdyn_fieldname?: string;
  msdyn_iotfieldmappingid?: string;
  msdyn_mappingtype?: number;
  msdyn_modelinputfieldname?: string;
  msdyn_searchtype?: number;
  msdyn_valuepath?: string;
  overriddencreatedon?: string;
  overwritetime?: string;
  solutionid?: string;
  statecode?: number;
  statuscode?: number;
  timezoneruleversionnumber?: number;
  utcconversiontimezonecode?: number;
  versionnumber?: number;
}
