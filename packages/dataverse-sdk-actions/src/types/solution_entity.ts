/**
 * solution entity type
 */
export interface solution {
  _configurationpageid_value?: string;
  _createdby_value?: string;
  _createdonbehalfby_value?: string;
  _modifiedby_value?: string;
  _modifiedonbehalfby_value?: string;
  _organizationid_value?: string;
  _parentsolutionid_value?: string;
  _publisherid_value?: string;
  createdon?: string;
  description?: string;
  enabledforsourcecontrolintegration?: boolean;
  friendlyname?: string;
  installedon?: string;
  isapimanaged?: boolean;
  ismanaged?: boolean;
  isvisible?: boolean;
  modifiedon?: string;
  pinpointassetid?: string;
  pinpointpublisherid?: number;
  pinpointsolutiondefaultlocale?: string;
  pinpointsolutionid?: number;
  solutionid?: string;
  solutionpackageversion?: string;
  solutiontype?: number;
  sourcecontrolsyncstatus?: number;
  templatesuffix?: string;
  thumbprint?: string;
  uniquename?: string;
  updatedon?: string;
  upgradeinfo?: string;
  version?: string;
  versionnumber?: number;
}
