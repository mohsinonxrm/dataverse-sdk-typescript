import type { BooleanManagedProperty } from './BooleanManagedProperty.js';

/**
 * flowmachinegroup entity type
 */
export interface flowmachinegroup {
  _createdby_value?: string;
  _createdonbehalfby_value?: string;
  _flowmachineimage_value?: string;
  _flowmachinenetwork_value?: string;
  _modifiedby_value?: string;
  _modifiedonbehalfby_value?: string;
  _ownerid_value?: string;
  _owningbusinessunit_value?: string;
  _owningteam_value?: string;
  _owninguser_value?: string;
  _passwordchangedby_value?: string;
  _rotationstartedby_value?: string;
  componentidunique?: string;
  componentstate?: number;
  createdon?: string;
  description?: string;
  disconnectionplannedon?: string;
  domainsetting?: number;
  flowgrouptype?: number;
  flowmachinegroupid?: string;
  groupmetadata?: string;
  importsequencenumber?: number;
  iscustomizable?: BooleanManagedProperty;
  ismanaged?: boolean;
  keycreationdate?: string;
  keyexpirygraceperiod?: number;
  keyvalidityperiod?: number;
  lastrundate?: string;
  managedversion?: number;
  managementtype?: number;
  maxmanagedmachinecount?: number;
  modifiedon?: string;
  name?: string;
  overriddencreatedon?: string;
  overwritetime?: string;
  passwordchangeddate?: string;
  preferredqueuingtype?: number;
  primarykeypackage?: string;
  primarypublickey?: string;
  provisioningerror?: string;
  provisioningstate?: number;
  secondarykeypackage?: string;
  secondarypublickey?: string;
  solutionid?: string;
  statecode?: number;
  statuscode?: number;
  timezoneruleversionnumber?: number;
  trytoreusewindowssession?: boolean;
  usagetype?: number;
  utcconversiontimezonecode?: number;
  versionnumber?: number;
}
