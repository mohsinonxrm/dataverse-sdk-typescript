import type { BooleanManagedProperty } from './BooleanManagedProperty.js';

/**
 * connectionreference entity type
 */
export interface connectionreference {
  _createdby_value?: string;
  _createdonbehalfby_value?: string;
  _customconnectorid_value?: string;
  _modifiedby_value?: string;
  _modifiedonbehalfby_value?: string;
  _ownerid_value?: string;
  _owningbusinessunit_value?: string;
  _owningteam_value?: string;
  _owninguser_value?: string;
  componentidunique?: string;
  componentstate?: number;
  connectionid?: string;
  connectionparametersconfig?: string;
  connectionparametersetconfig?: string;
  connectionreferencedisplayname?: string;
  connectionreferenceid?: string;
  connectionreferencelogicalname?: string;
  connectorid?: string;
  createdon?: string;
  description?: string;
  importsequencenumber?: number;
  iscustomizable?: BooleanManagedProperty;
  ismanaged?: boolean;
  modifiedon?: string;
  overriddencreatedon?: string;
  overwritetime?: string;
  promptingbehavior?: number;
  solutionid?: string;
  statecode?: number;
  statuscode?: number;
  timezoneruleversionnumber?: number;
  utcconversiontimezonecode?: number;
  versionnumber?: number;
}
