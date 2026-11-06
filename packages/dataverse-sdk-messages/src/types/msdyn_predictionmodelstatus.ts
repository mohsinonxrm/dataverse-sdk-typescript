/**
 * msdyn_predictionmodelstatus entity type
 */
export interface msdyn_predictionmodelstatus {
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
  msdyn_changegradesonretrain?: boolean;
  msdyn_computationconfig?: string;
  msdyn_computationfrequency?: number;
  msdyn_configversion?: string;
  msdyn_created?: string;
  msdyn_dockerimagename?: string;
  msdyn_explanationpath?: string;
  msdyn_gradedefinition?: string;
  msdyn_iscurrent?: boolean;
  msdyn_islandurl?: string;
  msdyn_isnewentityadditionopted?: boolean;
  msdyn_isscheduled?: boolean;
  msdyn_message?: string;
  msdyn_modelid?: string;
  msdyn_modelpath?: string;
  msdyn_modelsource?: number;
  msdyn_modelversion?: string;
  msdyn_name?: string;
  msdyn_nextcomputation?: string;
  msdyn_predictionguid?: string;
  msdyn_predictionmodelstatusid?: string;
  msdyn_predictionname?: string;
  msdyn_predictiontype?: number;
  msdyn_psmopted?: boolean;
  msdyn_publishontrain?: boolean;
  msdyn_retrycounter?: number;
  msdyn_signalsused?: number;
  msdyn_status?: string;
  msdyn_testsetcount?: number;
  msdyn_timeoutperiodinminutes?: number;
  msdyn_trainingaccuracy?: number;
  msdyn_trainingauc?: number;
  msdyn_trainingconfig?: string;
  msdyn_trainingsetcount?: number;
  msdyn_usebpfasfilter?: boolean;
  msdyn_validationsetcount?: number;
  overriddencreatedon?: string;
  statecode?: number;
  statuscode?: number;
  timezoneruleversionnumber?: number;
  utcconversiontimezonecode?: number;
  versionnumber?: number;
}
