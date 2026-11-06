/**
 * msdyn_activityanalysiscleanupstate entity type
 */
export interface msdyn_activityanalysiscleanupstate {
  _createdby_value?: string;
  _createdonbehalfby_value?: string;
  _modifiedby_value?: string;
  _modifiedonbehalfby_value?: string;
  _organizationid_value?: string;
  createdon?: string;
  importsequencenumber?: number;
  modifiedon?: string;
  msdyn_accountkpicleanupbatchnum?: number;
  msdyn_accountkpicleanupstatus?: number;
  msdyn_activityanalysiscleanupstateid?: string;
  msdyn_contactkpicleanupbatchnum?: number;
  msdyn_contactkpicleanupstatus?: number;
  msdyn_leadkpicleanupbatchnum?: number;
  msdyn_leadkpicleanupstatus?: number;
  msdyn_name?: string;
  msdyn_opportunitykpicleanupbatchnum?: number;
  msdyn_opportunitykpicleanupstatus?: number;
  overriddencreatedon?: string;
  statecode?: number;
  statuscode?: number;
  timezoneruleversionnumber?: number;
  utcconversiontimezonecode?: number;
  versionnumber?: number;
}
