import type { BooleanManagedProperty } from "./BooleanManagedProperty.js";

/**
 * msdyn_salesagentconfiguration entity type
 */
export interface msdyn_salesagentconfiguration {
  _createdby_value?: string;
  _createdonbehalfby_value?: string;
  _modifiedby_value?: string;
  _modifiedonbehalfby_value?: string;
  _msdyn_activatedby_value?: string;
  _msdyn_activationstatusupdatedby_value?: string;
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
  msdyn_accountresearchconfig?: string;
  msdyn_activatedon?: string;
  msdyn_activationstatusagentenabled?: boolean;
  msdyn_activationstatusupdatedon?: string;
  msdyn_bingchatenabled?: boolean;
  msdyn_customerprofileconfig?: string;
  msdyn_emailvalidationconfig?: string;
  msdyn_leadrefreshdetails?: string;
  msdyn_leadwebresearchconfig?: string;
  msdyn_name?: string;
  msdyn_prioritizationconfig?: string;
  msdyn_productconfig?: string;
  msdyn_qualificationconfig?: string;
  msdyn_qualificationcriteria?: string;
  msdyn_salesagentconfigurationid?: string;
  msdyn_supportingknowledgeconfig?: string;
  msdyn_teamaccessconfig?: string;
  overriddencreatedon?: string;
  overwritetime?: string;
  solutionid?: string;
  statecode?: number;
  statuscode?: number;
  timezoneruleversionnumber?: number;
  utcconversiontimezonecode?: number;
  versionnumber?: number;
}
