import type { BooleanManagedProperty } from "./BooleanManagedProperty.js";

/**
 * msdyn_aidescriptionvalue entity type
 */
export interface msdyn_aidescriptionvalue {
  _createdby_value?: string;
  _createdonbehalfby_value?: string;
  _modifiedby_value?: string;
  _modifiedonbehalfby_value?: string;
  _msdyn_activedraftrunid_value?: string;
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
  msdyn_activedraftdescription?: string;
  msdyn_aidescriptionvalueid?: string;
  msdyn_displayvalue?: string;
  msdyn_entitylogicalname?: string;
  msdyn_fieldlogicalname?: string;
  msdyn_language?: string;
  msdyn_name?: string;
  msdyn_publisheddescription?: string;
  msdyn_publishedon?: string;
  msdyn_status?: number;
  msdyn_valuekey?: string;
  overriddencreatedon?: string;
  overwritetime?: string;
  solutionid?: string;
  statecode?: number;
  statuscode?: number;
  timezoneruleversionnumber?: number;
  utcconversiontimezonecode?: number;
  versionnumber?: number;
}
