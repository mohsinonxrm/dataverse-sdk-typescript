/**
 * adx_invitation entity type
 */
export interface adx_invitation {
  _adx_assigntoaccount_value?: string;
  _adx_invitecontact_value?: string;
  _adx_invitercontact_value?: string;
  _adx_redeemedcontact_value?: string;
  _adx_redemptionworkflow_value?: string;
  _createdby_value?: string;
  _createdonbehalfby_value?: string;
  _modifiedby_value?: string;
  _modifiedonbehalfby_value?: string;
  _mspp_websiteid_value?: string;
  _ownerid_value?: string;
  _owningbusinessunit_value?: string;
  _owningteam_value?: string;
  _owninguser_value?: string;
  adx_expirydate?: string;
  adx_invitationcode?: string;
  adx_invitationid?: string;
  adx_maximumredemptions?: number;
  adx_name?: string;
  adx_redemptions?: number;
  adx_type?: number;
  createdon?: string;
  importsequencenumber?: number;
  modifiedon?: string;
  overriddencreatedon?: string;
  statecode?: number;
  statuscode?: number;
  timezoneruleversionnumber?: number;
  utcconversiontimezonecode?: number;
  versionnumber?: number;
}
