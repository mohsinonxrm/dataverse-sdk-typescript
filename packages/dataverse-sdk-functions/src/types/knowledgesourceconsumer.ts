/**
 * knowledgesourceconsumer entity type
 */
export interface knowledgesourceconsumer {
  _createdby_value?: string;
  _createdonbehalfby_value?: string;
  _modifiedby_value?: string;
  _modifiedonbehalfby_value?: string;
  _ownerid_value?: string;
  _owningbusinessunit_value?: string;
  _owningteam_value?: string;
  _owninguser_value?: string;
  active?: boolean;
  channel?: string;
  consumerid?: string;
  createdon?: string;
  description?: string;
  importsequencenumber?: number;
  knowledgesourceconsumerid?: string;
  modifiedon?: string;
  overriddencreatedon?: string;
  statecode?: number;
  statuscode?: number;
  timezoneruleversionnumber?: number;
  type?: number;
  utcconversiontimezonecode?: number;
  versionnumber?: number;
}
