/**
 * msdyn_ahtworkitem entity type
 */
export interface msdyn_ahtworkitem {
  _createdby_value?: string;
  _createdonbehalfby_value?: string;
  _modifiedby_value?: string;
  _modifiedonbehalfby_value?: string;
  _ownerid_value?: string;
  _owningbusinessunit_value?: string;
  _owningteam_value?: string;
  _owninguser_value?: string;
  createdon?: string;
  importsequencenumber?: number;
  modifiedon?: string;
  msdyn_ahtworkitemid?: string;
  msdyn_closedon?: string;
  msdyn_eligibleforprocessing?: boolean;
  msdyn_firstdirtyon?: string;
  msdyn_lastcomputedwatermark?: string;
  msdyn_liveworkitemid?: string;
  msdyn_name?: string;
  overriddencreatedon?: string;
  partitionid?: string;
  ttlinseconds?: number;
  versionnumber?: number;
}
