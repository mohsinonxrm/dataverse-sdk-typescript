import type { BooleanManagedProperty } from "./BooleanManagedProperty.js";

/**
 * relationshipattribute entity type
 */
export interface relationshipattribute {
  _organizationid_value?: string;
  _referencedattributeid_value?: string;
  _referencingattributeid_value?: string;
  _relationshipid_value?: string;
  componentidunique?: string;
  componentstate?: number;
  iscustomizable?: BooleanManagedProperty;
  ismanaged?: boolean;
  name?: string;
  overwritetime?: string;
  relationshipattributeid?: string;
  solutionid?: string;
  versionnumber?: number;
}
