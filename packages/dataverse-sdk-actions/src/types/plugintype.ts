/**
 * plugintype entity type
 */
export interface plugintype {
  _createdby_value?: string;
  _createdonbehalfby_value?: string;
  _modifiedby_value?: string;
  _modifiedonbehalfby_value?: string;
  _organizationid_value?: string;
  _pluginassemblyid_value?: string;
  assemblyname?: string;
  componentstate?: number;
  createdon?: string;
  culture?: string;
  customizationlevel?: number;
  customworkflowactivityinfo?: string;
  description?: string;
  friendlyname?: string;
  ismanaged?: boolean;
  isworkflowactivity?: boolean;
  major?: number;
  minor?: number;
  modifiedon?: string;
  name?: string;
  overwritetime?: string;
  plugintypeexportkey?: string;
  plugintypeid?: string;
  plugintypeidunique?: string;
  publickeytoken?: string;
  solutionid?: string;
  typename?: string;
  version?: string;
  versionnumber?: number;
  workflowactivitygroupname?: string;
}
