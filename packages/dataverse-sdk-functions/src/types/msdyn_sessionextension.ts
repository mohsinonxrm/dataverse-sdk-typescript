import type { BooleanManagedProperty } from "./BooleanManagedProperty.js";

/**
 * msdyn_sessionextension entity type
 */
export interface msdyn_sessionextension {
  msdyn_overflowtriggertimestamp?: string;
  createdon?: string;
  msdyn_intentid?: string;
  _createdonbehalfby_value?: string;
  msdyn_callbackcustomeraddedtime?: string;
  msdyn_sessionextensionid?: string;
  _msdyn_ocliveworkitemid_value?: string;
  msdyn_routingtype?: number;
  _createdby_value?: string;
  componentstate?: number;
  msdyn_overflowaction?: number;
  statecode?: number;
  utcconversiontimezonecode?: number;
  ismanaged?: boolean;
  _modifiedby_value?: string;
  msdyn_outcome?: number;
  _msdyn_sessionid_value?: string;
  componentidunique?: string;
  msdyn_intentgroupid?: string;
  modifiedon?: string;
  msdyn_additionalmetadata?: string;
  msdyn_usertype?: string;
  versionnumber?: number;
  timezoneruleversionnumber?: number;
  overriddencreatedon?: string;
  msdyn_overflowcondition?: number;
  solutionid?: string;
  msdyn_name?: string;
  overwritetime?: string;
  msdyn_ocsessionid?: string;
  msdyn_callbackacceptedtime?: string;
  _organizationid_value?: string;
  msdyn_sourceintentcalculation?: number;
  msdyn_outcomereason?: string;
  importsequencenumber?: number;
  _modifiedonbehalfby_value?: string;
  msdyn_isengaged?: number;
  msdyn_intentfamilyid?: string;
  msdyn_intentstring?: string;
  iscustomizable?: BooleanManagedProperty;
  statuscode?: number;
}
