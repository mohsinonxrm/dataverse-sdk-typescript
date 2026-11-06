import type { BooleanManagedProperty } from "./BooleanManagedProperty.js";

/**
 * msdyn_evaluationplan entity type
 */
export interface msdyn_evaluationplan {
  _createdby_value?: string;
  _createdonbehalfby_value?: string;
  _modifiedby_value?: string;
  _modifiedonbehalfby_value?: string;
  _msdyn_assignedto_value?: string;
  _msdyn_evaluationcriteria_value?: string;
  _msdyn_evaluationthirdpartyconfiguration_value?: string;
  _msdyn_evaluationtriggerconfig_value?: string;
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
  msdyn_description?: string;
  msdyn_duedate?: string;
  msdyn_evaluationexpirationunit?: number;
  msdyn_evaluationexpirationvalue?: number;
  msdyn_evaluationfilterrulesxml?: string;
  msdyn_evaluationmethod?: number;
  msdyn_evaluationplanid?: string;
  msdyn_event?: number;
  msdyn_frequency?: number;
  msdyn_occurrence?: number;
  msdyn_participantscopes?: string;
  msdyn_planenddate?: string;
  msdyn_planname?: string;
  msdyn_planstartdate?: string;
  msdyn_rankrecordsbyfieldlogicalname?: string;
  msdyn_recordtype?: number;
  msdyn_removeenddatetoggle?: number;
  msdyn_sampleby?: number;
  msdyn_samplingmode?: number;
  msdyn_samplingvalue?: number;
  msdyn_selectionstrategy?: number;
  msdyn_setenddatetoggle?: number;
  msdyn_uniquename?: string;
  overriddencreatedon?: string;
  overwritetime?: string;
  solutionid?: string;
  statecode?: number;
  statuscode?: number;
  timezoneruleversionnumber?: number;
  utcconversiontimezonecode?: number;
  versionnumber?: number;
}
