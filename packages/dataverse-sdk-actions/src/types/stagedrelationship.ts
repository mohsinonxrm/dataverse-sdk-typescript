/**
 * stagedrelationship entity type
 */
export interface stagedrelationship {
  _createdby_value?: string;
  _createdonbehalfby_value?: string;
  _modifiedby_value?: string;
  _modifiedonbehalfby_value?: string;
  cascadearchive?: number;
  cascadeassign?: number;
  cascadedelete?: number;
  cascadelinkmask?: number;
  cascademerge?: number;
  cascadereparent?: number;
  cascaderollupview?: number;
  cascadeshare?: number;
  cascadeunshare?: number;
  componentstate?: number;
  createdon?: string;
  entitykeyid?: string;
  importsequencenumber?: number;
  introducedversion?: string;
  iscustomrelationship?: boolean;
  islogical?: boolean;
  isrelationshipattributedenormalized?: boolean;
  isvalidforadvancedfind?: boolean;
  modifiedon?: string;
  name?: string;
  overriddencreatedon?: string;
  overwritetime?: string;
  recordid?: number;
  referencedattributeid?: string;
  referencedentityid?: string;
  referencingattributeid?: string;
  referencingentityid?: string;
  relationshiprowid?: string;
  relationshiptype?: number;
  solutionid?: string;
  stagedrelationshipid?: string;
  stagingexecutioncontextid?: string;
  statecode?: number;
  statuscode?: number;
  supportingsolutionid?: string;
  timezoneruleversionnumber?: number;
  utcconversiontimezonecode?: number;
  versionnumber?: number;
}
