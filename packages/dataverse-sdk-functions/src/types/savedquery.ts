import type { BooleanManagedProperty } from "./BooleanManagedProperty.js";

/**
 * savedquery entity type
 */
export interface savedquery {
  offlinesqlquery?: string;
  organizationtaborder?: number;
  _createdby_value?: string;
  isuserdefined?: boolean;
  columnsetxml?: string;
  querytype?: number;
  conditionalformatting?: string;
  queryapi?: string;
  advancedgroupby?: string;
  canbedeleted?: BooleanManagedProperty;
  returnedtypecode?: string;
  isquickfindquery?: boolean;
  _organizationid_value?: string;
  solutionid?: string;
  name?: string;
  iscustomizable?: BooleanManagedProperty;
  createdon?: string;
  _modifiedby_value?: string;
  layoutxml?: string;
  layoutjson?: string;
  fetchxml?: string;
  description?: string;
  versionnumber?: number;
  componentstate?: number;
  roledisplayconditionsxml?: string;
  _modifiedonbehalfby_value?: string;
  savedqueryid?: string;
  overwritetime?: string;
  introducedversion?: string;
  iscustom?: boolean;
  statuscode?: number;
  queryappusage?: number;
  savedqueryidunique?: string;
  _createdonbehalfby_value?: string;
  modifiedon?: string;
  enablecrosspartition?: boolean;
  isdefault?: boolean;
  ismanaged?: boolean;
  statecode?: number;
}
