/**
 * msdyn_routingrequest entity type
 */
export interface msdyn_routingrequest {
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
  msdyn_entitylogicalname?: string;
  msdyn_entityrecordid?: string;
  msdyn_entitysetname?: string;
  msdyn_queueid?: string;
  msdyn_queueitemid?: string;
  msdyn_relationshipnamewithliveworkitem?: string;
  msdyn_routingrequestid?: string;
  msdyn_routingrequesttitle?: string;
  overriddencreatedon?: string;
  statecode?: number;
  statuscode?: number;
  timezoneruleversionnumber?: number;
  utcconversiontimezonecode?: number;
  versionnumber?: number;
}
