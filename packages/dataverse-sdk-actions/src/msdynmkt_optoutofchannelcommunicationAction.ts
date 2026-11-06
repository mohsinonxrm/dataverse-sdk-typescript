import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Response from msdynmkt_optoutofchannelcommunication action
 */
export interface msdynmkt_optoutofchannelcommunicationResponse {
  // No content returned
}

/**
 * Parameters of the msdynmkt_optoutofchannelcommunication action, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdynmkt_optoutofchannelcommunicationActionParameters {
  msdynmkt_trackingcontextid: string;
  msdynmkt_channeltype: string;
}

/**
 * msdynmkt_optoutofchannelcommunication action
 *
 * Unbound action
 */
export class msdynmkt_optoutofchannelcommunicationAction implements Executable<msdynmkt_optoutofchannelcommunicationResponse> {
  constructor(public readonly parameters: msdynmkt_optoutofchannelcommunicationActionParameters) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdynmkt_optoutofchannelcommunication`;

    const body = requestBody({
      msdynmkt_trackingcontextid: this.parameters.msdynmkt_trackingcontextid,
      msdynmkt_channeltype: this.parameters.msdynmkt_channeltype,
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

  async parseResponse(response: Response): Promise<msdynmkt_optoutofchannelcommunicationResponse> {
    // 204 No Content is an empty result
    if (response.status === 204) return {} as msdynmkt_optoutofchannelcommunicationResponse;
    return (await response.json()) as msdynmkt_optoutofchannelcommunicationResponse;
  }
}
