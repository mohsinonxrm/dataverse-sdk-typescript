/**
 * msdyn_solutionhistory entity type
 */
export interface msdyn_solutionhistory {
  msdyn_activityid?: string;
  msdyn_correlationid?: string;
  msdyn_endtime?: string;
  msdyn_errorcode?: string;
  msdyn_exceptionmessage?: string;
  msdyn_exceptionstack?: string;
  msdyn_ismanaged?: boolean;
  msdyn_isoverwritecustomizations?: boolean;
  msdyn_ispatch?: boolean;
  msdyn_maxretries?: number;
  msdyn_name?: string;
  msdyn_operation?: number;
  msdyn_packagename?: string;
  msdyn_packageversion?: string;
  msdyn_publisherid?: string;
  msdyn_publishername?: string;
  msdyn_result?: boolean;
  msdyn_retrycount?: number;
  msdyn_solutionhistorydescription?: string;
  msdyn_solutionhistoryid?: string;
  msdyn_solutionid?: string;
  msdyn_solutionversion?: string;
  msdyn_starttime?: string;
  msdyn_status?: number;
  msdyn_suboperation?: number;
  msdyn_totaltime?: number;
}
