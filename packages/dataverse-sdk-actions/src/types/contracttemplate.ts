import type { BooleanManagedProperty } from "./BooleanManagedProperty.js";

/**
 * contracttemplate entity type
 */
export interface contracttemplate {
  effectivitycalendar: string;
  createdon: string;
  name: string;
  timezoneruleversionnumber: number;
  billingfrequencycode: number;
  iscustomizable: BooleanManagedProperty;
  _organizationid_value: string;
  contracttemplateidunique: string;
  overwritetime: string;
  componentstate: number;
  contractservicelevelcode: number;
  contracttemplateid: string;
  _modifiedonbehalfby_value: string;
  importsequencenumber: number;
  versionnumber: number;
  ismanaged: boolean;
  abbreviation: string;
  solutionid: string;
  _createdonbehalfby_value: string;
  usediscountaspercentage: boolean;
  description: string;
  overriddencreatedon: string;
  utcconversiontimezonecode: number;
  allotmenttypecode: number;
  _modifiedby_value: string;
  modifiedon: string;
  introducedversion: string;
  _createdby_value: string;
}
