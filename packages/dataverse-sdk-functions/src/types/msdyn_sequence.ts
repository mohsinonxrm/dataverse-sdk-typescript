import type { BooleanManagedProperty } from "./BooleanManagedProperty.js";

/**
 * msdyn_sequence entity type
 */
export interface msdyn_sequence {
  _createdby_value?: string;
  _createdonbehalfby_value?: string;
  _modifiedby_value?: string;
  _modifiedonbehalfby_value?: string;
  _msdyn_parentsequence_value?: string;
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
  msdyn_SequenceStats180d?: string;
  msdyn_SequenceStats1y?: string;
  msdyn_SequenceStats2y?: string;
  msdyn_SequenceStats30d?: string;
  msdyn_SequenceStats90d?: string;
  msdyn_analyticsavailable?: boolean;
  msdyn_analyticsversion?: string;
  msdyn_assignsequencecondition?: string;
  msdyn_assignsequencefieldname?: string;
  msdyn_assignsequencetype?: number;
  msdyn_cjodefinition?: string;
  msdyn_cjodefinitionstate?: boolean;
  msdyn_definition?: string;
  msdyn_description?: string;
  msdyn_iswaittimecomputationenabledatsequencelevel?: boolean;
  msdyn_maxstepcount?: number;
  msdyn_name?: string;
  msdyn_orchestratorversion?: number;
  msdyn_regardingentitydisplayname?: string;
  msdyn_regardingentityname?: string;
  msdyn_sequenceexitcriterion?: string;
  msdyn_sequenceid?: string;
  msdyn_sequencerecords?: string;
  msdyn_template?: string;
  msdyn_totaltasks?: number;
  msdyn_type?: number;
  msdyn_version?: number;
  msdyn_versiondescription?: string;
  msdyn_workflowid?: string;
  overriddencreatedon?: string;
  overwritetime?: string;
  solutionid?: string;
  statecode?: number;
  statuscode?: number;
  timezoneruleversionnumber?: number;
  utcconversiontimezonecode?: number;
  versionnumber?: number;
}
