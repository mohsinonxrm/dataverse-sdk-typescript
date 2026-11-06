/**
 * plugintracelog entity type
 */
export interface plugintracelog {
  _createdby_value?: string;
  _createdonbehalfby_value?: string;
  configuration?: string;
  correlationid?: string;
  createdon?: string;
  depth?: number;
  exceptiondetails?: string;
  issystemcreated?: boolean;
  messageblock?: string;
  messagename?: string;
  mode?: number;
  operationtype?: number;
  organizationid?: string;
  performanceconstructorduration?: number;
  performanceconstructorstarttime?: string;
  performanceexecutionduration?: number;
  performanceexecutionstarttime?: string;
  persistencekey?: string;
  pluginstepid?: string;
  plugintracelogid?: string;
  primaryentity?: string;
  profile?: string;
  requestid?: string;
  secureconfiguration?: string;
  typename?: string;
}
