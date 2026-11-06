/**
 * msdyn_fileuploadstatustracker entity type
 */
export interface msdyn_fileuploadstatustracker {
  _createdby_value?: string;
  _createdonbehalfby_value?: string;
  _modifiedby_value?: string;
  _modifiedonbehalfby_value?: string;
  _msdyn_forecastconfigurationid_value?: string;
  createdon?: string;
  importsequencenumber?: number;
  modifiedon?: string;
  msdyn_attempt?: number;
  msdyn_errorcode?: string;
  msdyn_errormessage?: string;
  msdyn_fileuploadstatus?: number;
  msdyn_fileuploadstatustrackerid?: string;
  msdyn_forecastrecurrenceupdatedetailslist?: string;
  msdyn_uploadedon?: string;
  msdyn_uploadfilename?: string;
  overriddencreatedon?: string;
  partitionid?: string;
  ttlinseconds?: number;
  versionnumber?: number;
}
