import type { BooleanManagedProperty } from "./BooleanManagedProperty.js";

/**
 * serviceplanmapping entity type
 */
export interface serviceplanmapping {
  modifiedon: string;
  timezoneruleversionnumber: number;
  overriddencreatedon: string;
  _modifiedby_value: string;
  createdon: string;
  solutionid: string;
  utcconversiontimezonecode: number;
  _modifiedonbehalfby_value: string;
  statuscode: number;
  serviceplanmappingid: string;
  versionnumber: number;
  featurecontrol: string;
  ismanaged: boolean;
  _entity_value: string;
  overwritetime: string;
  statecode: number;
  _sdkmessage_value: string;
  name: string;
  componentstate: number;
  _customapi_value: string;
  importsequencenumber: number;
  iscustomizable: BooleanManagedProperty;
  _serviceplan_value: string;
  componentidunique: string;
  _createdonbehalfby_value: string;
  _createdby_value: string;
}
