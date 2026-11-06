import type { BooleanManagedProperty } from "./BooleanManagedProperty.js";

/**
 * connectionrole entity type
 */
export interface connectionrole {
  _createdby_value?: string;
  _createdonbehalfby_value?: string;
  _modifiedby_value?: string;
  _modifiedonbehalfby_value?: string;
  _organizationid_value?: string;
  category?: number;
  componentstate?: number;
  connectionroleid?: string;
  connectionroleidunique?: string;
  createdon?: string;
  description?: string;
  importsequencenumber?: number;
  introducedversion?: string;
  iscustomizable?: BooleanManagedProperty;
  ismanaged?: boolean;
  modifiedon?: string;
  name?: string;
  overwritetime?: string;
  solutionid?: string;
  statecode?: number;
  statuscode?: number;
  versionnumber?: number;
}
