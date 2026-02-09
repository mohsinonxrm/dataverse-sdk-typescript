import type { BooleanManagedProperty } from "./BooleanManagedProperty.js";

/**
 * kbarticletemplate entity type
 */
export interface kbarticletemplate {
  kbarticletemplateid: string;
  iscustomizable: BooleanManagedProperty;
  importsequencenumber: number;
  _modifiedby_value: string;
  languagecode: number;
  _createdonbehalfby_value: string;
  kbarticletemplateidunique: string;
  solutionid: string;
  componentstate: number;
  createdon: string;
  structurexml: string;
  _modifiedonbehalfby_value: string;
  versionnumber: number;
  isactive: boolean;
  description: string;
  ismanaged: boolean;
  formatxml: string;
  title: string;
  modifiedon: string;
  overriddencreatedon: string;
  introducedversion: string;
  _organizationid_value: string;
  _createdby_value: string;
  overwritetime: string;
}
