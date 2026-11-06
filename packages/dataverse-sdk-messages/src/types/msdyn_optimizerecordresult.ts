/**
 * msdyn_optimizerecordresult entity type
 */
export interface msdyn_optimizerecordresult {
  _createdby_value?: string;
  _createdonbehalfby_value?: string;
  _modifiedby_value?: string;
  _modifiedonbehalfby_value?: string;
  _msdyn_optimizepattern_value?: string;
  _msdyn_optimizerecommendation_value?: string;
  _msdyn_optimizerun_value?: string;
  createdon?: string;
  importsequencenumber?: number;
  modifiedon?: string;
  msdyn_healthstatus?: number;
  msdyn_isfailure?: boolean;
  msdyn_name?: string;
  msdyn_optimizerecordresultid?: string;
  msdyn_regardingobjectid?: string;
  msdyn_regardingobjectname?: string;
  msdyn_result?: string;
  overriddencreatedon?: string;
  partitionid?: string;
  ttlinseconds?: number;
  versionnumber?: number;
}
