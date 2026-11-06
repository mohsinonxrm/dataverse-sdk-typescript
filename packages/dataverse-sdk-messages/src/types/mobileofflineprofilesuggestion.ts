import type { BooleanManagedProperty } from "./BooleanManagedProperty.js";

/**
 * mobileofflineprofilesuggestion entity type
 */
export interface mobileofflineprofilesuggestion {
  _acceptedby_value?: string;
  _createdby_value?: string;
  _createdonbehalfby_value?: string;
  _mobileofflineprofileid_value?: string;
  _modifiedby_value?: string;
  _modifiedonbehalfby_value?: string;
  _organizationid_value?: string;
  acceptedon?: string;
  appid?: string;
  appname?: string;
  appversion?: string;
  changepayloadjson?: string;
  componentidunique?: string;
  componentstate?: number;
  createdon?: string;
  description?: string;
  environmentid?: string;
  importsequencenumber?: number;
  isaccepted?: boolean;
  iscustomizable?: BooleanManagedProperty;
  ismanaged?: boolean;
  mobileofflineprofilename?: string;
  mobileofflineprofilesuggestionid?: string;
  mobileofflineprofileversionnumber?: number;
  modifiedon?: string;
  name?: string;
  overriddencreatedon?: string;
  overwritetime?: string;
  rationale?: string;
  rulecategory?: string;
  ruleids?: string;
  solutionid?: string;
  statecode?: number;
  statuscode?: number;
  suggestiontype?: number;
  timezoneruleversionnumber?: number;
  utcconversiontimezonecode?: number;
  versionnumber?: number;
  whatchanged?: string;
}
