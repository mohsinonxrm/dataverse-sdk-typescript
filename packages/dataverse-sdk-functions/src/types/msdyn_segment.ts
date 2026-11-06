/**
 * msdyn_segment entity type
 */
export interface msdyn_segment {
  _createdby_value?: string;
  _createdonbehalfby_value?: string;
  _modifiedby_value?: string;
  _modifiedonbehalfby_value?: string;
  _msdyn_sequence_value?: string;
  _ownerid_value?: string;
  _owningbusinessunit_value?: string;
  _owningteam_value?: string;
  _owninguser_value?: string;
  createdon?: string;
  importsequencenumber?: number;
  modifiedon?: string;
  msdyn_description?: string;
  msdyn_entityfieldname?: string;
  msdyn_entityfilter?: string;
  msdyn_evaluateindataverse?: boolean;
  msdyn_isresegmentationenabled?: boolean;
  msdyn_isroutingenabledforresegmentation?: boolean;
  msdyn_name?: string;
  msdyn_objecttype?: string;
  msdyn_objecttypecode?: number;
  msdyn_segmentid?: string;
  msdyn_segmenttype?: number;
  msdyn_triggertype?: number;
  overriddencreatedon?: string;
  statecode?: number;
  statuscode?: number;
  timezoneruleversionnumber?: number;
  utcconversiontimezonecode?: number;
  versionnumber?: number;
}
