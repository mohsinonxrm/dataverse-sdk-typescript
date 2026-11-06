import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Response from the msdynmkt_getunsubscribelink action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface msdynmkt_getunsubscribelinkResponse {
  "@odata.context"?: string;
  msdynmkt_companyaddress: string;
  msdynmkt_errormessage: string;
  msdynmkt_issuccess: boolean;
  msdynmkt_unsubscribelink: string;
}

/**
 * Parameters of the msdynmkt_getunsubscribelink action, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdynmkt_getunsubscribelinkActionParameters {
  msdynmkt_sourceapplication?: string;
  msdynmkt_entityid: string;
  msdynmkt_owningbusinessunitid?: string;
  msdynmkt_topicid?: string;
  msdynmkt_oneclickunsubscribelink?: boolean;
  msdynmkt_contactpoint: string;
  msdynmkt_messagetemplateid: string;
  msdynmkt_compliancesettingsid: string;
  msdynmkt_purposeid: string;
  msdynmkt_entitytype: string;
  msdynmkt_sourcemessageentityname?: string;
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
      msdynmkt_sourceapplication: this.parameters.msdynmkt_sourceapplication,
      msdynmkt_entityid: this.parameters.msdynmkt_entityid,
      msdynmkt_owningbusinessunitid: this.parameters.msdynmkt_owningbusinessunitid,
      msdynmkt_topicid: this.parameters.msdynmkt_topicid,
      msdynmkt_oneclickunsubscribelink: this.parameters.msdynmkt_oneclickunsubscribelink,
      msdynmkt_contactpoint: this.parameters.msdynmkt_contactpoint,
      msdynmkt_messagetemplateid: this.parameters.msdynmkt_messagetemplateid,
      msdynmkt_compliancesettingsid: this.parameters.msdynmkt_compliancesettingsid,
      msdynmkt_purposeid: this.parameters.msdynmkt_purposeid,
      msdynmkt_entitytype: this.parameters.msdynmkt_entitytype,
      msdynmkt_sourcemessageentityname: this.parameters.msdynmkt_sourcemessageentityname,
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
    // The body is the complex value, with its @odata.context
    return (await response.json()) as msdynmkt_getunsubscribelinkResponse;
  }
}
