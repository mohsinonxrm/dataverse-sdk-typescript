/**
 * salesliterature entity type
 */
export interface salesliterature {
  _createdby_value?: string;
  _createdonbehalfby_value?: string;
  _employeecontactid_value?: string;
  _modifiedby_value?: string;
  _modifiedonbehalfby_value?: string;
  _organizationid_value?: string;
  _subjectid_value?: string;
  _transactioncurrencyid_value?: string;
  createdon?: string;
  description?: string;
  entityimage?: string;
  entityimage_timestamp?: number;
  entityimage_url?: string;
  entityimageid?: string;
  exchangerate?: number;
  expirationdate?: string;
  hasattachments?: boolean;
  importsequencenumber?: number;
  iscustomerviewable?: boolean;
  keywords?: string;
  literaturetypecode?: number;
  modifiedon?: string;
  name?: string;
  overriddencreatedon?: string;
  processid?: string;
  salesliteratureid?: string;
  stageid?: string;
  timezoneruleversionnumber?: number;
  traversedpath?: string;
  utcconversiontimezonecode?: number;
  versionnumber?: number;
}
