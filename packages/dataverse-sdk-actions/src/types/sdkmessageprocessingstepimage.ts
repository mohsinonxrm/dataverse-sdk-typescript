import type { BooleanManagedProperty } from "./BooleanManagedProperty.js";

/**
 * sdkmessageprocessingstepimage entity type
 */
export interface sdkmessageprocessingstepimage {
  _createdby_value?: string;
  _createdonbehalfby_value?: string;
  _modifiedby_value?: string;
  _modifiedonbehalfby_value?: string;
  _organizationid_value?: string;
  _sdkmessageprocessingstepid_value?: string;
  attributes?: string;
  componentstate?: number;
  createdon?: string;
  customizationlevel?: number;
  description?: string;
  entityalias?: string;
  imagetype?: number;
  introducedversion?: string;
  iscustomizable?: BooleanManagedProperty;
  ismanaged?: boolean;
  messagepropertyname?: string;
  modifiedon?: string;
  name?: string;
  overwritetime?: string;
  relatedattributename?: string;
  sdkmessageprocessingstepimageid?: string;
  sdkmessageprocessingstepimageidunique?: string;
  solutionid?: string;
  versionnumber?: number;
}
