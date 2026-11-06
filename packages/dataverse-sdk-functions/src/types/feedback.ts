/**
 * feedback entity type
 */
export interface feedback {
  _closedby_value?: string;
  _createdby_value?: string;
  _createdbycontact_value?: string;
  _createdonbehalfby_value?: string;
  _createdonbehalfbycontact_value?: string;
  _modifiedby_value?: string;
  _modifiedonbehalfby_value?: string;
  _msdyn_contextobjectid_value?: string;
  _ownerid_value?: string;
  _owningbusinessunit_value?: string;
  _owningteam_value?: string;
  _owninguser_value?: string;
  _regardingobjectid_value?: string;
  _transactioncurrencyid_value?: string;
  adx_approved?: boolean;
  adx_authorurl?: string;
  adx_contactemail?: string;
  adx_contactusername?: string;
  adx_createdbycontact?: string;
  closedon?: string;
  comments?: string;
  createdon?: string;
  exchangerate?: number;
  feedbackid?: string;
  importsequencenumber?: number;
  maxrating?: number;
  minrating?: number;
  modifiedon?: string;
  normalizedrating?: number;
  overriddencreatedon?: string;
  rating?: number;
  source?: number;
  statecode?: number;
  statuscode?: number;
  title?: string;
  versionnumber?: number;
}
