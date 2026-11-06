import type { BooleanManagedProperty } from "./BooleanManagedProperty.js";

/**
 * msdyn_aiconfiguration entity type
 */
export interface msdyn_aiconfiguration {
  owneridtype?: number;
  msdyn_resourceinfo?: string;
  _modifiedby_value?: string;
  _ownerid_value?: string;
  msdyn_modelprovisioningmetadata?: string;
  iscustomizable?: BooleanManagedProperty;
  msdyn_modelglobalexplainability?: string;
  _msdyn_connectionreferenceid_value?: string;
  _msdyn_aimodelid_value?: string;
  _modifiedonbehalfby_value?: string;
  solutionid?: string;
  msdyn_schedulingoptions?: string;
  _msdyn_trainedmodelaiconfigurationpareid_value?: string;
  msdyn_lasterrors?: string;
  msdyn_modelrundataspecification?: string;
  _owningteam_value?: string;
  msdyn_aiconfigurationid?: string;
  msdyn_model_name?: string;
  msdyn_model?: string;
  overriddencreatedon?: string;
  msdyn_runconfiguration?: string;
  msdyn_minoriterationnumber?: number;
  msdyn_modeldata?: string;
  _owningbusinessunit_value?: string;
  statuscode?: number;
  _owninguser_value?: string;
  modifiedon?: string;
  msdyn_modelperformance?: string;
  msdyn_modelprovisioningstatus?: string;
  versionnumber?: number;
  statecode?: number;
  createdon?: string;
  msdyn_modelaction?: string;
  msdyn_templateversion?: number;
  msdyn_customconfiguration?: string;
  msdyn_majoriterationnumber?: number;
  ismanaged?: boolean;
  importsequencenumber?: number;
  componentstate?: number;
  introducedversion?: string;
  msdyn_aiconfigurationidunique?: string;
  timezoneruleversionnumber?: number;
  msdyn_type?: number;
  _msdyn_createdfromconfigurationid_value?: string;
  utcconversiontimezonecode?: number;
  overwritetime?: string;
  _createdonbehalfby_value?: string;
  msdyn_lasttrainorrundate?: string;
  msdyn_databinding?: string;
  _createdby_value?: string;
  msdyn_name?: string;
}
