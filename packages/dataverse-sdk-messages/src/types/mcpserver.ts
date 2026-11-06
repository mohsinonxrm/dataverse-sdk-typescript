import type { BooleanManagedProperty } from "./BooleanManagedProperty.js";

/**
 * mcpserver entity type
 */
export interface mcpserver {
  Meta?: string;
  _createdby_value?: string;
  _createdonbehalfby_value?: string;
  _managedidentityid_value?: string;
  _modifiedby_value?: string;
  _modifiedonbehalfby_value?: string;
  _ownerid_value?: string;
  _owningbusinessunit_value?: string;
  _owningteam_value?: string;
  _owninguser_value?: string;
  audience?: string;
  baseserverid?: string;
  blockedtools?: string;
  componentidunique?: string;
  componentstate?: number;
  configuration?: string;
  createdon?: string;
  description?: string;
  displayname?: string;
  flags?: number;
  hostname?: string;
  icon?: string;
  icon_timestamp?: number;
  icon_url?: string;
  iconid?: string;
  importsequencenumber?: number;
  instructions?: string;
  iscustom?: boolean;
  iscustomizable?: BooleanManagedProperty;
  ismanaged?: boolean;
  isremote?: boolean;
  mcpserverid?: string;
  modifiedon?: string;
  name?: string;
  overriddencreatedon?: string;
  overwritetime?: string;
  relativepath?: string;
  resourceandscope?: string;
  scope?: string;
  securitygroupaccesslist?: string;
  servertype?: number;
  serverurl?: string;
  solutionid?: string;
  statecode?: number;
  statuscode?: number;
  timezoneruleversionnumber?: number;
  useraccesslist?: string;
  utcconversiontimezonecode?: number;
  versionnumber?: number;
}
