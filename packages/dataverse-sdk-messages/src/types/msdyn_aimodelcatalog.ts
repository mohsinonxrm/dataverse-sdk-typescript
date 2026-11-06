import type { BooleanManagedProperty } from "./BooleanManagedProperty.js";

/**
 * msdyn_aimodelcatalog entity type
 */
export interface msdyn_aimodelcatalog {
  _createdby_value?: string;
  _createdonbehalfby_value?: string;
  _modifiedby_value?: string;
  _modifiedonbehalfby_value?: string;
  _msdyn_connectionreferenceid_value?: string;
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
  msdyn_aimodelcatalogid?: string;
  msdyn_basemodelname?: string;
  msdyn_canuseconnection?: boolean;
  msdyn_modelconfiguration?: string;
  msdyn_modeldescription?: string;
  msdyn_modelsubmissiontype?: number;
  msdyn_modeltasktype?: number;
  msdyn_name?: string;
  msdyn_providertype?: number;
  overriddencreatedon?: string;
  overwritetime?: string;
  solutionid?: string;
  statecode?: number;
  statuscode?: number;
  timezoneruleversionnumber?: number;
  utcconversiontimezonecode?: number;
  versionnumber?: number;
}
