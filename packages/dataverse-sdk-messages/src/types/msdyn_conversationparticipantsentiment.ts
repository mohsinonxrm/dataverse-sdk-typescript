/**
 * msdyn_conversationparticipantsentiment entity type
 */
export interface msdyn_conversationparticipantsentiment {
  _createdby_value?: string;
  _createdonbehalfby_value?: string;
  _modifiedby_value?: string;
  _modifiedonbehalfby_value?: string;
  _msdyn_conversationparticipantinsights_value?: string;
  _ownerid_value?: string;
  _owningbusinessunit_value?: string;
  _owningteam_value?: string;
  _owninguser_value?: string;
  createdon?: string;
  importsequencenumber?: number;
  modifiedon?: string;
  msdyn_conversationparticipantsentimentid?: string;
  msdyn_name?: string;
  msdyn_overallnegativesentiment?: number;
  msdyn_overallneutralsentiment?: number;
  msdyn_overallpositivesentiment?: number;
  overriddencreatedon?: string;
  statecode?: number;
  statuscode?: number;
  timezoneruleversionnumber?: number;
  utcconversiontimezonecode?: number;
  versionnumber?: number;
}
