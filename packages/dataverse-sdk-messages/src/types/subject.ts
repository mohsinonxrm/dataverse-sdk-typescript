/**
 * subject entity type
 */
export interface subject {
  _createdby_value?: string;
  _createdbyexternalparty_value?: string;
  _createdonbehalfby_value?: string;
  _modifiedby_value?: string;
  _modifiedbyexternalparty_value?: string;
  _modifiedonbehalfby_value?: string;
  _organizationid_value?: string;
  _parentsubject_value?: string;
  createdon?: string;
  description?: string;
  featuremask?: number;
  importsequencenumber?: number;
  modifiedon?: string;
  overriddencreatedon?: string;
  subjectid?: string;
  title?: string;
  versionnumber?: number;
}
