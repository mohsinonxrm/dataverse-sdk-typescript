/**
 * msdyn_ocoutboundmessage entity type
 */
export interface msdyn_ocoutboundmessage {
  msdyn_ocmessagetype: number;
  msdyn_failurestatuscode: number;
  _msdyn_ocliveworkstreamid_value: string;
  msdyn_occhanneltype: string;
  msdyn_ocsenderchannelid: string;
  msdyn_failurereason: string;
  importsequencenumber: number;
  overriddencreatedon: string;
  msdyn_ocmessagetext: string;
  _msdyn_ocoutboundconfiguration_value: string;
  _msdyn_occustomerlocale_value: string;
  msdyn_occhannelprovidername: string;
  msdyn_ocreceiverchannelid: string;
}
