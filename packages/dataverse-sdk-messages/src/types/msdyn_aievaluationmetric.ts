/**
 * msdyn_aievaluationmetric entity type
 */
export interface msdyn_aievaluationmetric {
  _createdby_value?: string;
  _createdonbehalfby_value?: string;
  _modifiedby_value?: string;
  _modifiedonbehalfby_value?: string;
  createdon?: string;
  importsequencenumber?: number;
  modifiedon?: string;
  msdyn_aievaluationmetricid?: string;
  msdyn_aievaluatorname?: string;
  msdyn_aiobjectid?: string;
  msdyn_aiobjecttype?: string;
  msdyn_evalavgscore?: number;
  msdyn_evalp50score?: number;
  msdyn_evalp75score?: number;
  msdyn_evalp95score?: number;
  msdyn_lastcalculatedat?: string;
  msdyn_lookbackwindowdurationinminutes?: number;
  overriddencreatedon?: string;
  partitionid?: string;
  ttlinseconds?: number;
  versionnumber?: number;
}
