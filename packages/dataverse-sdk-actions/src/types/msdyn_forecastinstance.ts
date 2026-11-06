/**
 * msdyn_forecastinstance entity type
 */
export interface msdyn_forecastinstance {
  _createdby_value?: string;
  _createdonbehalfby_value?: string;
  _modifiedby_value?: string;
  _modifiedonbehalfby_value?: string;
  _msdyn_forecastdefinitionid_value?: string;
  _msdyn_forecastparentid_value?: string;
  _msdyn_forecastrecurrenceid_value?: string;
  _msdyn_matchinggoalid_value?: string;
  _ownerid_value?: string;
  _owningbusinessunit_value?: string;
  _owningteam_value?: string;
  _owninguser_value?: string;
  _transactioncurrencyid_value?: string;
  createdon?: string;
  exchangerate?: number;
  importsequencenumber?: number;
  modifiedon?: string;
  msdyn_actualamount?: number;
  msdyn_actualamount_base?: number;
  msdyn_bestcaseamount?: number;
  msdyn_bestcaseamount_base?: number;
  msdyn_committedamount?: number;
  msdyn_committedamount_base?: number;
  msdyn_forecastinstanceid?: string;
  msdyn_forecastinstancetype?: number;
  msdyn_forecastname?: string;
  msdyn_ismanualbestcase?: number;
  msdyn_ismanualcommitted?: number;
  msdyn_ismanualpipeline?: number;
  msdyn_isquotasourcemanual?: boolean;
  msdyn_level?: number;
  msdyn_manualbestcaseamount?: number;
  msdyn_manualbestcaseamount_base?: number;
  msdyn_manualcommittedamount?: number;
  msdyn_manualcommittedamount_base?: number;
  msdyn_manualpipelineamount?: number;
  msdyn_manualpipelineamount_base?: number;
  msdyn_percentageachieved?: number;
  msdyn_pipelineamount?: number;
  msdyn_pipelineamount_base?: number;
  msdyn_recurrenceindex?: number;
  msdyn_targetamount?: number;
  msdyn_targetamount_base?: number;
  overriddencreatedon?: string;
  statecode?: number;
  statuscode?: number;
  timezoneruleversionnumber?: number;
  utcconversiontimezonecode?: number;
  versionnumber?: number;
}
