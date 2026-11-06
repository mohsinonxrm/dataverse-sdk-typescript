import type { BooleanManagedProperty } from "./BooleanManagedProperty.js";

/**
 * msdyn_personasecurityrolemapping entity type
 */
export interface msdyn_personasecurityrolemapping {
  overriddencreatedon?: string;
  msdyn_personasecurityrolemappingid?: string;
  componentidunique?: string;
  statuscode?: number;
  componentstate?: number;
  _msdyn_securityroleid_value?: string;
  ismanaged?: boolean;
  _modifiedby_value?: string;
  iscustomizable?: BooleanManagedProperty;
  modifiedon?: string;
  solutionid?: string;
  createdon?: string;
  msdyn_name?: string;
  timezoneruleversionnumber?: number;
  _modifiedonbehalfby_value?: string;
  versionnumber?: number;
  statecode?: number;
  msdyn_uniquename?: string;
  _organizationid_value?: string;
  _createdby_value?: string;
  msdyn_personatype?: number;
  importsequencenumber?: number;
  _createdonbehalfby_value?: string;
  utcconversiontimezonecode?: number;
  overwritetime?: string;
}
