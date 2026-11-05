import type { BooleanManagedProperty } from "./BooleanManagedProperty.js";

/**
 * msdyn_businessprofile entity type
 */
export interface msdyn_businessprofile {
  importsequencenumber?: number;
  _createdonbehalfby_value?: string;
  msdyn_name?: string;
  msdyn_otherindustryname?: string;
  _modifiedonbehalfby_value?: string;
  msdyn_companyurl?: string;
  modifiedon?: string;
  timezoneruleversionnumber?: number;
  iscustomizable?: BooleanManagedProperty;
  statuscode?: number;
  _owningbusinessunit_value?: string;
  _owninguser_value?: string;
  _ownerid_value?: string;
  overriddencreatedon?: string;
  versionnumber?: number;
  createdon?: string;
  statecode?: number;
  overwritetime?: string;
  ismanaged?: boolean;
  solutionid?: string;
  componentidunique?: string;
  msdyn_industry?: number;
  _owningteam_value?: string;
  componentstate?: number;
  _createdby_value?: string;
  msdyn_businessprofileid?: string;
  _modifiedby_value?: string;
  utcconversiontimezonecode?: number;
}
