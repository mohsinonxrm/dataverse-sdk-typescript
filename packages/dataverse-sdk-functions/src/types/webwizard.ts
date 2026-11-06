/**
 * webwizard entity type
 */
export interface webwizard {
  _createdby_value?: string;
  _createdonbehalfby_value?: string;
  _modifiedby_value?: string;
  _modifiedonbehalfby_value?: string;
  _organizationid_value?: string;
  accessprivileges?: string;
  componentstate?: number;
  createdon?: string;
  introducedversion?: string;
  ismanaged?: boolean;
  isstaticpagesequence?: boolean;
  modifiedon?: string;
  name?: string;
  overwritetime?: string;
  solutionid?: string;
  startpagesequencenumber?: number;
  titleresourcestring?: string;
  versionnumber?: number;
  webwizardid?: string;
  webwizardidunique?: string;
  wizardpageheight?: number;
  wizardpagewidth?: number;
}
