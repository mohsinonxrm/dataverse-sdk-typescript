import type { BooleanManagedProperty } from "./BooleanManagedProperty.js";

/**
 * msdyn_workflowactionstatus entity type
 */
export interface msdyn_workflowactionstatus {
  _createdby_value?: string;
  _createdonbehalfby_value?: string;
  _modifiedby_value?: string;
  _modifiedonbehalfby_value?: string;
  _organizationid_value?: string;
  componentidunique?: string;
  componentstate?: number;
  createdon?: string;
  importsequencenumber?: number;
  iscustomizable?: BooleanManagedProperty;
  ismanaged?: boolean;
  modifiedon?: string;
  msdyn_actionerrors?: string;
  msdyn_actionname?: string;
  msdyn_actionresult?: string;
  msdyn_actionstatus?: string;
  msdyn_extendedpayload?: string;
  msdyn_workflowactionstatusid?: string;
  msdyn_workflowid?: string;
  msdyn_workflowrunid?: string;
  overriddencreatedon?: string;
  overwritetime?: string;
  solutionid?: string;
  statecode?: number;
  statuscode?: number;
  timezoneruleversionnumber?: number;
  utcconversiontimezonecode?: number;
  versionnumber?: number;
}
