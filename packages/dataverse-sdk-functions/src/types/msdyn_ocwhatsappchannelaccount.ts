import type { BooleanManagedProperty } from "./BooleanManagedProperty.js";

/**
 * msdyn_ocwhatsappchannelaccount entity type
 */
export interface msdyn_ocwhatsappchannelaccount {
  _createdby_value?: string;
  _createdonbehalfby_value?: string;
  _modifiedby_value?: string;
  _modifiedonbehalfby_value?: string;
  _msdyn_provideracsconnectionstringid_value?: string;
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
  msdyn_authenticationtoken?: string;
  msdyn_name?: string;
  msdyn_ocwhatsappchannelaccountid?: string;
  msdyn_provideraccountid?: string;
  msdyn_provideracsresourcename?: string;
  msdyn_providereventgridappid?: string;
  msdyn_providereventgridapptenantid?: string;
  msdyn_providertype?: number;
  msdyn_secureauthenticationtoken?: string;
  msdyn_twilioinboundurl?: string;
  msdyn_whatsappbillingid?: string;
  msdyn_whatsappwabaid?: string;
  overriddencreatedon?: string;
  overwritetime?: string;
  solutionid?: string;
  statecode?: number;
  statuscode?: number;
  timezoneruleversionnumber?: number;
  utcconversiontimezonecode?: number;
  versionnumber?: number;
}
