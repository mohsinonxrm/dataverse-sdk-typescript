/**
 * msdyn_salescopilotknowledgebase entity type
 */
export interface msdyn_salescopilotknowledgebase {
  _createdby_value?: string;
  _createdonbehalfby_value?: string;
  _modifiedby_value?: string;
  _modifiedonbehalfby_value?: string;
  _msdyn_salescopilotemailinsightid_value?: string;
  _ownerid_value?: string;
  _owningbusinessunit_value?: string;
  _owningteam_value?: string;
  _owninguser_value?: string;
  createdon?: string;
  importsequencenumber?: number;
  modifiedon?: string;
  msdyn_answer?: string;
  msdyn_answerfetched?: boolean;
  msdyn_citations?: string;
  msdyn_name?: string;
  msdyn_question?: string;
  msdyn_salescopilotknowledgebaseid?: string;
  overriddencreatedon?: string;
  statecode?: number;
  statuscode?: number;
  timezoneruleversionnumber?: number;
  utcconversiontimezonecode?: number;
  versionnumber?: number;
}
