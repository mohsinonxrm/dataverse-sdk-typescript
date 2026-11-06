/**
 * knowledgearticleincident entity type
 */
export interface knowledgearticleincident {
  _createdby_value?: string;
  _createdonbehalfby_value?: string;
  _incidentid_value?: string;
  _knowledgearticleid_value?: string;
  _modifiedby_value?: string;
  _modifiedonbehalfby_value?: string;
  _ownerid_value?: string;
  _owningbusinessunit_value?: string;
  _owningteam_value?: string;
  _owninguser_value?: string;
  _transactioncurrencyid_value?: string;
  createdon?: string;
  exchangerate?: number;
  importsequencenumber?: number;
  issenttocustomer?: boolean;
  knowledgearticleincidentid?: string;
  knowledgeusage?: number;
  modifiedon?: string;
  overriddencreatedon?: string;
  statecode?: number;
  statuscode?: number;
  timezoneruleversionnumber?: number;
  utcconversiontimezonecode?: number;
  versionnumber?: number;
}
