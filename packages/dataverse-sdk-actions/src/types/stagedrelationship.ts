/**
 * stagedrelationship entity type
 */
export interface stagedrelationship {
  entitykeyid: string;
  createdon: string;
  cascadedelete: number;
  cascaderollupview: number;
  cascademerge: number;
  componentstate: number;
  referencedattributeid: string;
  cascadereparent: number;
  _createdonbehalfby_value: string;
  stagedrelationshipid: string;
  referencingattributeid: string;
  referencingentityid: string;
  cascadeassign: number;
  solutionid: string;
  modifiedon: string;
  islogical: boolean;
  versionnumber: number;
  overwritetime: string;
  cascadearchive: number;
  isvalidforadvancedfind: boolean;
  importsequencenumber: number;
  _createdby_value: string;
  statuscode: number;
  utcconversiontimezonecode: number;
  iscustomrelationship: boolean;
  relationshiprowid: string;
  overriddencreatedon: string;
  relationshiptype: number;
  timezoneruleversionnumber: number;
  isrelationshipattributedenormalized: boolean;
  cascadeunshare: number;
  introducedversion: string;
  recordid: number;
  _modifiedonbehalfby_value: string;
  statecode: number;
  supportingsolutionid: string;
  name: string;
  cascadelinkmask: number;
  referencedentityid: string;
  _modifiedby_value: string;
  cascadeshare: number;
  stagingexecutioncontextid: string;
}
