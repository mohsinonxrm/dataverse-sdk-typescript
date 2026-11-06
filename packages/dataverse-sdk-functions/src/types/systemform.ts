import type { BooleanManagedProperty } from './BooleanManagedProperty.js';

/**
 * systemform entity type
 */
export interface systemform {
  _ancestorformid_value?: string;
  _organizationid_value?: string;
  canbedeleted?: BooleanManagedProperty;
  componentstate?: number;
  description?: string;
  formactivationstate?: number;
  formid?: string;
  formidunique?: string;
  formjson?: string;
  formpresentation?: number;
  formxml?: string;
  formxmlmanaged?: string;
  introducedversion?: string;
  isairmerged?: boolean;
  iscustomizable?: BooleanManagedProperty;
  isdefault?: boolean;
  isdesktopenabled?: boolean;
  ismanaged?: boolean;
  istabletenabled?: boolean;
  name?: string;
  objecttypecode?: string;
  overwritetime?: string;
  publishedon?: string;
  solutionid?: string;
  type?: number;
  uniquename?: string;
  version?: number;
  versionnumber?: number;
}
