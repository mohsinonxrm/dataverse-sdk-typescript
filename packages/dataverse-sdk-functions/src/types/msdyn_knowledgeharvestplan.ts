import type { BooleanManagedProperty } from "./BooleanManagedProperty.js";

/**
 * msdyn_knowledgeharvestplan entity type
 */
export interface msdyn_knowledgeharvestplan {
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
  msdyn_additionaldetails?: string;
  msdyn_backfillfromoption?: number;
  msdyn_conditions?: string;
  msdyn_fieldmappings?: string;
  msdyn_frequencytype?: number;
  msdyn_harvesteligibilityconditionid?: string;
  msdyn_harvestingdatatype?: number;
  msdyn_harvestsourceentity?: string;
  msdyn_harvesttype?: string;
  msdyn_isautopublishenabled?: boolean;
  msdyn_isinternal?: boolean;
  msdyn_isupdatekbarticleenabled?: boolean;
  msdyn_kbscopeconditions?: string;
  msdyn_keeprunningoption?: number;
  msdyn_knowledgearticletemplateid?: string;
  msdyn_knowledgeharvestplanid?: string;
  msdyn_lastactivatedon?: string;
  msdyn_lastruntime?: string;
  msdyn_localizationlanguagecode?: string;
  msdyn_name?: string;
  msdyn_nextruntime?: string;
  msdyn_priorityorder?: number;
  msdyn_recurringtype?: number;
  msdyn_versioning?: string;
  overriddencreatedon?: string;
  overwritetime?: string;
  solutionid?: string;
  statecode?: number;
  statuscode?: number;
  timezoneruleversionnumber?: number;
  utcconversiontimezonecode?: number;
  versionnumber?: number;
}
