import type { BooleanManagedProperty } from "./BooleanManagedProperty.js";

/**
 * msdyn_aidescriptioncandidate entity type
 */
export interface msdyn_aidescriptioncandidate {
  _createdby_value?: string;
  _createdonbehalfby_value?: string;
  _modifiedby_value?: string;
  _modifiedonbehalfby_value?: string;
  _msdyn_aidescriptionrunid_value?: string;
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
  msdyn_adaptivek?: number;
  msdyn_aidescriptioncandidateid?: string;
  msdyn_displayvalue?: string;
  msdyn_entitylogicalname?: string;
  msdyn_errordetails?: string;
  msdyn_fieldlogicalname?: string;
  msdyn_generateddescription?: string;
  msdyn_hasdraftchanges?: boolean;
  msdyn_holdcount?: number;
  msdyn_initialdescription?: string;
  msdyn_islowdata?: boolean;
  msdyn_language?: string;
  msdyn_lastimprovedround?: number;
  msdyn_name?: string;
  msdyn_status?: number;
  msdyn_targetrowid?: string;
  msdyn_topksiblingsjson?: string;
  msdyn_traincount?: number;
  msdyn_valcount?: number;
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
