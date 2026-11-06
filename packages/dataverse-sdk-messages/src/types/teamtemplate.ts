import type { BooleanManagedProperty } from "./BooleanManagedProperty.js";

/**
 * teamtemplate entity type
 */
export interface teamtemplate {
  overwritetime?: string;
  objecttypecode?: number;
  ismanaged?: boolean;
  versionnumber?: number;
  issystem?: boolean;
  description?: string;
  _modifiedby_value?: string;
  iscustomizable?: BooleanManagedProperty;
  componentidunique?: string;
  modifiedon?: string;
  solutionid?: string;
  _createdby_value?: string;
  teamtemplateid?: string;
  componentstate?: number;
  teamtemplatename?: string;
  defaultaccessrightsmask?: number;
  _modifiedonbehalfby_value?: string;
  _createdonbehalfby_value?: string;
  createdon?: string;
}
