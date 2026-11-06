import type { BooleanManagedProperty } from "./BooleanManagedProperty.js";

/**
 * msdyn_sessionextension entity type
 */
export interface msdyn_sessionextension {
  _createdby_value?: string;
  _createdonbehalfby_value?: string;
  _modifiedby_value?: string;
  _modifiedonbehalfby_value?: string;
  _msdyn_ocliveworkitemid_value?: string;
  _msdyn_sessionid_value?: string;
  _organizationid_value?: string;
  componentidunique?: string;
  componentstate?: number;
  createdon?: string;
  importsequencenumber?: number;
  iscustomizable?: BooleanManagedProperty;
  ismanaged?: boolean;
  modifiedon?: string;
  msdyn_additionalmetadata?: string;
  msdyn_callbackacceptedtime?: string;
  msdyn_callbackcustomeraddedtime?: string;
  msdyn_intentfamilyid?: string;
  msdyn_intentgroupid?: string;
  msdyn_intentid?: string;
  msdyn_intentstring?: string;
  msdyn_isengaged?: number;
  msdyn_name?: string;
  msdyn_ocsessionid?: string;
  msdyn_outcome?: number;
  msdyn_outcomereason?: string;
  msdyn_overflowaction?: number;
  msdyn_overflowcondition?: number;
  msdyn_overflowtriggertimestamp?: string;
  msdyn_routingtype?: number;
  msdyn_sessionextensionid?: string;
  msdyn_sourceintentcalculation?: number;
  msdyn_usertype?: string;
  overriddencreatedon?: string;
  overwritetime?: string;
  solutionid?: string;
  statecode?: number;
  statuscode?: number;
  timezoneruleversionnumber?: number;
  utcconversiontimezonecode?: number;
  versionnumber?: number;
}
