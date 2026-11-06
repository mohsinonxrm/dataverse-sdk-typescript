import type { BooleanManagedProperty } from "./BooleanManagedProperty.js";

/**
 * msdyn_evaluationglobalconfig entity type
 */
export interface msdyn_evaluationglobalconfig {
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
  msdyn_dvcopilotprovisioningstatus?: number;
  msdyn_dvcopilotprovisioningstatusjson?: string;
  msdyn_enablecase?: boolean;
  msdyn_enableconversation?: boolean;
  msdyn_enableevalscoring?: boolean;
  msdyn_enablesummaryregeneration?: boolean;
  msdyn_enablethirdpartyevaluations?: boolean;
  msdyn_evaluationglobalconfigid?: string;
  msdyn_id?: string;
  msdyn_isdvcopilotenabled?: boolean;
  msdyn_name?: string;
  msdyn_thresholdvalue?: number;
  overriddencreatedon?: string;
  overwritetime?: string;
  solutionid?: string;
  statecode?: number;
  statuscode?: number;
  timezoneruleversionnumber?: number;
  utcconversiontimezonecode?: number;
  versionnumber?: number;
}
