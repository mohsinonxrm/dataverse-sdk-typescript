import type { BooleanManagedProperty } from "./BooleanManagedProperty.js";

/**
 * cardentityconnections entity type
 */
export interface cardentityconnections {
  solutionid?: string;
  ismanaged?: boolean;
  overwritetime?: string;
  versionnumber?: number;
  cardentityconnectionsid?: string;
  iscustomizable?: BooleanManagedProperty;
  entityid?: string;
  componentstate?: number;
  cardid?: string;
  componentidunique?: string;
}
