import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Response from msdyn_D365ChannelsInbound action
 */
export interface msdyn_D365ChannelsInboundResponse {
  responseMessage: string;
}

/**
 * Parameters of the msdyn_D365ChannelsInbound action, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_D365ChannelsInboundActionParameters {
  inboundPayLoad: string;
}

/**
 * msdyn_D365ChannelsInbound action
 *
 * Unbound action
 */
export class msdyn_D365ChannelsInboundAction implements Executable<msdyn_D365ChannelsInboundResponse> {
  constructor(public readonly parameters: msdyn_D365ChannelsInboundActionParameters) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_D365ChannelsInbound`;

    const body = requestBody({
      inboundPayLoad: this.parameters.inboundPayLoad,
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

  async parseResponse(response: Response): Promise<msdyn_D365ChannelsInboundResponse> {
    // 204 No Content is an empty result
    if (response.status === 204) return {} as msdyn_D365ChannelsInboundResponse;
    return (await response.json()) as msdyn_D365ChannelsInboundResponse;
  }
}
