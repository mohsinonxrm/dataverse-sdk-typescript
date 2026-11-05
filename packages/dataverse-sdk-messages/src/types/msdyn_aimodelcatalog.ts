import type { BooleanManagedProperty } from "./BooleanManagedProperty.js";

/**
 * msdyn_aimodelcatalog entity type
 */
export interface msdyn_aimodelcatalog {
  msdyn_modeltasktype?: number;
  msdyn_modelconfiguration?: string;
  statecode?: number;
  _createdby_value?: string;
  utcconversiontimezonecode?: number;
  _createdonbehalfby_value?: string;
  statuscode?: number;
  _modifiedonbehalfby_value?: string;
  ismanaged?: boolean;
  componentidunique?: string;
  msdyn_modeldescription?: string;
  createdon?: string;
  msdyn_modelsubmissiontype?: number;
  componentstate?: number;
  msdyn_name?: string;
  msdyn_basemodelname?: string;
  overriddencreatedon?: string;
  _modifiedby_value?: string;
  iscustomizable?: BooleanManagedProperty;
  _owningteam_value?: string;
  _msdyn_connectionreferenceid_value?: string;
  modifiedon?: string;
  _owninguser_value?: string;
  msdyn_providertype?: number;
  timezoneruleversionnumber?: number;
  versionnumber?: number;
  msdyn_aimodelcatalogid?: string;
  msdyn_canuseconnection?: boolean;
  overwritetime?: string;
  solutionid?: string;
  _ownerid_value?: string;
  _owningbusinessunit_value?: string;
  importsequencenumber?: number;
}
