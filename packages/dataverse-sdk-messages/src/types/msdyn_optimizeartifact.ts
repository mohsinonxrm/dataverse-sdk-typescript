/**
 * msdyn_optimizeartifact entity type
 */
export interface msdyn_optimizeartifact {
  _createdby_value?: string;
  _createdonbehalfby_value?: string;
  _modifiedby_value?: string;
  _modifiedonbehalfby_value?: string;
  _msdyn_optimizepattern_value?: string;
  _msdyn_optimizerun_value?: string;
  _msdyn_optimizerunpass_value?: string;
  _msdyn_optimizeworkitem_value?: string;
  _organizationid_value?: string;
  createdon?: string;
  importsequencenumber?: number;
  modifiedon?: string;
  msdyn_artifactname?: string;
  msdyn_artifactstatus?: number;
  msdyn_charactercount?: number;
  msdyn_contenttype?: string;
  msdyn_contractversion?: string;
  msdyn_inputhash?: string;
  msdyn_itemcount?: number;
  msdyn_name?: string;
  msdyn_optimizeartifactid?: string;
  msdyn_payload?: string;
  msdyn_sequence?: number;
  msdyn_sha256?: string;
  overriddencreatedon?: string;
  statecode?: number;
  statuscode?: number;
  timezoneruleversionnumber?: number;
  utcconversiontimezonecode?: number;
  versionnumber?: number;
}
