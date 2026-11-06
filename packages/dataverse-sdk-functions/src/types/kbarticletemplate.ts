import type { BooleanManagedProperty } from "./BooleanManagedProperty.js";

/**
 * kbarticletemplate entity type
 */
export interface kbarticletemplate {
  _createdby_value?: string;
  _createdonbehalfby_value?: string;
  _modifiedby_value?: string;
  _modifiedonbehalfby_value?: string;
  _organizationid_value?: string;
  componentstate?: number;
  createdon?: string;
  description?: string;
  formatxml?: string;
  importsequencenumber?: number;
  introducedversion?: string;
  isactive?: boolean;
  iscustomizable?: BooleanManagedProperty;
  ismanaged?: boolean;
  kbarticletemplateid?: string;
  kbarticletemplateidunique?: string;
  languagecode?: number;
  modifiedon?: string;
  overriddencreatedon?: string;
  overwritetime?: string;
  solutionid?: string;
  structurexml?: string;
  title?: string;
  versionnumber?: number;
}
