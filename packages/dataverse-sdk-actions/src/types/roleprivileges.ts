import type { BooleanManagedProperty } from "./BooleanManagedProperty.js";

/**
 * roleprivileges entity type
 */
export interface roleprivileges {
  privilegeid?: string;
  roleid?: string;
  privilegedepthmask?: number;
  ismanaged?: boolean;
  canbedeleted?: BooleanManagedProperty;
  overwritetime?: string;
  roleprivilegeid?: string;
  solutionid?: string;
  versionnumber?: number;
  componentstate?: number;
  roleprivilegeidunique?: string;
  _recordfilterid_value?: string;
}
