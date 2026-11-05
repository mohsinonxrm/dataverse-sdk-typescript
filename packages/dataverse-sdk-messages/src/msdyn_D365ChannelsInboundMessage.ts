import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import type { msdyn_D365ChannelsInboundResponse as msdyn_D365ChannelsInboundResponseData } from "./types/index.js";

/**
 * msdyn_D365ChannelsInbound request message
 *
 * Web API Action: msdyn_D365ChannelsInbound
 */
export class msdyn_D365ChannelsInboundRequest
  extends OrganizationRequest
  implements Executable<msdyn_D365ChannelsInboundResponse>
{
  constructor(public inboundPayLoad: string) {
    super("msdyn_D365ChannelsInbound");
  }

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
    return msdyn_D365ChannelsInboundResponse.fromResponse(data);
  }
}

/**
 * msdyn_D365ChannelsInbound response message
 */
export class msdyn_D365ChannelsInboundResponse extends OrganizationResponse {
  constructor(public result: msdyn_D365ChannelsInboundResponseData) {
    super("msdyn_D365ChannelsInbound");
  }

  static fromResponse(data: unknown): msdyn_D365ChannelsInboundResponse {
    return new msdyn_D365ChannelsInboundResponse(
      responseObject<msdyn_D365ChannelsInboundResponseData>(data)
    );
  }
}
