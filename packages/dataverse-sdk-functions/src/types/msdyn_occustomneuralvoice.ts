import type { BooleanManagedProperty } from "./BooleanManagedProperty.js";

/**
 * msdyn_occustomneuralvoice entity type
 */
export interface msdyn_occustomneuralvoice {
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
  msdyn_modeldeploymentid?: string;
  msdyn_modeldeploymentname?: string;
  msdyn_modelid?: string;
  msdyn_modellanguage?: string;
  msdyn_modelname?: string;
  msdyn_name?: string;
  msdyn_occustomneuralvoiceid?: string;
  msdyn_region?: string;
  msdyn_speechinternalid?: string;
  msdyn_speechresourceid?: string;
  msdyn_speechresourcename?: string;
  overriddencreatedon?: string;
  overwritetime?: string;
  solutionid?: string;
  statecode?: number;
  statuscode?: number;
  timezoneruleversionnumber?: number;
  utcconversiontimezonecode?: number;
  versionnumber?: number;
}
