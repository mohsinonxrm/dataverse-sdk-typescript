import type { BooleanManagedProperty } from "./BooleanManagedProperty.js";

/**
 * connectionrole entity type
 */
export interface connectionrole {
  _organizationid_value: string;
  importsequencenumber: number;
  createdon: string;
  description: string;
  overwritetime: string;
  _modifiedby_value: string;
  iscustomizable: BooleanManagedProperty;
  modifiedon: string;
  name: string;
  solutionid: string;
  _modifiedonbehalfby_value: string;
  category: number;
  connectionroleidunique: string;
  statecode: number;
  versionnumber: number;
  connectionroleid: string;
  componentstate: number;
  ismanaged: boolean;
  statuscode: number;
  _createdonbehalfby_value: string;
  introducedversion: string;
  _createdby_value: string;
}
