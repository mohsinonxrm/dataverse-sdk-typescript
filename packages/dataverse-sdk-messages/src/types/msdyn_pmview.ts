import type { BooleanManagedProperty } from "./BooleanManagedProperty.js";

/**
 * msdyn_pmview entity type
 */
export interface msdyn_pmview {
  _createdby_value?: string;
  _createdonbehalfby_value?: string;
  _modifiedby_value?: string;
  _modifiedonbehalfby_value?: string;
  _msdyn_parentpmviewid_value?: string;
  _msdyn_pmcalendarversionid_value?: string;
  _msdyn_pmprocessextendedmetadataversionid_value?: string;
  _msdyn_pmprocessversionid_value?: string;
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
  msdyn_configuration?: string;
  msdyn_isprivate?: boolean;
  msdyn_name?: string;
  msdyn_outputdata?: string;
  msdyn_pmviewid?: string;
  msdyn_type?: number;
  overriddencreatedon?: string;
  overwritetime?: string;
  solutionid?: string;
  statecode?: number;
  statuscode?: number;
  timezoneruleversionnumber?: number;
  utcconversiontimezonecode?: number;
  versionnumber?: number;
}
