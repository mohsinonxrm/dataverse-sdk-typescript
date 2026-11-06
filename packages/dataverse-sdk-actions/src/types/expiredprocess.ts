/**
 * expiredprocess entity type
 */
export interface expiredprocess {
  _activestageid_value?: string;
  _createdby_value?: string;
  _createdonbehalfby_value?: string;
  _knowledgearticleid_value?: string;
  _modifiedby_value?: string;
  _modifiedonbehalfby_value?: string;
  _organizationid_value?: string;
  _processid_value?: string;
  _transactioncurrencyid_value?: string;
  activestagestartedon?: string;
  businessprocessflowinstanceid?: string;
  completedon?: string;
  createdon?: string;
  duration?: number;
  exchangerate?: number;
  importsequencenumber?: number;
  modifiedon?: string;
  name?: string;
  overriddencreatedon?: string;
  statecode?: number;
  statuscode?: number;
  traversedpath?: string;
  versionnumber?: number;
}
