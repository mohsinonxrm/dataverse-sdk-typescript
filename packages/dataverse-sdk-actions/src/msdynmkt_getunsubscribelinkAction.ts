import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Response from msdynmkt_getunsubscribelink action
 */
export interface msdynmkt_getunsubscribelinkResponse {
  msdynmkt_errormessage: string;
  msdynmkt_issuccess: boolean;
  msdynmkt_unsubscribelink: string;
  msdynmkt_companyaddress: string;
}

/**
 * Parameters of the msdynmkt_getunsubscribelink action, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdynmkt_getunsubscribelinkActionParameters {
  msdynmkt_purposeid: string;
  msdynmkt_sourcemessageentityname?: string;
  msdynmkt_messagetemplateid: string;
  msdynmkt_owningbusinessunitid?: string;
  msdynmkt_entitytype: string;
  msdynmkt_entityid: string;
  msdynmkt_contactpoint: string;
  msdynmkt_oneclickunsubscribelink?: boolean;
  msdynmkt_compliancesettingsid: string;
  msdynmkt_topicid?: string;
  msdynmkt_sourceapplication?: string;
}

/**
 * msdynmkt_getunsubscribelink action
 *
 * Unbound action
 */
export class msdynmkt_getunsubscribelinkAction implements Executable<msdynmkt_getunsubscribelinkResponse> {
  constructor(public readonly parameters: msdynmkt_getunsubscribelinkActionParameters) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdynmkt_getunsubscribelink`;

    const body = requestBody({
      msdynmkt_purposeid: this.parameters.msdynmkt_purposeid,
      msdynmkt_sourcemessageentityname: this.parameters.msdynmkt_sourcemessageentityname,
      msdynmkt_messagetemplateid: this.parameters.msdynmkt_messagetemplateid,
      msdynmkt_owningbusinessunitid: this.parameters.msdynmkt_owningbusinessunitid,
      msdynmkt_entitytype: this.parameters.msdynmkt_entitytype,
      msdynmkt_entityid: this.parameters.msdynmkt_entityid,
      msdynmkt_contactpoint: this.parameters.msdynmkt_contactpoint,
      msdynmkt_oneclickunsubscribelink: this.parameters.msdynmkt_oneclickunsubscribelink,
      msdynmkt_compliancesettingsid: this.parameters.msdynmkt_compliancesettingsid,
      msdynmkt_topicid: this.parameters.msdynmkt_topicid,
      msdynmkt_sourceapplication: this.parameters.msdynmkt_sourceapplication,
    });

    return {
      method: "POST",
      url,
      headers: {
        "content-type": "application/json",
      },
      body,
    };
  }

  async parseResponse(response: Response): Promise<msdynmkt_getunsubscribelinkResponse> {
    // 204 No Content (or an empty body) is an empty result
    const text = response.status === 204 ? "" : await response.text();
    return (text ? JSON.parse(text) : {}) as msdynmkt_getunsubscribelinkResponse;
  }
}
