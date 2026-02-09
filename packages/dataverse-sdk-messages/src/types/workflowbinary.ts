import type { BooleanManagedProperty } from "./BooleanManagedProperty.js";

/**
 * workflowbinary entity type
 */
export interface workflowbinary {
  _createdby_value: string;
  _createdonbehalfby_value: string;
  data: string;
  overriddencreatedon: string;
  importsequencenumber: number;
  _ownerid_value: string;
  utcconversiontimezonecode: number;
  overwritetime: string;
  reference: string;
  metadata: string;
  iscustomizable: BooleanManagedProperty;
  statuscode: number;
  _flowsessionid_value: string;
  componentstate: number;
  _process_value: string;
  workflowbinaryid: string;
  _modifiedby_value: string;
  type: string;
  name: string;
  mimetype: string;
  timezoneruleversionnumber: number;
  componentidunique: string;
  statecode: number;
  data_name: string;
  createdon: string;
  _owningteam_value: string;
  _owningbusinessunit_value: string;
  ismanaged: boolean;
  _owninguser_value: string;
  versionnumber: number;
  _modifiedonbehalfby_value: string;
  modifiedon: string;
  referencename: string;
  solutionid: string;
}
