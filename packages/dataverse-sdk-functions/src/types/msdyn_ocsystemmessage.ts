import type { BooleanManagedProperty } from "./BooleanManagedProperty.js";

/**
 * msdyn_ocsystemmessage entity type
 */
export interface msdyn_ocsystemmessage {
  _createdby_value?: string;
  _createdonbehalfby_value?: string;
  _modifiedby_value?: string;
  _modifiedonbehalfby_value?: string;
  _msdyn_defaultlanguage_value?: string;
  _msdyn_widgetid_value?: string;
  _organizationid_value?: string;
  componentidunique?: string;
  componentstate?: number;
  createdon?: string;
  importsequencenumber?: number;
  iscustomizable?: BooleanManagedProperty;
  ismanaged?: boolean;
  modifiedon?: string;
  msdyn_instanceid?: string;
  msdyn_isrecurring?: boolean;
  msdyn_isrepeatlimited?: boolean;
  msdyn_messagedescription?: string;
  msdyn_messageinterval?: number;
  msdyn_messagereceiver?: number;
  msdyn_messagetemplatetrigger?: number;
  msdyn_messagetext?: string;
  msdyn_messagetype?: number;
  msdyn_name?: string;
  msdyn_ocsystemmessageid?: string;
  msdyn_repeatcount?: number;
  msdyn_startdelay?: number;
  msdyn_streamsource?: number;
  msdyn_systemmessageeventtype?: number;
  overriddencreatedon?: string;
  overwritetime?: string;
  solutionid?: string;
  statecode?: number;
  statuscode?: number;
  timezoneruleversionnumber?: number;
  utcconversiontimezonecode?: number;
  versionnumber?: number;
}
