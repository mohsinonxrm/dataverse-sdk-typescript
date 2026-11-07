import type { BooleanManagedProperty } from "./BooleanManagedProperty.js";

/**
 * savedquery entity type
 */
export interface savedquery {
  _createdby_value?: string;
  _createdonbehalfby_value?: string;
  _modifiedby_value?: string;
  _modifiedonbehalfby_value?: string;
  _organizationid_value?: string;
  advancedgroupby?: string;
  canbedeleted?: BooleanManagedProperty;
  columnsetxml?: string;
  componentstate?: number;
  conditionalformatting?: string;
  createdon?: string;
  description?: string;
  enablecrosspartition?: boolean;
  fetchxml?: string;
  introducedversion?: string;
  iscustom?: boolean;
  iscustomizable?: BooleanManagedProperty;
  isdefault?: boolean;
  ismanaged?: boolean;
  isquickfindquery?: boolean;
  isuserdefined?: boolean;
  layoutjson?: string;
  layoutxml?: string;
  modifiedon?: string;
  name?: string;
  offlinesqlquery?: string;
  organizationtaborder?: number;
  overwritetime?: string;
  queryapi?: string;
  queryappusage?: number;
  querytype?: number;
  returnedtypecode?: string;
  roledisplayconditionsxml?: string;
  savedqueryid?: string;
  savedqueryidunique?: string;
  solutionid?: string;
  statecode?: number;
  statuscode?: number;
  versionnumber?: number;
}
