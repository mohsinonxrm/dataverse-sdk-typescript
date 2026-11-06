/**
 * backgroundoperation entity type
 */
export interface backgroundoperation {
  _createdby_value?: string;
  _createdonbehalfby_value?: string;
  _modifiedby_value?: string;
  _modifiedonbehalfby_value?: string;
  backgroundoperationid?: string;
  backgroundoperationstatecode?: number;
  backgroundoperationstatuscode?: number;
  createdon?: string;
  displayname?: string;
  endtime?: string;
  errorcode?: number;
  errormessage?: string;
  importsequencenumber?: number;
  inputparameters?: string;
  modifiedon?: string;
  name?: string;
  outputparameters?: string;
  overriddencreatedon?: string;
  partitionid?: string;
  priority?: number;
  retrycount?: number;
  runas?: string;
  starttime?: string;
  ttlinseconds?: number;
  versionnumber?: number;
}
