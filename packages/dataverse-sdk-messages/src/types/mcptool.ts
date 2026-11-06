import type { BooleanManagedProperty } from "./BooleanManagedProperty.js";

/**
 * mcptool entity type
 */
export interface mcptool {
  Meta?: string;
  _createdby_value?: string;
  _createdonbehalfby_value?: string;
  _customapiid_value?: string;
  _mcpserverid_value?: string;
  _modifiedby_value?: string;
  _modifiedonbehalfby_value?: string;
  _ownerid_value?: string;
  _owningbusinessunit_value?: string;
  _owningteam_value?: string;
  _owninguser_value?: string;
  _sdkmessagepairid_value?: string;
  annotations?: string;
  backendtooltype?: number;
  basetoolid?: string;
  billingconfiguration?: string;
  componentidunique?: string;
  componentstate?: number;
  connectorid?: string;
  createdon?: string;
  description?: string;
  flags?: number;
  hostname?: string;
  httpmethod?: number;
  importsequencenumber?: number;
  inputschema?: string;
  iscustom?: boolean;
  iscustomizable?: BooleanManagedProperty;
  ismanaged?: boolean;
  mcptoolid?: string;
  modifiedon?: string;
  name?: string;
  operationid?: string;
  outputschema?: string;
  overriddencreatedon?: string;
  overwritetime?: string;
  relativepath?: string;
  resourceandscope?: string;
  solutionid?: string;
  statecode?: number;
  statuscode?: number;
  timezoneruleversionnumber?: number;
  title?: string;
  utcconversiontimezonecode?: number;
  versionnumber?: number;
}
