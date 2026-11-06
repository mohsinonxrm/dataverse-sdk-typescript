import type { BooleanManagedProperty } from "./BooleanManagedProperty.js";

/**
 * msdyn_smartassistconfig entity type
 */
export interface msdyn_smartassistconfig {
  _createdby_value?: string;
  _createdonbehalfby_value?: string;
  _modifiedby_value?: string;
  _modifiedonbehalfby_value?: string;
  _organizationid_value?: string;
  componentidunique?: string;
  componentstate?: number;
  createdon?: string;
  importsequencenumber?: number;
  iscustomizable?: BooleanManagedProperty;
  ismanaged?: boolean;
  modifiedon?: string;
  msdyn_iconurl?: string;
  msdyn_isdefault?: boolean;
  msdyn_maxsuggestioncount?: number;
  msdyn_name?: string;
  msdyn_order?: number;
  msdyn_smartassistconfigid?: string;
  msdyn_sourceentityname?: string;
  msdyn_suggestioncontainertitle?: string;
  msdyn_suggestioncontrolconfiguniquename?: string;
  msdyn_suggestioncontroltype?: number;
  msdyn_suggestionprovider?: string;
  msdyn_suggestiontype?: number;
  msdyn_suggestionwebresourceurl?: string;
  msdyn_uniquename?: string;
  overriddencreatedon?: string;
  overwritetime?: string;
  solutionid?: string;
  statecode?: number;
  statuscode?: number;
  timezoneruleversionnumber?: number;
  utcconversiontimezonecode?: number;
  versionnumber?: number;
}
