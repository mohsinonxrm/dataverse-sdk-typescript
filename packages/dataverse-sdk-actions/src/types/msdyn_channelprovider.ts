import type { BooleanManagedProperty } from "./BooleanManagedProperty.js";

/**
 * msdyn_channelprovider entity type
 */
export interface msdyn_channelprovider {
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
  msdyn_apiversion?: number;
  msdyn_channelproviderid?: string;
  msdyn_channelurl?: string;
  msdyn_customparams?: string;
  msdyn_enableanalytics?: boolean;
  msdyn_enableoutbound?: boolean;
  msdyn_label?: string;
  msdyn_name?: string;
  msdyn_sandboxconfiguration?: string;
  msdyn_sortorder?: number;
  msdyn_trusteddomain?: string;
  msdyn_uniquename?: string;
  overriddencreatedon?: string;
  overwritetime?: string;
  solutionid?: string;
  statecode?: number;
  statuscode?: number;
  timezoneruleversionnumber?: number;
  utcconversiontimezonecode?: number;
  versionnumber?: number;
}
