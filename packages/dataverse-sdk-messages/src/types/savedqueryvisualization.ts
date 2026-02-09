import type { BooleanManagedProperty } from "./BooleanManagedProperty.js";

/**
 * savedqueryvisualization entity type
 */
export interface savedqueryvisualization {
  presentationdescription: string;
  overwritetime: string;
  _createdby_value: string;
  type: number;
  _modifiedby_value: string;
  savedqueryvisualizationidunique: string;
  description: string;
  introducedversion: string;
  charttype: number;
  canbedeleted: BooleanManagedProperty;
  componentstate: number;
  modifiedon: string;
  datadescription: string;
  ismanaged: boolean;
  solutionid: string;
  _modifiedonbehalfby_value: string;
  versionnumber: number;
  savedqueryvisualizationid: string;
  _organizationid_value: string;
  createdon: string;
  name: string;
  enablecrosspartition: boolean;
  isdefault: boolean;
  iscustomizable: BooleanManagedProperty;
  _createdonbehalfby_value: string;
  primaryentitytypecode: string;
  _webresourceid_value: string;
}
