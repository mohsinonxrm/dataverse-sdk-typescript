import type { BooleanManagedProperty } from "./BooleanManagedProperty.js";

/**
 * msdyn_salesagentusage entity type
 */
export interface msdyn_salesagentusage {
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
  msdyn_agentname?: string;
  msdyn_eventdate?: string;
  msdyn_eventid?: string;
  msdyn_eventjson?: string;
  msdyn_salesagentusageid?: string;
  msdyn_userid?: string;
  overriddencreatedon?: string;
  overwritetime?: string;
  solutionid?: string;
  statecode?: number;
  statuscode?: number;
  timezoneruleversionnumber?: number;
  utcconversiontimezonecode?: number;
  versionnumber?: number;
}
