import type { activitypointer } from './activitypointer.js';

/**
 * msdyn_ocoutboundmessage entity type
 */
export interface msdyn_ocoutboundmessage extends activitypointer {
  _msdyn_occustomerlocale_value?: string;
  _msdyn_ocliveworkstreamid_value?: string;
  _msdyn_ocoutboundconfiguration_value?: string;
  importsequencenumber?: number;
  msdyn_failurereason?: string;
  msdyn_failurestatuscode?: number;
  msdyn_occhannelprovidername?: string;
  msdyn_occhanneltype?: string;
  msdyn_ocmessagetext?: string;
  msdyn_ocmessagetype?: number;
  msdyn_ocreceiverchannelid?: string;
  msdyn_ocsenderchannelid?: string;
  overriddencreatedon?: string;
}
