import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * Response from msdyn_D365ChannelsInbound action
 */
export interface msdyn_D365ChannelsInboundResponse {
  responseMessage: string;
}

/**
 * msdyn_D365ChannelsInbound action
 *
 * Unbound action
 */
export class msdyn_D365ChannelsInboundAction implements Executable<msdyn_D365ChannelsInboundResponse> {
  constructor(public readonly inboundPayLoad: string) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_D365ChannelsInbound`;

    const body: Record<string, unknown> = {
      inboundPayLoad: this.inboundPayLoad,
    };

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
    const data = await response.json();
    return data as msdyn_D365ChannelsInboundResponse;
  }
}
