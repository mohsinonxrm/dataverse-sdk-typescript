/**
 * kbarticle entity type
 */
export interface kbarticle {
  _createdby_value?: string;
  _createdonbehalfby_value?: string;
  _kbarticletemplateid_value?: string;
  _modifiedby_value?: string;
  _modifiedonbehalfby_value?: string;
  _organizationid_value?: string;
  _subjectid_value?: string;
  _transactioncurrencyid_value?: string;
  adx_averagerating?: number;
  adx_averagerating_int?: number;
  adx_downvotes?: number;
  adx_ratingcount?: number;
  adx_ratingsum?: number;
  adx_upvotes?: number;
  articlexml?: string;
  comments?: string;
  content?: string;
  createdon?: string;
  description?: string;
  entityimage?: string;
  entityimage_timestamp?: number;
  entityimage_url?: string;
  entityimageid?: string;
  exchangerate?: number;
  importsequencenumber?: number;
  kbarticleid?: string;
  keywords?: string;
  languagecode?: number;
  modifiedon?: string;
  msa_publishtoweb?: boolean;
  number?: string;
  overriddencreatedon?: string;
  statecode?: number;
  statuscode?: number;
  title?: string;
  versionnumber?: number;
}
