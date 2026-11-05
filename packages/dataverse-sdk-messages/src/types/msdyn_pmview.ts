import type { BooleanManagedProperty } from "./BooleanManagedProperty.js";

/**
 * msdyn_pmview entity type
 */
export interface msdyn_pmview {
  _owningbusinessunit_value?: string;
  utcconversiontimezonecode?: number;
  msdyn_type?: number;
  componentidunique?: string;
  _msdyn_parentpmviewid_value?: string;
  versionnumber?: number;
  _ownerid_value?: string;
  componentstate?: number;
  msdyn_pmviewid?: string;
  msdyn_outputdata?: string;
  modifiedon?: string;
  statuscode?: number;
  _msdyn_pmprocessversionid_value?: string;
  _owninguser_value?: string;
  importsequencenumber?: number;
  _msdyn_pmcalendarversionid_value?: string;
  _modifiedonbehalfby_value?: string;
  _createdonbehalfby_value?: string;
  timezoneruleversionnumber?: number;
  overriddencreatedon?: string;
  ismanaged?: boolean;
  msdyn_isprivate?: boolean;
  _owningteam_value?: string;
  overwritetime?: string;
  solutionid?: string;
  statecode?: number;
  _createdby_value?: string;
  msdyn_configuration?: string;
  iscustomizable?: BooleanManagedProperty;
  _modifiedby_value?: string;
  msdyn_name?: string;
  _msdyn_pmprocessextendedmetadataversionid_value?: string;
  createdon?: string;
}
