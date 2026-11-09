import type { BooleanManagedProperty } from "./BooleanManagedProperty.js";

/**
 * savedqueryvisualization entity type
 */
export interface savedqueryvisualization {
  _createdby_value?: string;
  _createdonbehalfby_value?: string;
  _modifiedby_value?: string;
  _modifiedonbehalfby_value?: string;
  _organizationid_value?: string;
  _webresourceid_value?: string;
  canbedeleted?: BooleanManagedProperty;
  charttype?: number;
  componentstate?: number;
  createdon?: string;
  datadescription?: string;
  description?: string;
  enablecrosspartition?: boolean;
  introducedversion?: string;
  iscustomizable?: BooleanManagedProperty;
  isdefault?: boolean;
  ismanaged?: boolean;
  modifiedon?: string;
  name?: string;
  overwritetime?: string;
  presentationdescription?: string;
  primaryentitytypecode?: string;
  savedqueryvisualizationid?: string;
  savedqueryvisualizationidunique?: string;
  solutionid?: string;
  type?: number;
  versionnumber?: number;
}
