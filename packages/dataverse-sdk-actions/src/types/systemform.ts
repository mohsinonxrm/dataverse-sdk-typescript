import type { BooleanManagedProperty } from "./BooleanManagedProperty.js";

/**
 * systemform entity type
 */
export interface systemform {
  formjson: string;
  formactivationstate: number;
  overwritetime: string;
  canbedeleted: BooleanManagedProperty;
  type: number;
  componentstate: number;
  version: number;
  description: string;
  istabletenabled: boolean;
  isdefault: boolean;
  _organizationid_value: string;
  _ancestorformid_value: string;
  objecttypecode: string;
  ismanaged: boolean;
  versionnumber: number;
  introducedversion: string;
  formxml: string;
  formidunique: string;
  formpresentation: number;
  formid: string;
  solutionid: string;
  name: string;
  uniquename: string;
  formxmlmanaged: string;
  isdesktopenabled: boolean;
  iscustomizable: BooleanManagedProperty;
  publishedon: string;
  isairmerged: boolean;
}
