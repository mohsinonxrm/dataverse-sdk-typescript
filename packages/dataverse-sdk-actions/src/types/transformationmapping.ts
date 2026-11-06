/**
 * transformationmapping entity type
 */
export interface transformationmapping {
  _createdby_value?: string;
  _createdonbehalfby_value?: string;
  _importmapid_value?: string;
  _modifiedby_value?: string;
  _modifiedonbehalfby_value?: string;
  componentstate?: number;
  createdon?: string;
  introducedversion?: string;
  ismanaged?: boolean;
  modifiedon?: string;
  overwritetime?: string;
  processcode?: number;
  solutionid?: string;
  sourceentityname?: string;
  statecode?: number;
  statuscode?: number;
  targetentityname?: string;
  transformationmappingid?: string;
  transformationmappingidunique?: string;
  transformationtypename?: string;
}
