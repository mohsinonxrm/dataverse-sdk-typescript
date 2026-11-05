import type { BooleanManagedProperty } from "./BooleanManagedProperty.js";

/**
 * msdyn_smartassistconfig entity type
 */
export interface msdyn_smartassistconfig {
  _createdby_value?: string;
  ismanaged?: boolean;
  msdyn_uniquename?: string;
  versionnumber?: number;
  _modifiedonbehalfby_value?: string;
  componentstate?: number;
  iscustomizable?: BooleanManagedProperty;
  statuscode?: number;
  componentidunique?: string;
  _modifiedby_value?: string;
  msdyn_maxsuggestioncount?: number;
  msdyn_suggestionprovider?: string;
  importsequencenumber?: number;
  createdon?: string;
  msdyn_smartassistconfigid?: string;
  _organizationid_value?: string;
  msdyn_suggestiontype?: number;
  msdyn_name?: string;
  _createdonbehalfby_value?: string;
  statecode?: number;
  msdyn_suggestioncontainertitle?: string;
  msdyn_suggestionwebresourceurl?: string;
  msdyn_order?: number;
  modifiedon?: string;
  msdyn_iconurl?: string;
  utcconversiontimezonecode?: number;
  msdyn_isdefault?: boolean;
  timezoneruleversionnumber?: number;
  overriddencreatedon?: string;
  msdyn_sourceentityname?: string;
  solutionid?: string;
  overwritetime?: string;
  msdyn_suggestioncontrolconfiguniquename?: string;
  msdyn_suggestioncontroltype?: number;
}
