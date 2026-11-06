import type { BooleanManagedProperty } from './BooleanManagedProperty.js';

/**
 * teamtemplate entity type
 */
export interface teamtemplate {
  _createdby_value?: string;
  _createdonbehalfby_value?: string;
  _modifiedby_value?: string;
  _modifiedonbehalfby_value?: string;
  componentidunique?: string;
  componentstate?: number;
  createdon?: string;
  defaultaccessrightsmask?: number;
  description?: string;
  iscustomizable?: BooleanManagedProperty;
  ismanaged?: boolean;
  issystem?: boolean;
  modifiedon?: string;
  objecttypecode?: number;
  overwritetime?: string;
  solutionid?: string;
  teamtemplateid?: string;
  teamtemplatename?: string;
  versionnumber?: number;
}
