import type { BooleanManagedProperty } from "./BooleanManagedProperty.js";

/**
 * msdyn_oclocalizationdata entity type
 */
export interface msdyn_oclocalizationdata {
  _createdby_value?: string;
  _createdonbehalfby_value?: string;
  _modifiedby_value?: string;
  _modifiedonbehalfby_value?: string;
  _msdyn_customerlanguageid_value?: string;
  _msdyn_loc_ocautomatedactionruleid_value?: string;
  _msdyn_presenceid_value?: string;
  _msdyn_systemmessageid_value?: string;
  _organizationid_value?: string;
  componentidunique?: string;
  componentstate?: number;
  createdon?: string;
  importsequencenumber?: number;
  iscustomizable?: BooleanManagedProperty;
  ismanaged?: boolean;
  modifiedon?: string;
  msdyn_defaultlocalizedtext?: string;
  msdyn_entitycolumnname?: string;
  msdyn_entityname?: string;
  msdyn_entityrecordid?: string;
  msdyn_isdefault?: boolean;
  msdyn_languagecode?: number;
  msdyn_localizedtext?: string;
  msdyn_oclocalizationdataid?: string;
  overriddencreatedon?: string;
  overwritetime?: string;
  solutionid?: string;
  statecode?: number;
  statuscode?: number;
  timezoneruleversionnumber?: number;
  utcconversiontimezonecode?: number;
  versionnumber?: number;
}
