/**
 * msdyn_prioritizedactioncatalogue entity type
 */
export interface msdyn_prioritizedactioncatalogue {
  _createdby_value?: string;
  _createdonbehalfby_value?: string;
  _modifiedby_value?: string;
  _modifiedonbehalfby_value?: string;
  _msdyn_rawactioncatalogueid_value?: string;
  _msdyn_sourceagentconfig_value?: string;
  _msdyn_targetentity_value?: string;
  _ownerid_value?: string;
  _owningbusinessunit_value?: string;
  _owningteam_value?: string;
  _owninguser_value?: string;
  createdon?: string;
  importsequencenumber?: number;
  modifiedon?: string;
  msdyn_actionid?: string;
  msdyn_actionscore?: number;
  msdyn_actionuipayload?: string;
  msdyn_actionuistatus?: number;
  msdyn_eventgroupid?: string;
  msdyn_eventid?: string;
  msdyn_eventtype?: string;
  msdyn_expireson?: string;
  msdyn_hascrossedceiling?: boolean;
  msdyn_hascrossedfloor?: boolean;
  msdyn_prioritizedactioncatalogueid?: string;
  msdyn_scoredetails?: string;
  overriddencreatedon?: string;
  statecode?: number;
  statuscode?: number;
  timezoneruleversionnumber?: number;
  utcconversiontimezonecode?: number;
  versionnumber?: number;
}
