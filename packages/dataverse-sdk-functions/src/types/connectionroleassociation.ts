import type { BooleanManagedProperty } from "./BooleanManagedProperty.js";

/**
 * connectionroleassociation entity type
 */
export interface connectionroleassociation {
  ismanaged: boolean;
  associatedconnectionroleid: string;
  versionnumber: number;
  connectionroleassociationid: string;
  solutionid: string;
  componentidunique: string;
  iscustomizable: BooleanManagedProperty;
  componentstate: number;
  connectionroleid: string;
  overwritetime: string;
}
