/**
 * backgroundoperation entity type
 */
export interface backgroundoperation {
  ttlinseconds?: number;
  name?: string;
  endtime?: string;
  displayname?: string;
  errormessage?: string;
  inputparameters?: string;
  partitionid?: string;
  starttime?: string;
  runas?: string;
  priority?: number;
  createdon?: string;
  versionnumber?: number;
  outputparameters?: string;
  errorcode?: number;
  retrycount?: number;
  _modifiedonbehalfby_value?: string;
  importsequencenumber?: number;
  backgroundoperationstatuscode?: number;
  backgroundoperationstatecode?: number;
  _modifiedby_value?: string;
  modifiedon?: string;
  _createdby_value?: string;
  overriddencreatedon?: string;
  backgroundoperationid?: string;
  _createdonbehalfby_value?: string;
}
