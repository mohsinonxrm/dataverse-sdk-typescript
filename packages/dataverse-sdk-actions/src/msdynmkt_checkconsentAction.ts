import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Response from the msdynmkt_checkconsent action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface msdynmkt_checkconsentResponse {
  "@odata.context"?: string;
  msdynmkt_errormessage: string;
  msdynmkt_isconsentgiven: boolean;
  msdynmkt_issuccess: boolean;
  msdynmkt_reason: string;
}

/**
 * Parameters of the msdynmkt_checkconsent action, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdynmkt_checkconsentActionParameters {
  msdynmkt_owningbusinessunitid: string;
  msdynmkt_contactpoint: string;
  msdynmkt_topicid: string;
  msdynmkt_purposeid: string;
  msdynmkt_channeltype: string;
  msdynmkt_compliancesettingsid: string;
}

/**
 * msdynmkt_checkconsent action
 *
 * Unbound action
 */
export class msdynmkt_checkconsentAction implements Executable<msdynmkt_checkconsentResponse> {
  constructor(public readonly parameters: msdynmkt_checkconsentActionParameters) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdynmkt_checkconsent`;

    const body = requestBody({
      msdynmkt_owningbusinessunitid: this.parameters.msdynmkt_owningbusinessunitid,
      msdynmkt_contactpoint: this.parameters.msdynmkt_contactpoint,
      msdynmkt_topicid: this.parameters.msdynmkt_topicid,
      msdynmkt_purposeid: this.parameters.msdynmkt_purposeid,
      msdynmkt_channeltype: this.parameters.msdynmkt_channeltype,
      msdynmkt_compliancesettingsid: this.parameters.msdynmkt_compliancesettingsid,
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

  async parseResponse(response: Response): Promise<msdynmkt_checkconsentResponse> {
    // The body is the complex value, with its @odata.context
    return (await response.json()) as msdynmkt_checkconsentResponse;
  }
}
