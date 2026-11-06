/**
 * msdyn_transactionorigin entity type
 */
export interface msdyn_transactionorigin {
  _createdby_value?: string;
  _createdonbehalfby_value?: string;
  _modifiedby_value?: string;
  _modifiedonbehalfby_value?: string;
  _ownerid_value?: string;
  _owningbusinessunit_value?: string;
  _owningteam_value?: string;
  _owninguser_value?: string;
  createdon?: string;
  importsequencenumber?: number;
  modifiedon?: string;
  msdyn_name?: string;
  msdyn_origin?: string;
  msdyn_origintype?: string;
  msdyn_transaction?: string;
  msdyn_transactionoriginid?: string;
  msdyn_transactiontype?: string;
  overriddencreatedon?: string;
  statecode?: number;
  statuscode?: number;
  timezoneruleversionnumber?: number;
  utcconversiontimezonecode?: number;
  versionnumber?: number;
}
