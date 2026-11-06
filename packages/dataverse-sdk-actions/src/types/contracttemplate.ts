import type { BooleanManagedProperty } from "./BooleanManagedProperty.js";

/**
 * contracttemplate entity type
 */
export interface contracttemplate {
  _createdby_value?: string;
  _createdonbehalfby_value?: string;
  _modifiedby_value?: string;
  _modifiedonbehalfby_value?: string;
  _organizationid_value?: string;
  abbreviation?: string;
  allotmenttypecode?: number;
  billingfrequencycode?: number;
  componentstate?: number;
  contractservicelevelcode?: number;
  contracttemplateid?: string;
  contracttemplateidunique?: string;
  createdon?: string;
  description?: string;
  effectivitycalendar?: string;
  importsequencenumber?: number;
  introducedversion?: string;
  iscustomizable?: BooleanManagedProperty;
  ismanaged?: boolean;
  modifiedon?: string;
  name?: string;
  overriddencreatedon?: string;
  overwritetime?: string;
  solutionid?: string;
  timezoneruleversionnumber?: number;
  usediscountaspercentage?: boolean;
  utcconversiontimezonecode?: number;
  versionnumber?: number;
}
