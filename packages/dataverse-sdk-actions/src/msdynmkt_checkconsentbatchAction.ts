import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Response from the msdynmkt_checkconsentbatch action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface msdynmkt_checkconsentbatchResponse {
  "@odata.context"?: string;
  msdynmkt_errormessage: string;
  msdynmkt_issuccess: boolean;
}

/**
 * Parameters of the msdynmkt_checkconsentbatch action, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdynmkt_checkconsentbatchActionParameters {
  msdynmkt_topicid?: string;
  msdynmkt_compliancesettingsid: string;
  msdynmkt_owningbusinessunitid?: string;
  msdynmkt_purposeid: string;
  msdynmkt_channeltype: string;
  msdynmkt_contactpoints: string[];
}

/**
 * msdynmkt_checkconsentbatch action
 *
 * Unbound action
 */
export class msdynmkt_checkconsentbatchAction implements Executable<msdynmkt_checkconsentbatchResponse> {
  constructor(public readonly parameters: msdynmkt_checkconsentbatchActionParameters) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdynmkt_checkconsentbatch`;

    const body = requestBody({
      msdynmkt_topicid: this.parameters.msdynmkt_topicid,
      msdynmkt_compliancesettingsid: this.parameters.msdynmkt_compliancesettingsid,
      msdynmkt_owningbusinessunitid: this.parameters.msdynmkt_owningbusinessunitid,
      msdynmkt_purposeid: this.parameters.msdynmkt_purposeid,
      msdynmkt_channeltype: this.parameters.msdynmkt_channeltype,
      msdynmkt_contactpoints: this.parameters.msdynmkt_contactpoints,
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

  async parseResponse(response: Response): Promise<msdynmkt_checkconsentbatchResponse> {
    // The body is the complex value, with its @odata.context
    return (await response.json()) as msdynmkt_checkconsentbatchResponse;
  }
}
