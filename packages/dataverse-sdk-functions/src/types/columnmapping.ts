/**
 * columnmapping entity type
 */
export interface columnmapping {
  _createdby_value?: string;
  _createdonbehalfby_value?: string;
  _importmapid_value?: string;
  _modifiedby_value?: string;
  _modifiedonbehalfby_value?: string;
  columnmappingid?: string;
  columnmappingidunique?: string;
  componentstate?: number;
  createdon?: string;
  introducedversion?: string;
  ismanaged?: boolean;
  modifiedon?: string;
  overwritetime?: string;
  processcode?: number;
  solutionid?: string;
  sourceattributename?: string;
  sourceentityname?: string;
  statecode?: number;
  statuscode?: number;
  targetattributename?: string;
  targetentityname?: string;
}
