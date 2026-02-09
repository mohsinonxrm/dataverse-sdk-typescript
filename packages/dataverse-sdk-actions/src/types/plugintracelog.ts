/**
 * plugintracelog entity type
 */
export interface plugintracelog {
  secureconfiguration: string;
  organizationid: string;
  persistencekey: string;
  _createdby_value: string;
  performanceexecutionduration: number;
  createdon: string;
  requestid: string;
  plugintracelogid: string;
  performanceconstructorstarttime: string;
  correlationid: string;
  _createdonbehalfby_value: string;
  pluginstepid: string;
  mode: number;
  operationtype: number;
  depth: number;
  performanceconstructorduration: number;
  performanceexecutionstarttime: string;
  configuration: string;
  messagename: string;
  profile: string;
  primaryentity: string;
  typename: string;
  issystemcreated: boolean;
  exceptiondetails: string;
  messageblock: string;
}
