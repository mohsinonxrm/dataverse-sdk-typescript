import type { BooleanManagedProperty } from "./BooleanManagedProperty.js";

/**
 * msdyn_swarmparticipantrule entity type
 */
export interface msdyn_swarmparticipantrule {
  overwritetime?: string;
  utcconversiontimezonecode?: number;
  versionnumber?: number;
  ismanaged?: boolean;
  componentidunique?: string;
  _createdby_value?: string;
  timezoneruleversionnumber?: number;
  statuscode?: number;
  _owninguser_value?: string;
  solutionid?: string;
  _owningbusinessunit_value?: string;
  msdyn_uniquename?: string;
  _createdonbehalfby_value?: string;
  _modifiedby_value?: string;
  createdon?: string;
  _msdyn_swarmroleid_value?: string;
  statecode?: number;
  modifiedon?: string;
  msdyn_name?: string;
  _ownerid_value?: string;
  iscustomizable?: BooleanManagedProperty;
  overriddencreatedon?: string;
  _modifiedonbehalfby_value?: string;
  _msdyn_swarmtemplateid_value?: string;
  componentstate?: number;
  msdyn_swarmparticipantruleid?: string;
  msdyn_rulexml?: string;
  _owningteam_value?: string;
  importsequencenumber?: number;
}
