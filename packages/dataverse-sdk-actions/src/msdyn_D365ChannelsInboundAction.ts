import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Response from the msdyn_D365ChannelsInbound action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface msdyn_D365ChannelsInboundResponse {
  "@odata.context"?: string;
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
    // The body is the complex value, with its @odata.context
    return (await response.json()) as msdyn_D365ChannelsInboundResponse;
  }
}
