/**
 * msdyn_historicalcaseharvestrun entity type
 */
export interface msdyn_historicalcaseharvestrun {
  _createdby_value?: string;
  _createdonbehalfby_value?: string;
  _modifiedby_value?: string;
  _modifiedonbehalfby_value?: string;
  _msdyn_knowledgeharvestplanid_value?: string;
  _ownerid_value?: string;
  _owningbusinessunit_value?: string;
  _owningteam_value?: string;
  _owninguser_value?: string;
  createdon?: string;
  importsequencenumber?: number;
  modifiedon?: string;
  msdyn_additionaldetails?: string;
  msdyn_caseidentificationcompletedon?: string;
  msdyn_conditions?: string;
  msdyn_fieldmapping?: string;
  msdyn_frequencytype?: number;
  msdyn_harvestingdatatype?: number;
  msdyn_harvestsourceentity?: string;
  msdyn_historicalcaseharvestrunid?: string;
  msdyn_pageIndex?: number;
  msdyn_paginationmarker?: string;
  msdyn_totalarticlescreated?: number;
  msdyn_totalcasesdiscovered?: number;
  msdyn_totalcasesprocessed?: number;
  overriddencreatedon?: string;
  processstartedon?: string;
  statecode?: number;
  statuscode?: number;
  timezoneruleversionnumber?: number;
  utcconversiontimezonecode?: number;
  versionnumber?: number;
}
