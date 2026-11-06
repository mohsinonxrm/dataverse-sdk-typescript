import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Response from msdynmkt_checkconsentbatch action
 */
export interface msdynmkt_checkconsentbatchResponse {
  msdynmkt_errormessage: string;
  msdynmkt_issuccess: boolean;
}

/**
 * Parameters of the msdynmkt_checkconsentbatch action, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdynmkt_checkconsentbatchActionParameters {
  msdynmkt_owningbusinessunitid?: string;
  msdynmkt_channeltype: string;
  msdynmkt_contactpoints: string[];
  msdynmkt_compliancesettingsid: string;
  msdynmkt_topicid?: string;
  msdynmkt_purposeid: string;
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
      msdynmkt_owningbusinessunitid: this.parameters.msdynmkt_owningbusinessunitid,
      msdynmkt_channeltype: this.parameters.msdynmkt_channeltype,
      msdynmkt_contactpoints: this.parameters.msdynmkt_contactpoints,
      msdynmkt_compliancesettingsid: this.parameters.msdynmkt_compliancesettingsid,
      msdynmkt_topicid: this.parameters.msdynmkt_topicid,
      msdynmkt_purposeid: this.parameters.msdynmkt_purposeid,
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
    // 204 No Content is an empty result
    if (response.status === 204) return {} as msdynmkt_checkconsentbatchResponse;
    return (await response.json()) as msdynmkt_checkconsentbatchResponse;
  }
}
