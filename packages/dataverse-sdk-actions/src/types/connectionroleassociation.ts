import type { BooleanManagedProperty } from "./BooleanManagedProperty.js";

/**
 * connectionroleassociation entity type
 */
export interface connectionroleassociation {
  associatedconnectionroleid?: string;
  componentidunique?: string;
  componentstate?: number;
  connectionroleassociationid?: string;
  connectionroleid?: string;
  iscustomizable?: BooleanManagedProperty;
  ismanaged?: boolean;
  overwritetime?: string;
  solutionid?: string;
  versionnumber?: number;
}
