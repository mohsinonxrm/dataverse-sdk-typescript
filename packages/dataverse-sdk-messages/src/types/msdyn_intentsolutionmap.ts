import type { BooleanManagedProperty } from "./BooleanManagedProperty.js";

/**
 * msdyn_intentsolutionmap entity type
 */
export interface msdyn_intentsolutionmap {
  _createdby_value?: string;
  _createdonbehalfby_value?: string;
  _modifiedby_value?: string;
  _modifiedonbehalfby_value?: string;
  _msdyn_agentgroupid_value?: string;
  _msdyn_intentfamilyid_value?: string;
  _msdyn_intentgroupconditionid_value?: string;
  _msdyn_intentid_value?: string;
  _msdyn_queueid_value?: string;
  _msdyn_rootknowledgearticleid_value?: string;
  _msdyn_solutionmapid_value?: string;
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
  msdyn_intentsolutionmapid?: string;
  msdyn_name?: string;
  msdyn_order?: number;
  msdyn_reviewstate?: number;
  msdyn_solutionmetadata?: string;
  msdyn_solutiontype?: string;
  msdyn_source?: number;
  overriddencreatedon?: string;
  overwritetime?: string;
  solutionid?: string;
  statecode?: number;
  statuscode?: number;
  timezoneruleversionnumber?: number;
  utcconversiontimezonecode?: number;
  versionnumber?: number;
}
