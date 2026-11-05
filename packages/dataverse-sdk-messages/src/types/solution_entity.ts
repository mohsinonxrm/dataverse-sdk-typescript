/**
 * solution entity type
 */
export interface solution {
  solutionid?: string;
  _publisherid_value?: string;
  _organizationid_value?: string;
  solutiontype?: number;
  modifiedon?: string;
  installedon?: string;
  uniquename?: string;
  _configurationpageid_value?: string;
  solutionpackageversion?: string;
  upgradeinfo?: string;
  _parentsolutionid_value?: string;
  isapimanaged?: boolean;
  ismanaged?: boolean;
  _modifiedonbehalfby_value?: string;
  sourcecontrolsyncstatus?: number;
  thumbprint?: string;
  updatedon?: string;
  isvisible?: boolean;
  _modifiedby_value?: string;
  versionnumber?: number;
  templatesuffix?: string;
  _createdonbehalfby_value?: string;
  _createdby_value?: string;
  version?: string;
  pinpointassetid?: string;
  pinpointsolutiondefaultlocale?: string;
  description?: string;
  pinpointsolutionid?: number;
  pinpointpublisherid?: number;
  friendlyname?: string;
  enabledforsourcecontrolintegration?: boolean;
  createdon?: string;
}
