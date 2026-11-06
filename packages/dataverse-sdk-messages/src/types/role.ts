import type { BooleanManagedProperty } from "./BooleanManagedProperty.js";

/**
 * role entity type
 */
export interface role {
  canbedeleted?: BooleanManagedProperty;
  _parentrootroleid_value?: string;
  importsequencenumber?: number;
  overriddencreatedon?: string;
  _roletemplateid_value?: string;
  createdon?: string;
  roleidunique?: string;
  ismanaged?: boolean;
  _modifiedby_value?: string;
  isinherited?: number;
  modifiedon?: string;
  description?: string;
  appliesto?: string;
  organizationid?: string;
  solutionid?: string;
  name?: string;
  componentstate?: number;
  roleid?: string;
  summaryofcoretablepermissions?: string;
  _createdby_value?: string;
  _createdonbehalfby_value?: string;
  versionnumber?: number;
  issytemgenerated?: boolean;
  iscustomizable?: BooleanManagedProperty;
  isautoassigned?: number;
  _businessunitid_value?: string;
  applicationid?: string;
  _modifiedonbehalfby_value?: string;
  _parentroleid_value?: string;
  overwritetime?: string;
}
