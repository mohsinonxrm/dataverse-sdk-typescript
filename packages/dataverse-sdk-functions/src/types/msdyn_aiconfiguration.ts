import type { BooleanManagedProperty } from "./BooleanManagedProperty.js";

/**
 * msdyn_aiconfiguration entity type
 */
export interface msdyn_aiconfiguration {
  _createdby_value?: string;
  _createdonbehalfby_value?: string;
  _modifiedby_value?: string;
  _modifiedonbehalfby_value?: string;
  _msdyn_aimodelid_value?: string;
  _msdyn_connectionreferenceid_value?: string;
  _msdyn_createdfromconfigurationid_value?: string;
  _msdyn_trainedmodelaiconfigurationpareid_value?: string;
  _ownerid_value?: string;
  _owningbusinessunit_value?: string;
  _owningteam_value?: string;
  _owninguser_value?: string;
  componentstate?: number;
  createdon?: string;
  importsequencenumber?: number;
  introducedversion?: string;
  iscustomizable?: BooleanManagedProperty;
  ismanaged?: boolean;
  modifiedon?: string;
  msdyn_aiconfigurationid?: string;
  msdyn_aiconfigurationidunique?: string;
  msdyn_customconfiguration?: string;
  msdyn_databinding?: string;
  msdyn_lasterrors?: string;
  msdyn_lasttrainorrundate?: string;
  msdyn_majoriterationnumber?: number;
  msdyn_minoriterationnumber?: number;
  msdyn_model?: string;
  msdyn_model_name?: string;
  msdyn_modelaction?: string;
  msdyn_modeldata?: string;
  msdyn_modelglobalexplainability?: string;
  msdyn_modelperformance?: string;
  msdyn_modelprovisioningmetadata?: string;
  msdyn_modelprovisioningstatus?: string;
  msdyn_modelrundataspecification?: string;
  msdyn_name?: string;
  msdyn_resourceinfo?: string;
  msdyn_runconfiguration?: string;
  msdyn_schedulingoptions?: string;
  msdyn_templateversion?: number;
  msdyn_type?: number;
  overriddencreatedon?: string;
  overwritetime?: string;
  owneridtype?: number;
  solutionid?: string;
  statecode?: number;
  statuscode?: number;
  timezoneruleversionnumber?: number;
  utcconversiontimezonecode?: number;
  versionnumber?: number;
}
