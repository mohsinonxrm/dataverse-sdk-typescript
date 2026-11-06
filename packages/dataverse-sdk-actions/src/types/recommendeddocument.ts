/**
 * recommendeddocument entity type
 */
export interface recommendeddocument {
  _createdby_value?: string;
  _createdonbehalfby_value?: string;
  _modifiedby_value?: string;
  _modifiedonbehalfby_value?: string;
  _organizationid_value?: string;
  _regardingobjectid_value?: string;
  _transactioncurrencyid_value?: string;
  absoluteurl?: string;
  associatedrecordname?: string;
  author?: string;
  contenttype?: string;
  createdon?: string;
  editurl?: string;
  exchangerate?: number;
  externaldocumentid?: string;
  externalmodifiedby?: string;
  filesize?: number;
  filetype?: string;
  fullname?: string;
  iconclassname?: string;
  location?: string;
  modifiedon?: string;
  readurl?: string;
  recommendeddocumentid?: string;
  source?: string;
  timezoneruleversionnumber?: number;
  title?: string;
  utcconversiontimezonecode?: number;
  version?: string;
  versionnumber?: number;
}
