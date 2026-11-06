import type { BooleanManagedProperty } from './BooleanManagedProperty.js';

/**
 * role entity type
 */
export interface role {
  _businessunitid_value?: string;
  _createdby_value?: string;
  _createdonbehalfby_value?: string;
  _modifiedby_value?: string;
  _modifiedonbehalfby_value?: string;
  _parentroleid_value?: string;
  _parentrootroleid_value?: string;
  _roletemplateid_value?: string;
  applicationid?: string;
  appliesto?: string;
  canbedeleted?: BooleanManagedProperty;
  componentstate?: number;
  createdon?: string;
  description?: string;
  importsequencenumber?: number;
  isautoassigned?: number;
  iscustomizable?: BooleanManagedProperty;
  isinherited?: number;
  ismanaged?: boolean;
  issytemgenerated?: boolean;
  modifiedon?: string;
  name?: string;
  organizationid?: string;
  overriddencreatedon?: string;
  overwritetime?: string;
  roleid?: string;
  roleidunique?: string;
  solutionid?: string;
  summaryofcoretablepermissions?: string;
  versionnumber?: number;
}
