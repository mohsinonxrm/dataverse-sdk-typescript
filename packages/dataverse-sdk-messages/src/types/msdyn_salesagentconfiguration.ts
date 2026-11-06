import type { BooleanManagedProperty } from "./BooleanManagedProperty.js";

/**
 * msdyn_salesagentconfiguration entity type
 */
export interface msdyn_salesagentconfiguration {
  _owningteam_value?: string;
  msdyn_teamaccessconfig?: string;
  ismanaged?: boolean;
  _owninguser_value?: string;
  msdyn_leadwebresearchconfig?: string;
  _owningbusinessunit_value?: string;
  _modifiedby_value?: string;
  _msdyn_activatedby_value?: string;
  timezoneruleversionnumber?: number;
  overriddencreatedon?: string;
  msdyn_bingchatenabled?: boolean;
  componentidunique?: string;
  msdyn_customerprofileconfig?: string;
  msdyn_salesagentconfigurationid?: string;
  importsequencenumber?: number;
  _modifiedonbehalfby_value?: string;
  utcconversiontimezonecode?: number;
  componentstate?: number;
  msdyn_emailvalidationconfig?: string;
  solutionid?: string;
  versionnumber?: number;
  msdyn_leadrefreshdetails?: string;
  _createdby_value?: string;
  statuscode?: number;
  iscustomizable?: BooleanManagedProperty;
  createdon?: string;
  msdyn_activatedon?: string;
  msdyn_activationstatusupdatedon?: string;
  msdyn_accountresearchconfig?: string;
  msdyn_prioritizationconfig?: string;
  msdyn_supportingknowledgeconfig?: string;
  _msdyn_activationstatusupdatedby_value?: string;
  statecode?: number;
  msdyn_name?: string;
  _createdonbehalfby_value?: string;
  _ownerid_value?: string;
  msdyn_qualificationcriteria?: string;
  msdyn_productconfig?: string;
  msdyn_qualificationconfig?: string;
  overwritetime?: string;
  msdyn_activationstatusagentenabled?: boolean;
  modifiedon?: string;
}
