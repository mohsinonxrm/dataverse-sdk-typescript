/**
 * stagedentityattribute entity type
 */
export interface stagedentityattribute {
  _createdby_value?: string;
  _createdonbehalfby_value?: string;
  _modifiedby_value?: string;
  _modifiedonbehalfby_value?: string;
  attributedescription?: string;
  attributeof?: string;
  attributetypeid?: string;
  componentstate?: number;
  createdon?: string;
  entityid?: string;
  externalname?: string;
  hasmultiplelabels?: boolean;
  importsequencenumber?: number;
  islogical?: boolean;
  ispkattribute?: boolean;
  logicalname?: string;
  modifiedon?: string;
  name?: string;
  originallocalizedescription?: string;
  originallocalizedname?: string;
  overriddencreatedon?: string;
  overwritetime?: string;
  physicalname?: string;
  solutionid?: string;
  stagedentityattributeid?: string;
  stagingexecutioncontextid?: string;
  statecode?: number;
  statuscode?: number;
  timezoneruleversionnumber?: number;
  utcconversiontimezonecode?: number;
  validforreadapi?: boolean;
  versionnumber?: number;
}
