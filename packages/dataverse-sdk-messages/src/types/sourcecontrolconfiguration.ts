/**
 * sourcecontrolconfiguration entity type
 */
export interface sourcecontrolconfiguration {
  _createdby_value?: string;
  _createdonbehalfby_value?: string;
  _githubappconfigid_value?: string;
  _modifiedby_value?: string;
  _modifiedonbehalfby_value?: string;
  createdon?: string;
  enterprisesubdomain?: string;
  gitprovider?: number;
  importsequencenumber?: number;
  modifiedon?: string;
  name?: string;
  organizationname?: string;
  overriddencreatedon?: string;
  partitionid?: string;
  projectname?: string;
  repositoryname?: string;
  sourcecontrolconfigurationid?: string;
  ttlinseconds?: number;
  versionnumber?: number;
}
