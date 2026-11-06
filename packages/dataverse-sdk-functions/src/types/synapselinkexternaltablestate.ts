/**
 * synapselinkexternaltablestate entity type
 */
export interface synapselinkexternaltablestate {
  _createdby_value?: string;
  _createdonbehalfby_value?: string;
  _datalakefolder_value?: string;
  _modifiedby_value?: string;
  _modifiedonbehalfby_value?: string;
  _organizationid_value?: string;
  createdon?: string;
  entityname?: string;
  importsequencenumber?: number;
  lakehouseshortcutstate?: number;
  lastsynchronizedon?: string;
  lastsyncstate?: number;
  maxrecordversion?: number;
  metadataversion?: string;
  minsynceddataversion?: number;
  modifiedon?: string;
  name?: string;
  overriddencreatedon?: string;
  recordcount?: number;
  schemamodifiedon?: string;
  sourcerecordcount?: number;
  statecode?: number;
  statuscode?: number;
  synapsedatabasename?: string;
  synapselinkexternaltablestateid?: string;
  synapseworkspacename?: string;
  tablestate?: number;
  tablestatev2?: number;
  timezoneruleversionnumber?: number;
  trinostate?: number;
  utcconversiontimezonecode?: number;
  versionnumber?: number;
}
