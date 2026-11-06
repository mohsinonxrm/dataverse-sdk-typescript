/**
 * msdyn_copilotevent entity type
 */
export interface msdyn_copilotevent {
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
  msdyn_aiagent?: number;
  msdyn_clienttimestamp?: string;
  msdyn_copiloteventid?: string;
  msdyn_interactioncontext?: string;
  msdyn_interactiondata?: string;
  msdyn_interactiondata_name?: string;
  msdyn_interactiondatabody?: string;
  msdyn_interactionforid?: string;
  msdyn_interactionforlogicalname?: string;
  msdyn_interactiontype?: number;
  msdyn_name?: string;
  msdyn_scenariorequestid?: string;
  msdyn_scenariotype?: number;
  msdyn_verbatim?: string;
  overriddencreatedon?: string;
  partitionid?: string;
  ttlinseconds?: number;
  versionnumber?: number;
}
