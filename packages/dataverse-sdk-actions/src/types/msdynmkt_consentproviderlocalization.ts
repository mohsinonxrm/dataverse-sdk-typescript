import type { BooleanManagedProperty } from "./BooleanManagedProperty.js";

/**
 * msdynmkt_consentproviderlocalization entity type
 */
export interface msdynmkt_consentproviderlocalization {
  _createdby_value?: string;
  _createdonbehalfby_value?: string;
  _modifiedby_value?: string;
  _modifiedonbehalfby_value?: string;
  _msdynmkt_msdynmkt_consentprovider_value?: string;
  _organizationid_value?: string;
  componentidunique?: string;
  componentstate?: number;
  createdon?: string;
  importsequencenumber?: number;
  iscustomizable?: BooleanManagedProperty;
  ismanaged?: boolean;
  modifiedon?: string;
  msdynmkt_consentproviderlocalizationid?: string;
  msdynmkt_lcid?: number;
  msdynmkt_localizationkey?: string;
  msdynmkt_localizationvalue?: string;
  overriddencreatedon?: string;
  overwritetime?: string;
  solutionid?: string;
  statecode?: number;
  statuscode?: number;
  timezoneruleversionnumber?: number;
  utcconversiontimezonecode?: number;
  versionnumber?: number;
}
