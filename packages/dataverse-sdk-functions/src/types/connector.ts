import type { BooleanManagedProperty } from "./BooleanManagedProperty.js";

/**
 * connector entity type
 */
export interface connector {
  _createdby_value?: string;
  _createdonbehalfby_value?: string;
  _extensionassemblyid_value?: string;
  _modifiedby_value?: string;
  _modifiedonbehalfby_value?: string;
  _ownerid_value?: string;
  _owningbusinessunit_value?: string;
  _owningteam_value?: string;
  _owninguser_value?: string;
  capabilities?: string;
  componentstate?: number;
  connectionparameters?: string;
  connectionparametersets?: string;
  connectorid?: string;
  connectoridunique?: string;
  connectorinternalid?: string;
  connectortype?: number;
  createdon?: string;
  customcodeblobcontent?: string;
  description?: string;
  displayname?: string;
  iconblob?: string;
  iconblob_timestamp?: number;
  iconblob_url?: string;
  iconblobid?: string;
  iconbrandcolor?: string;
  importsequencenumber?: number;
  interfaces?: string;
  introducedversion?: string;
  iscustomizable?: BooleanManagedProperty;
  ismanaged?: boolean;
  modifiedon?: string;
  name?: string;
  openapidefinition?: string;
  overriddencreatedon?: string;
  overwritetime?: string;
  policytemplateinstances?: string;
  scriptoperations?: string;
  solutionid?: string;
  statecode?: number;
  statuscode?: number;
  timezoneruleversionnumber?: number;
  utcconversiontimezonecode?: number;
  versionnumber?: number;
}
