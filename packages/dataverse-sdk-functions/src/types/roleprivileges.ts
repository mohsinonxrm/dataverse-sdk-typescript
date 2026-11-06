import type { BooleanManagedProperty } from "./BooleanManagedProperty.js";

/**
 * roleprivileges entity type
 */
export interface roleprivileges {
  _recordfilterid_value?: string;
  canbedeleted?: BooleanManagedProperty;
  componentstate?: number;
  ismanaged?: boolean;
  overwritetime?: string;
  privilegedepthmask?: number;
  privilegeid?: string;
  roleid?: string;
  roleprivilegeid?: string;
  roleprivilegeidunique?: string;
  solutionid?: string;
  versionnumber?: number;
}
