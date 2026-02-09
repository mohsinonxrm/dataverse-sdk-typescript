import type { BooleanManagedProperty } from "./BooleanManagedProperty.js";

/**
 * relationshipattribute entity type
 */
export interface relationshipattribute {
  solutionid: string;
  _referencingattributeid_value: string;
  ismanaged: boolean;
  relationshipattributeid: string;
  componentstate: number;
  versionnumber: number;
  name: string;
  _relationshipid_value: string;
  iscustomizable: BooleanManagedProperty;
  componentidunique: string;
  overwritetime: string;
  _referencedattributeid_value: string;
  _organizationid_value: string;
}
