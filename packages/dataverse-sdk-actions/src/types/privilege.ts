import type { BooleanManagedProperty } from "./BooleanManagedProperty.js";

/**
 * privilege entity type
 */
export interface privilege {
  canbeentityreference: boolean;
  canberecordfilter: boolean;
  canbeparententityreference: boolean;
  solutionid: string;
  canbedeep: boolean;
  canbebasic: boolean;
  iscustomizable: BooleanManagedProperty;
  versionnumber: number;
  privilegeid: string;
  canbeglobal: boolean;
  overwritetime: string;
  introducedversion: string;
  accessright: number;
  name: string;
  componentstate: number;
  privilegerowid: string;
  canbelocal: boolean;
  ismanaged: boolean;
}
