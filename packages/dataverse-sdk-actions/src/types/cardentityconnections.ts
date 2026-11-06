import type { BooleanManagedProperty } from "./BooleanManagedProperty.js";

/**
 * cardentityconnections entity type
 */
export interface cardentityconnections {
  cardentityconnectionsid?: string;
  cardid?: string;
  componentidunique?: string;
  componentstate?: number;
  entityid?: string;
  iscustomizable?: BooleanManagedProperty;
  ismanaged?: boolean;
  overwritetime?: string;
  solutionid?: string;
  versionnumber?: number;
}
