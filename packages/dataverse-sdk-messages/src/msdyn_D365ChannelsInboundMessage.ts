import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import { requestBody } from "./internal/requestBody.js";
import type { msdyn_D365ChannelsInboundResponse as msdyn_D365ChannelsInboundResponseData } from "./types/index.js";

/**
 * Parameters of the msdyn_D365ChannelsInbound message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_D365ChannelsInboundRequestParameters {
  inboundPayLoad: string;
}

/**
 * msdyn_D365ChannelsInbound request message
 *
 * Web API Action: msdyn_D365ChannelsInbound
 */
export class msdyn_D365ChannelsInboundRequest
  extends OrganizationRequest
  implements Executable<msdyn_D365ChannelsInboundResponse>
{
  declare readonly Parameters: Readonly<msdyn_D365ChannelsInboundRequestParameters>;

  constructor(parameters: msdyn_D365ChannelsInboundRequestParameters) {
    super("msdyn_D365ChannelsInbound", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_D365ChannelsInbound`;

    const body = requestBody({
      inboundPayLoad: this.Parameters.inboundPayLoad,
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
    if (response.status === 204) return msdyn_D365ChannelsInboundResponse.fromResponse({});
    return msdyn_D365ChannelsInboundResponse.fromResponse(await response.json());
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
