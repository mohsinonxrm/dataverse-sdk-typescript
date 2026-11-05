import type { BooleanManagedProperty } from "./BooleanManagedProperty.js";

/**
 * msdyn_workflowactionstatus entity type
 */
export interface msdyn_workflowactionstatus {
  msdyn_workflowid?: string;
  msdyn_workflowactionstatusid?: string;
  componentidunique?: string;
  versionnumber?: number;
  msdyn_actionerrors?: string;
  utcconversiontimezonecode?: number;
  solutionid?: string;
  _modifiedonbehalfby_value?: string;
  modifiedon?: string;
  statecode?: number;
  _createdonbehalfby_value?: string;
  statuscode?: number;
  msdyn_extendedpayload?: string;
  msdyn_actionresult?: string;
  _organizationid_value?: string;
  createdon?: string;
  ismanaged?: boolean;
  msdyn_actionname?: string;
  overriddencreatedon?: string;
  _createdby_value?: string;
  importsequencenumber?: number;
  msdyn_actionstatus?: string;
  timezoneruleversionnumber?: number;
  componentstate?: number;
  overwritetime?: string;
  iscustomizable?: BooleanManagedProperty;
  _modifiedby_value?: string;
  msdyn_workflowrunid?: string;
}
