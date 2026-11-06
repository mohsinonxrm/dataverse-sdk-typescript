import type { BooleanManagedProperty } from "./BooleanManagedProperty.js";

/**
 * flowmachinegroup entity type
 */
export interface flowmachinegroup {
  trytoreusewindowssession?: boolean;
  _createdby_value?: string;
  disconnectionplannedon?: string;
  overwritetime?: string;
  groupmetadata?: string;
  _passwordchangedby_value?: string;
  flowmachinegroupid?: string;
  statuscode?: number;
  _owningteam_value?: string;
  ismanaged?: boolean;
  _rotationstartedby_value?: string;
  componentidunique?: string;
  _modifiedby_value?: string;
  secondarykeypackage?: string;
  primarykeypackage?: string;
  overriddencreatedon?: string;
  modifiedon?: string;
  _ownerid_value?: string;
  secondarypublickey?: string;
  createdon?: string;
  preferredqueuingtype?: number;
  versionnumber?: number;
  keycreationdate?: string;
  _flowmachineimage_value?: string;
  managementtype?: number;
  _modifiedonbehalfby_value?: string;
  _createdonbehalfby_value?: string;
  provisioningerror?: string;
  iscustomizable?: BooleanManagedProperty;
  flowgrouptype?: number;
  description?: string;
  provisioningstate?: number;
  maxmanagedmachinecount?: number;
  statecode?: number;
  passwordchangeddate?: string;
  timezoneruleversionnumber?: number;
  primarypublickey?: string;
  _owningbusinessunit_value?: string;
  keyexpirygraceperiod?: number;
  solutionid?: string;
  _flowmachinenetwork_value?: string;
  managedversion?: number;
  importsequencenumber?: number;
  componentstate?: number;
  domainsetting?: number;
  keyvalidityperiod?: number;
  usagetype?: number;
  _owninguser_value?: string;
  utcconversiontimezonecode?: number;
  name?: string;
  lastrundate?: string;
}
