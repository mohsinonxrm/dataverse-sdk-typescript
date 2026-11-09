import type { BooleanManagedProperty } from "./BooleanManagedProperty.js";

/**
 * privilege entity type
 */
export interface privilege {
  accessright?: number;
  canbebasic?: boolean;
  canbedeep?: boolean;
  canbeentityreference?: boolean;
  canbeglobal?: boolean;
  canbelocal?: boolean;
  canbeparententityreference?: boolean;
  canberecordfilter?: boolean;
  componentstate?: number;
  introducedversion?: string;
  iscustomizable?: BooleanManagedProperty;
  ismanaged?: boolean;
  name?: string;
  overwritetime?: string;
  privilegeid?: string;
  privilegerowid?: string;
  solutionid?: string;
  versionnumber?: number;
}
