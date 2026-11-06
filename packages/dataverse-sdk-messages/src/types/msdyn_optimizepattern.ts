import type { BooleanManagedProperty } from "./BooleanManagedProperty.js";

/**
 * msdyn_optimizepattern entity type
 */
export interface msdyn_optimizepattern {
  _createdby_value?: string;
  _createdonbehalfby_value?: string;
  _modifiedby_value?: string;
  _modifiedonbehalfby_value?: string;
  _msdyn_optimizeagentfeature_value?: string;
  _msdyn_optimizeentityconfig_value?: string;
  _organizationid_value?: string;
  componentidunique?: string;
  componentstate?: number;
  createdon?: string;
  importsequencenumber?: number;
  iscustomizable?: BooleanManagedProperty;
  ismanaged?: boolean;
  modifiedon?: string;
  msdyn_conditions?: string;
  msdyn_contractversion?: string;
  msdyn_customdataconfiguration?: string;
  msdyn_dataconfiguration?: string;
  msdyn_definition?: string;
  msdyn_healthdefinitions?: string;
  msdyn_includebasedataconfig?: boolean;
  msdyn_maxattempts?: number;
  msdyn_name?: string;
  msdyn_optimizepatternid?: string;
  msdyn_optimizepatterntype?: number;
  msdyn_passplan?: string;
  msdyn_reasontofix?: string;
  msdyn_scenarioversion?: string;
  overriddencreatedon?: string;
  overwritetime?: string;
  solutionid?: string;
  statecode?: number;
  statuscode?: number;
  timezoneruleversionnumber?: number;
  utcconversiontimezonecode?: number;
  versionnumber?: number;
}
