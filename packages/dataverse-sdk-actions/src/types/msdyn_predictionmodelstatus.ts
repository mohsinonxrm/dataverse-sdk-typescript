/**
 * msdyn_predictionmodelstatus entity type
 */
export interface msdyn_predictionmodelstatus {
  msdyn_modelversion?: string;
  statuscode?: number;
  msdyn_isnewentityadditionopted?: boolean;
  msdyn_changegradesonretrain?: boolean;
  importsequencenumber?: number;
  msdyn_predictiontype?: number;
  msdyn_computationconfig?: string;
  msdyn_status?: string;
  msdyn_modelpath?: string;
  statecode?: number;
  msdyn_timeoutperiodinminutes?: number;
  msdyn_psmopted?: boolean;
  msdyn_validationsetcount?: number;
  msdyn_modelid?: string;
  utcconversiontimezonecode?: number;
  msdyn_trainingconfig?: string;
  versionnumber?: number;
  msdyn_created?: string;
  _modifiedby_value?: string;
  _owningteam_value?: string;
  msdyn_trainingaccuracy?: number;
  createdon?: string;
  msdyn_iscurrent?: boolean;
  msdyn_message?: string;
  _owninguser_value?: string;
  _createdonbehalfby_value?: string;
  msdyn_islandurl?: string;
  _owningbusinessunit_value?: string;
  timezoneruleversionnumber?: number;
  msdyn_usebpfasfilter?: boolean;
  msdyn_retrycounter?: number;
  msdyn_explanationpath?: string;
  msdyn_predictionguid?: string;
  msdyn_isscheduled?: boolean;
  msdyn_dockerimagename?: string;
  msdyn_gradedefinition?: string;
  modifiedon?: string;
  msdyn_trainingauc?: number;
  overriddencreatedon?: string;
  msdyn_signalsused?: number;
  _ownerid_value?: string;
  msdyn_nextcomputation?: string;
  msdyn_modelsource?: number;
  msdyn_name?: string;
  msdyn_testsetcount?: number;
  msdyn_configversion?: string;
  _modifiedonbehalfby_value?: string;
  msdyn_computationfrequency?: number;
  _createdby_value?: string;
  msdyn_predictionmodelstatusid?: string;
  msdyn_predictionname?: string;
  msdyn_trainingsetcount?: number;
  msdyn_publishontrain?: boolean;
}
