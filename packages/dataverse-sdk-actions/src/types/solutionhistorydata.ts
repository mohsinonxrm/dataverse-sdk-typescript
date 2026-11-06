/**
 * solutionhistorydata entity type
 */
export interface solutionhistorydata {
  activityid?: string;
  correlationid?: string;
  description?: string;
  endtime?: string;
  errorcode?: number;
  exceptionmessage?: string;
  exceptionstack?: string;
  ismanaged?: boolean;
  ismicrosoftpublisher?: boolean;
  isoverwritecustomizations?: boolean;
  ispatch?: boolean;
  operation?: number;
  packagename?: string;
  packageversion?: string;
  publishername?: string;
  result?: number;
  solutionhistorydataid?: string;
  solutionid?: string;
  solutionname?: string;
  solutionversion?: string;
  starttime?: string;
  status?: number;
  suboperation?: number;
}
