import type { BooleanManagedProperty } from "./BooleanManagedProperty.js";

/**
 * msdyn_productivitymacrosolutionconfiguration entity type
 */
export interface msdyn_productivitymacrosolutionconfiguration {
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
  msdyn_designerfallbackurl?: string;
  msdyn_designerurlconfigentity?: string;
  msdyn_designerurlconfigentityattrib?: string;
  msdyn_designerurlconfigentityid?: string;
  msdyn_designerurlconfigentityquery?: string;
  msdyn_designerurlrelativepath?: string;
  msdyn_macrosversion?: string;
  msdyn_name?: string;
  msdyn_productivitymacrosolutionconfigurationid?: string;
  msdyn_searchhint?: string;
  msdyn_uniquename?: string;
  msdyn_uservoicelink?: string;
  msdyn_uservoicetext?: string;
  overriddencreatedon?: string;
  overwritetime?: string;
  solutionid?: string;
  statecode?: number;
  statuscode?: number;
  timezoneruleversionnumber?: number;
  utcconversiontimezonecode?: number;
  versionnumber?: number;
}
