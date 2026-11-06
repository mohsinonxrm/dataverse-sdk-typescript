/**
 * msdyn_assignmentrule entity type
 */
export interface msdyn_assignmentrule {
  _createdby_value?: string;
  _createdonbehalfby_value?: string;
  _modifiedby_value?: string;
  _modifiedonbehalfby_value?: string;
  _msdyn_segmentid_value?: string;
  _ownerid_value?: string;
  _owningbusinessunit_value?: string;
  _owningteam_value?: string;
  _owninguser_value?: string;
  createdon?: string;
  importsequencenumber?: number;
  modifiedon?: string;
  msdyn_SpecificSellersOrTeams?: string;
  msdyn_assignmentruleid?: string;
  msdyn_assignmentwindow?: number;
  msdyn_attributefilter?: string;
  msdyn_description?: string;
  msdyn_distributeto?: number;
  msdyn_distributewithavailability?: boolean;
  msdyn_distributewithcapacity?: boolean;
  msdyn_distributewithrecordcreation?: boolean;
  msdyn_distributiontype?: number;
  msdyn_entityfilter?: string;
  msdyn_evaluateentitymatchindataverse?: boolean;
  msdyn_evaluateownermatchindataverse?: boolean;
  msdyn_evaluationorder?: number;
  msdyn_matchedrecords?: number;
  msdyn_matchtype?: number;
  msdyn_name?: string;
  msdyn_objecttype?: string;
  msdyn_objecttypecode?: number;
  msdyn_recordcreationwindow?: number;
  msdyn_sellerfilter?: string;
  msdyn_triggertype?: number;
  overriddencreatedon?: string;
  statecode?: number;
  statuscode?: number;
  timezoneruleversionnumber?: number;
  utcconversiontimezonecode?: number;
  versionnumber?: number;
}
