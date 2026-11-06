import type { BooleanManagedProperty } from './BooleanManagedProperty.js';

/**
 * aiplugin entity type
 */
export interface aiplugin {
  _aiplugintitle_value?: string;
  _connector_value?: string;
  _createdby_value?: string;
  _createdonbehalfby_value?: string;
  _modifiedby_value?: string;
  _modifiedonbehalfby_value?: string;
  _ownerid_value?: string;
  _owningbusinessunit_value?: string;
  _owningteam_value?: string;
  _owninguser_value?: string;
  _pluginauthid_value?: string;
  aipluginid?: string;
  componentidunique?: string;
  componentstate?: number;
  contactemail?: string;
  createdon?: string;
  humandescription?: string;
  humanname?: string;
  importsequencenumber?: number;
  iscustomizable?: BooleanManagedProperty;
  ismanaged?: boolean;
  legalinfourl?: string;
  modeldescription?: string;
  modelname?: string;
  modifiedon?: string;
  name?: string;
  overriddencreatedon?: string;
  overwritetime?: string;
  pluginsubtype?: number;
  plugintype?: number;
  privacypolicyurl?: string;
  schemaversion?: number;
  sharedconnector?: string;
  solutionid?: string;
  statecode?: number;
  statuscode?: number;
  timezoneruleversionnumber?: number;
  upsertswagger?: string;
  utcconversiontimezonecode?: number;
  versionnumber?: number;
}
