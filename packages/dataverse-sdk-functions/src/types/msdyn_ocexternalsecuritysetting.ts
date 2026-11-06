import type { BooleanManagedProperty } from "./BooleanManagedProperty.js";

/**
 * msdyn_ocexternalsecuritysetting entity type
 */
export interface msdyn_ocexternalsecuritysetting {
  _contactid_value?: string;
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
  msdyn_externalconsultholdtype?: number;
  msdyn_name?: string;
  msdyn_ocexternalconsultsecurity?: number;
  msdyn_ocexternalsecuritysettingid?: string;
  msdyn_ocexternaltransfersecurity?: number;
  overriddencreatedon?: string;
  overwritetime?: string;
  solutionid?: string;
  statecode?: number;
  statuscode?: number;
  timezoneruleversionnumber?: number;
  utcconversiontimezonecode?: number;
  versionnumber?: number;
}
