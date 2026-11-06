import type { BooleanManagedProperty } from "./BooleanManagedProperty.js";

/**
 * customapi entity type
 */
export interface customapi {
  _createdby_value?: string;
  _createdonbehalfby_value?: string;
  _fxexpressionid_value?: string;
  _modifiedby_value?: string;
  _modifiedonbehalfby_value?: string;
  _ownerid_value?: string;
  _owningbusinessunit_value?: string;
  _owningteam_value?: string;
  _owninguser_value?: string;
  _plugintypeid_value?: string;
  _powerfxruleid_value?: string;
  _sdkmessageid_value?: string;
  allowedcustomprocessingsteptype?: number;
  bindingtype?: number;
  boundentitylogicalname?: string;
  componentidunique?: string;
  componentstate?: number;
  createdon?: string;
  customapiid?: string;
  description?: string;
  displayname?: string;
  executeprivilegename?: string;
  importsequencenumber?: number;
  iscustomizable?: BooleanManagedProperty;
  isfunction?: boolean;
  ismanaged?: boolean;
  isprivate?: boolean;
  modifiedon?: string;
  name?: string;
  overriddencreatedon?: string;
  overwritetime?: string;
  solutionid?: string;
  statecode?: number;
  statuscode?: number;
  timezoneruleversionnumber?: number;
  uniquename?: string;
  utcconversiontimezonecode?: number;
  versionnumber?: number;
  workflowsdkstepenabled?: boolean;
}
